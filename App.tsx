import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  calculateResult,
  clearAll,
  clearOne,
  updateInputVal,
} from './src/redux/feature/calculator/calculatorSlice';

const {width: SCREEN_WIDTH} = Dimensions.get('screen');
const App = () => {
  const dispatch = useDispatch();
  const {calculatedVal, inputVal} = useSelector(state => state.calculator);

  const CommonBtn = ({btnTitle, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Text style={styles.btnTxt}>{btnTitle}</Text>
    </TouchableOpacity>
  );

  const numberVals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const opratorsVal = ['+', '-', '*', '/'];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputValsContainer}>
        <View style={styles.inputValContainer}>
          <Text style={styles.inputValue}>{inputVal}</Text>
        </View>
        <View style={styles.resultContainer}>
          <Text style={styles.calculatedTxt}>{`= ${calculatedVal}`}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.numberContainer}>
          {numberVals.map((item, index) => (
            <CommonBtn
              key={index.toString()}
              btnTitle={item}
              onPress={() => dispatch(updateInputVal(item.toString()))}
            />
          ))}
          <CommonBtn btnTitle={'C'} onPress={() => dispatch(clearAll())} />
          <CommonBtn btnTitle={'×'} onPress={() => dispatch(clearOne())} />
        </View>
        <View style={styles.opratorsContainer}>
          {opratorsVal.map((item, index) => (
            <CommonBtn
              key={index.toString()}
              btnTitle={item}
              onPress={() => dispatch(updateInputVal(item.toString()))}
            />
          ))}
          <CommonBtn
            btnTitle={'='}
            onPress={() => dispatch(calculateResult())}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: SCREEN_WIDTH * 0.21,
    aspectRatio: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    margin: '1%',
  },
  btnTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlignVertical: 'center',
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  numberContainer: {
    flex: 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  opratorsContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputValue: {
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
  },
  resultContainer: {
    alignItems: 'flex-end',
    flex: 2,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  inputValContainer: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputValsContainer: {
    flex: 0.2,
    width: '90%',
  },
  calculatedTxt: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },
  bottomContainer: {
    flex: 0.8,
    flexDirection: 'row',
  },
});

export default App;
