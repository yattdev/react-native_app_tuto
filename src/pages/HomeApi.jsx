import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GlobalStyleSheet from '../utils/GlobalStyleSheet';
import {useSelector, useDispatch} from 'react-redux';
import {getDataFromAPI} from '../components/redux/action';
import PushNotification from 'react-native-push-notification';

const HomeApi = ({navigation, route}) => {
  const {error, personnes} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test channel',
    });
  };

  const handleNotifications = item => {
    // PushNotification.localNotification({
    // channelId: 'test-channel',
    // title: 'You clicked on ' + item.first_name,
    // message: item.email,
    // });
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Alarm',
      message: 'You clicked on ' + item.first_name + ' 10 seconds ago',
      date: new Date(Date.now() + 10 * 1000),
      allowWhileIdle: true,
    });
  };

  useEffect(() => {
    dispatch(getDataFromAPI());
    createChannels();
  }, [dispatch]);

  return (
    <>
      <View style={GlobalStyleSheet.body}>
        <Text style={GlobalStyleSheet.text}> {error} !</Text>
        <Text style={GlobalStyleSheet.text}> Data Fetch from API</Text>
        <FlatList
          data={personnes}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                handleNotifications(item);
              }}>
              <View style={styles.view}>
                <Text style={styles.text}>{item.first_name}</Text>
                <Text>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
    // color: '#fff',
    textAlign: 'center',
  },
  view: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
    marginVertical: 5,
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

export default HomeApi;
