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

Sound.setCategory('Playback');
const sounds = {
  yah: new Sound('./yah.wav', Sound.MAIN_BUNDLE, error => {}),
  ooo: new Sound('./ooo.wav', Sound.MAIN_BUNDLE, error => {}),
  huh: new Sound('./huh.wav', Sound.MAIN_BUNDLE, error => {}),
  aye: new Sound('./aye.wav', Sound.MAIN_BUNDLE, error => {}),
};

const INITIAL_STATE = {
  pressed: {}
};

export default class App extends Component<{}> {
  state = { ...INITIAL_STATE }

  componentWillUnmount() {
    Object.values(sounds).forEach(sound => sound.release());
  }

  onPressIn = name => () => {
    const { pressed } = this.state;
    const sound = sounds[name];

    this.setState({
      pressed: {
        ...pressed,
        [name]: true,
      }
    }, () => {
      sound.stop(() => {
        sound.play(success => {});
      });
    });
  }

  onPressOut = name => () => {
    const { pressed } = this.state;

    this.setState({
      pressed: {
        ...pressed,
        [name]: false,
      }
    });
  }

  renderButton(name) {
    const { pressed } = this.state;
    const isPressed = pressed[name];
    const buttonStyles = [
      styles.button,
      isPressed ? styles.buttonPressed : null,
    ];

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn(name)}
        onPressOut={this.onPressOut(name)}
        key={name}
      >
        <View style={buttonStyles}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const buttons = Object.keys(sounds).map(name => (
      this.renderButton(name, sounds[name])
    ));

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          {buttons}
        </View>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');
const HEIGHT = height / 5;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: HEIGHT,
    width: HEIGHT,
    margin: 12,
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
