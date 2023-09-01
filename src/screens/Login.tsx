import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {AppButton, FormInput} from '../components';
import {login} from '../redux/feature/auth/authSlice';
import {useDispatch} from 'react-redux';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {LOGIN_STATUS_KEY} from '../navigation/AppNavigator';

type UserDetails = {
  email: string;
  password: string;
};

const defaultTestCrediantials: UserDetails = {
  email: 'user@avive.life',
  password: 'AED$1NHOM3$',
};

const Login = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
  });

  const {setItem} = useAsyncStorage(LOGIN_STATUS_KEY);

  const [error, setError] = useState({emailError: '', passwordError: ''});
  const dispatch = useDispatch();

  const onChangeText = (val: string, keyName: string): void => {
    setError({emailError: '', passwordError: ''});
    setUserDetails(old => ({...old, [keyName]: val}));
  };

  const handleLogin = () => {
    const trimmedEmail = userDetails.email?.trim();
    const trimmedPassword = userDetails.password?.trim();
    if (
      trimmedEmail !== defaultTestCrediantials.email &&
      trimmedPassword !== defaultTestCrediantials.password
    ) {
      return setError({
        emailError: 'Please enter valid email id',
        passwordError: 'Please enter valid password',
      });
    } else if (trimmedEmail !== defaultTestCrediantials.email) {
      return setError(old => ({
        ...old,
        emailError: 'Please enter valid email id',
      }));
    } else if (trimmedPassword !== defaultTestCrediantials.password) {
      return setError(old => ({
        ...old,
        passwordError: 'Please enter valid password',
      }));
    }
    dispatch(login());
    setItem('login');
  };

  return (
    <View style={styles.conatiner}>
      <FormInput
        value={userDetails.email}
        onChangeText={val => onChangeText(val, 'email')}
        errorTxt={error?.emailError}
        placeholder="Enter email"
        placeholderTextColor={'grey'}
      />
      <FormInput
        value={userDetails.password}
        onChangeText={val => onChangeText(val, 'password')}
        errorTxt={error?.passwordError}
        placeholder="Enter password"
        placeholderTextColor={'grey'}
      />
      <AppButton title="Login" onPress={handleLogin} style={styles.btn} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  conatiner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: '15%',
  },
});
