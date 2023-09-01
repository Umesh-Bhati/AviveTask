// EmergenciesScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addEmergency} from '../redux/feature/emergency/emergencySlice';
import {AppButton} from '../components';
import {logout} from '../redux/feature/auth/authSlice';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {
  LOGIN_STATUS_KEY,
  RootStackParamsList,
} from '../navigation/AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamsList, 'Emergency'>;

const Emergency = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const emergencyList = useSelector((state: RootState) => state?.emergencyList);
  const [visible, setVisible] = useState(false);
  const {removeItem} = useAsyncStorage(LOGIN_STATUS_KEY);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, [dispatch, navigation, visible]);

  const handleLogout = () => {
    dispatch(logout());
    removeItem();
  };

  const handleBtns = (isYes = true) => {
    if (isYes) {
      dispatch(addEmergency(Date.now()));
    }
    setVisible(false);
  };

  const rendorEmargencies = (item: {timestamp: number}, index: number) => (
    <View key={index.toString()} style={styles.item}>
      <Text style={styles.time}>
        {new Date(item?.timestamp).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppButton title="Logout" onPress={handleLogout} style={styles.btn} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        {emergencyList?.length > 0 ? (
          emergencyList.map(rendorEmargencies)
        ) : (
          <Text style={styles.emptyText}>Wait for a minute!</Text>
        )}
      </ScrollView>
      <Modal visible={visible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContaienr}>
            <Text style={styles.modalTitle}>
              {'An emergency is occured\n do you want to be record it?'}
            </Text>
            <AppButton
              title="Yes"
              style={styles.yes}
              onPress={() => handleBtns()}
            />
            <AppButton
              title="No"
              style={styles.no}
              onPress={() => handleBtns(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    alignSelf: 'flex-end',
    right: '8%',
    top: '3%',
  },

  modalContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerModalContaienr: {
    width: '90%',
    aspectRatio: 2,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  yes: {
    paddingVertical: 15,
    paddingHorizontal: 45,
  },
  no: {
    paddingVertical: 15,
    paddingHorizontal: 45,
    backgroundColor: 'grey',
  },
  item: {
    width: '90%',
    aspectRatio: 5,
    borderRadius: 12,
    backgroundColor: 'lightgrey',
    marginTop: 10,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  scrollContentContainer: {
    flex: 1,
    alignItems: 'center',
    top: '5%',
  },
  modalTitle: {
    color: 'black',
    textAlign: 'center',
    position: 'absolute',
    top: '5%',
    left: '25%',
  },
  time: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
    color: 'black',
    textAlignVertical: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 10,
    color: 'black',
    top: '30%',
  },
});

export default Emergency;
