import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image
} from 'react-native';

export default class App extends React.Component {
  onPress() {

  }
  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.checkContainer }>
          <Text>Title</Text>
          <Image
           style={ styles.instructions }
           source={require('./resources/002.jpg')}
          />
          <View>
            <Button onPress={ this.onPress }
                    title="Next"
                    color="#000"
            />
            <Button onPress={ this.onPress }
                    title="Next"
                    color="#000"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: 'red',
    width: '100%'
  },
  title: {},
  instructions: {
    flex: 1,
    width: '100%'
  }
});