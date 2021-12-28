import React, {useState} from 'react';
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

const PageA = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [submit, setSubmit] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onPressHandler = () => {
    if (name.length > 3) {
      setName(name);
      setSubmit(!submit);
    } else {
      setShowWarning(true);
    }
  };

  const goToPageB = () => {
    navigation.navigate('PageB', {ItemName: 'Item from Page A', ItemId: 1});
  };
  return (
    <>
      <ImageBackground
        style={styles.body}
        source={{
          uri: 'https://lh3.googleusercontent.com/proxy/wT9c5G9sicdYxpQ-mEhZdSKJCqgwdIEoP2SNFLy0HXz99PQMfK7iihdZvA1CI2ze1elkyyWixBlUVqxik-Atdaoms6tN_SpcRX97tx023PgnAcdoko_c_inzSlYJZufy3kUm9GqE_6h66I0jVOh0EPThnGiaLA',
        }}>
        <MyModal showWarning={showWarning} setShowWarning={setShowWarning} />
        <Text style={styles.text}>Please enter your name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g John Dohe"
          onChangeText={value => setName(value)}
        />
        <MyButton
          buttonColor="#299"
          onPressHandler={onPressHandler}
          buttonStyle={styles.button}
          buttonText={submit ? 'Clear' : 'Submit'}
        />
        {submit ? (
          <View>
            <Text style={styles.text}>Your name is: {name}</Text>
          </View>
        ) : null}

        <View
          style={{
            flex: 1,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={goToPageB}
            style={({pressed}) => [
              {
                padding: 10,
                backgroundColor: pressed ? '#ddd' : '#0f0',
              },
            ]}>
            <Text style={styles.text}> Go to Page B</Text>
          </Pressable>
          <Text style={styles.text}>{route.params?.Message}</Text>
        </View>
      </ImageBackground>
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

export default PageA;
