import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon, Header, Avatar } from 'react-native-elements';
import { successIcon, errorIcon, pendingIcon } from './icons';

export class Report extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.toggleCamera, }}
          centerComponent={{ text: 'QA5', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />

        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}

            />
          ))
        }
      </View>
    );
  }
}


const list = [
  {
    name: 'Task 1',
    avatar_url: successIcon,
    subtitle: 'Bogomolov'
  },
  {
    name: 'Task 2',
    avatar_url: successIcon,
    subtitle: 'Bogomolov'
  },
  {
    name: 'Task 3',
    avatar_url: errorIcon,
    subtitle: 'Bogomolov'
  },
  {
    name: 'Task 4',
    avatar_url: pendingIcon,
    subtitle: 'Unassigned'
  },
];