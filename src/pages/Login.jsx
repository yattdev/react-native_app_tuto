import React, {useState, useEffect} from 'react';
import {TextInput, StyleSheet, View, Text, Image, Alert} from 'react-native';
import GlobalStyleSheet from '../utils/GlobalStyleSheet';
import MyButton from '../components/MyButton';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

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

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS ' +
          'Users ' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);',
        [],
        () => {},
        err => setError(err.message),
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
            setName(username);
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
        navigation.navigate('Home');
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
          source={require('../assets/img/async_img.jpeg')}
        />
        <Text style={GlobalStyleSheet.text}>Login page</Text>
        <Text style={GlobalStyleSheet.text}>{error}</Text>
        <TextInput
          style={GlobalStyleSheet.input}
          placeholder="Enter your name"
          onChangeText={value => setName(value)}
        />
        <MyButton
          buttonText="Login"
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

export default Login;
