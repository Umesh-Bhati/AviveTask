import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const AppButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style]}>
      <Text style={styles.btnTitle}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'black',
  },
  btnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
