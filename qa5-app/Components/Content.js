import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon, Header, Avatar } from 'react-native-elements';

const imgUrl = 'https://media.licdn.com/dms/image/C4D03AQEVAncY0Hsrkg/profile-displayphoto-shrink_200_200/0?e=1554336000&v=beta&t=PwcJNdIj3f26CN1YNlsLFdg9tP0_kxchGu2A-Q_juR8';

export class Conetnt extends React.Component {

  constructor() {
    super();

    this.state = {
      users: [
        {
          title: 'Task 1',
          avatar: require('../resources/anchor_check.jpg'),
          checked: true,
          checkedBy: 'Bogomolov',
          text: 'Check anchor'
        },
        {
          title: 'Task 2',
          avatar: require('../resources/connector_check.jpg'),
          checked: false,
          checkedBy: null,
          text: 'Check connector'
        },
        {
          title: 'Task 3',
          avatar: require('../resources/coupler_check.jpg'),
          checked: false,
          checkedBy: null,
          text: 'Check coupler'
        },
        {
          title: 'Task 4',
          avatar: require('../resources/support_structure_check.jpg'),
          checked: false,
          checkedBy: null,
          text: 'Check support structure'
        }
      ]
    };
  }

  onPress = (u, i) => {
    return () => {
      u.checkedBy = !u.checked ? 'Bogomolov' : null;
      u.checked = !u.checked;
      this.setState([...this.state.users.slice(0, i), u, ...this.state.users.slice(i+1)]);
    }
  }

  render() {
    const instructions = this.state.users.map((u, i) => {
      let checked = null;
      if (u.checkedBy) {
        checked = (
          <ListItem
            leftAvatar={{
              title: 'ok',
              source: { uri: imgUrl },
              showEditButton: false,
            }}
            title={ u.checkedBy }
            subtitle={'Worker'}
          />
        )
      }

      const title = u.checked ? 'Unverify' : 'Verify';
      let cardStyles = styles.card;

      if (u.checked) {
        cardStyles = { ...cardStyles, opacity: .5};
      }
      return (
        <Card
          containerStyle={ cardStyles }
          key={ i }
          title={ u.title }
          image={ u.avatar }
        >
          <Text style={{marginBottom: 10, fontWeight: 'bold', textAlign: 'center'}}>
            { u.text.toUpperCase() }
          </Text>
          <Button
            onPress={ this.onPress(u,i) }
            // icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={ styles.btnStyle }
            title={ title }
          />
          {checked}
        </Card>
      )
    });

    return (
      <View>
      <Header
        centerComponent={{ text: 'QA5', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
        />
        <ScrollView>
          <View style={ styles.checkContainer }>
            { instructions }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const baseStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    width: '100%'
  },
  title: {},
  instructions: {
    flex: 1,
    width: '100%'
  },
  btnStyle: {borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0},
  card: { borderRadius: 8, position: 'relative' },
  img: {  }
};
const styles = StyleSheet.create(baseStyles);