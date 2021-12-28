import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Text, Image, Alert} from 'react-native';
import GlobalStyleSheet from '../utils/GlobalStyleSheet';
import MyButton from '../components/MyButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setError} from '../components/redux/action';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log('error');
  },
);

const LoginRedux = ({navigation}) => {
  const {name, error} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  // const [name, setName] = useState('');
  // const [error, setError] = useState('');

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);',
        [],
        () => {},
        err => dispatch(setError(err.message)),
      );
    });
  };

  const getData = () => {
    try {
      // AsyncStorage.getItem('username').then(value => {
      // if (value != null) {
      // navigation.navigate('Home');
      // }
      // });
      db.transaction(tx => {
        tx.executeSql('SELECT Name FROM Users', [], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var username = results.rows.item(0).Name;
            dispatch(setName(username));
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const setData = () => {
    if (name.length === 0) {
      Alert.alert('Warning !', 'Please enter your name');
    } else {
      try {
        // AsyncStorage.setItem('username', name);
        db.transaction(tx => {
          tx.executeSql('INSERT INTO Users (Name) VALUES (?)', [name]);
        });
        navigation.navigate('HomeRedux');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <View style={GlobalStyleSheet.body}>
        <Image
          style={styles.logo}
          source={require('../assets/img/redux_img.png')}
        />
        <Text style={GlobalStyleSheet.text}>LoginRedux page</Text>
        <Text style={GlobalStyleSheet.text}>{error}</Text>
        <TextInput
          style={GlobalStyleSheet.input}
          placeholder="Enter your name"
          onChangeText={value => dispatch(setName(value))}
        />
        <MyButton
          buttonText="LoginRedux"
          buttonColor="#0f7"
          onPressHandler={setData}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    margin: 20,
    height: 100,
    width: 100,
  },
});

export default LoginRedux;
