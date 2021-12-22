/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <Text>{title}</Text>
      <Text>{children}</Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // SafeAreaView component
    <SafeAreaView style={backgroundStyle}>
      {/* StatusBar component */}
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* ScrollView component */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* Header component */}
        <Header />
        {/* View component */}
        <View />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /* Declare les styles comme des objects
*
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
*
* */
});

export default App;
