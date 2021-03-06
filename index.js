/**
 * @format
 */

import React from 'react'
import {AppRegistry,
StyleSheet,
Text,
View
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const HelloWorld = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.hello}>Hello, World</Text>
    </View>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  hello: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent(appName, () => App);
 