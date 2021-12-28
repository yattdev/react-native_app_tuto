import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TextInput,
  ImageBackground,
} from 'react-native';
import MyButton from '../components/MyButton';
import MyModal from '../components/MyModal';
import GlobalStyleSheet from '../utils/GlobalStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const Home = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('No error');

  const getData = () => {
    try {
      // AsyncStorage.getItem('username').then(value => {
      // if (value != null) {
      // setName(value);
      // }
      // });
      //
      db.transaction(tx => {
        tx.executeSql(
          'SELECT Name FROM Users',
          [],
          (tx, results) => {
            var len = results.rows.length;
            setError(len);
            if (len > 0) {
              var username = results.rows.item(0).Name;
              setName(username);
            } else {
              setName('None');
            }
          },
          err => setError(err.message),
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View style={GlobalStyleSheet.body}>
        <Text style={GlobalStyleSheet.text}> Welcome {name} !</Text>
        <Text style={GlobalStyleSheet.text}> {error} !</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    fontSize: 20,
    marginVertical: 5,
    width: '90%',
  },
  button: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#299',
    paddingVertical: 5,
    paddingHorizontal: 40,
  },
});

export default Home;
