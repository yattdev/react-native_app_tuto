import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

const PageB = ({navigation, route}) => {
  const {ItemName, ItemId} = route.params;
  const goToPageA = e => {
    navigation.navigate('PageA', {Message: 'Message from PageB'});
  };
  return (
    <>
      <View style={styles.body}>
        <Text style={styles.text}> We are inside pageB!</Text>
        <Pressable
          onPress={goToPageA}
          style={({pressed}) => [{backgroundColor: pressed ? '#ddd' : '#0f0'}]}>
          <Text style={styles.text}> Go to Page A</Text>
        </Pressable>
        <Text style={styles.text}>{ItemName}</Text>
        <Text style={styles.text}>ID: {ItemId}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    // color: '#fff',
    textAlign: 'center',
  },
});

export default PageB;
