import React from 'react';
import {
  StyleSheet
} from 'react-native';

import { Conetnt } from './Content';
import { Camera } from './Camera';


export default class App extends React.Component {
  

  constructor() {
    super();
    this.state = { isCameraShown: false };
  }


  onToggleCamera = () => {
    this.setState({ isCameraShown: !this.state.isCameraShown });
  }
  
  render() {
    
    if (!this.state.isCameraShown) {
      return <Conetnt onToggleCamera={ this.onToggleCamera } />
    }

    return <Camera/>;
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
    backgroundColor: 'white',
    width: '100%'
  },
  title: {},
  instructions: {
    flex: 1,
    width: '100%'
  }
});