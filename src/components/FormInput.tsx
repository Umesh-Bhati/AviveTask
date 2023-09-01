import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';

interface Props extends TextInputProps {
  errorTxt: string;
}

const FormInput = (props: Props) => {
  return (
    <View style={styles.container}>
      <TextInput {...props} style={styles.input} />
      {!!props?.errorTxt && <Text style={styles.error}>{props.errorTxt}</Text>}
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    aspectRatio: 7,
    marginTop: 40,
  },
  input: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    color: 'black',
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginTop: 3,
    marginLeft: '1.5%',
  },
});
