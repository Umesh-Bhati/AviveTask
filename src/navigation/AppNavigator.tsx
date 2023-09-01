import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Emergency, Login} from '../screens';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {login} from '../redux/feature/auth/authSlice';

const Stack = createNativeStackNavigator();
export const LOGIN_STATUS_KEY = 'LOGIN_STATUS';
export type RootStackParamsList = {
  Login: undefined;
  Emergency: undefined;
};

const AppNavigator = () => {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const {getItem} = useAsyncStorage(LOGIN_STATUS_KEY);
  const dispatch = useDispatch();
  useEffect(() => {
    getItem()
      .then(storedVal => {
        if (storedVal) {
          dispatch(login());
        }
      })
      .catch(err => console.error('err ', err));
  }, [dispatch, getItem]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={authStatus === 'UNAUTH' ? 'Login' : 'Emergency'}>
        {authStatus === 'UNAUTH' ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Emergency" component={Emergency} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
