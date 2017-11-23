/**
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Dimensions from 'Dimensions';
import Sound from 'react-native-sound';
import yahWav from './yah.wav';

Sound.setCategory('Playback');
const yah = new Sound('./yah.wav', Sound.MAIN_BUNDLE, error => {});

export default class App extends Component<{}> {
  state = {
    pressed: false,
  }

  onPress = pressed => () => {
    this.setState({ pressed }, () => {
      if (pressed) {
        yah.stop(() => {
          yah.play(success => {});
        });
      }
    });
  }

  render() {
    const buttonStyles = [
      styles.button,
      this.state.pressed ? styles.buttonPressed : null,
    ];

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPressIn={this.onPress(true)}
          onPressOut={this.onPress(false)}
        >
          <View style={buttonStyles}>
            <Text style={styles.text}>UZI</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const { height } = Dimensions.get('window');
const HEIGHT = height / 3;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    height: height / 3,
    width: height / 3,
    borderRadius: HEIGHT / 2,
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 1,
    shadowOffset: { height: 7, width: 3 },
  },
  buttonPressed: {
    shadowOpacity: 0,
  },
  text: {
    fontSize: 20,
  }
});
