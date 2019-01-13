import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {AppContainer} from "./navigation";
import * as firebase from 'firebase';

export default class App extends React.Component {
  render() {
    return (
       <AppContainer/>
    );
  }
}

const config = {
  apiKey: "AIzaSyDuzoH_mJO2xmXU7gO4Q77ksTtTIXuu0qk",
  authDomain: "fichas-168e0.firebaseapp.com",
  databaseURL: "https://fichas-168e0.firebaseio.com",
  projectId: "fichas-168e0",
  storageBucket: "fichas-168e0.appspot.com",
  messagingSenderId: "330582273367"
};
firebase.initializeApp(config);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
