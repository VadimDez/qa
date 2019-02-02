import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Button,
  Image,
  ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon, Header, Avatar } from 'react-native-elements';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      users: [
        {
          title: 'Task 1',
          avatar: require('./resources/002.jpg'),
          checked: true,
          checkedBy: 'Bogomolov'
        },
        {
          title: 'Task 2',
          avatar: require('./resources/002.jpg'),
          checked: false,
          checkedBy: null
        },
        {
          title: 'Task 3',
          avatar: require('./resources/002.jpg'),
          checked: false,
          checkedBy: null
        },
        {
          title: 'Task 4',
          avatar: require('./resources/002.jpg'),
          checked: false,
          checkedBy: null
        },
        {
          title: 'Task 5',
          avatar: require('./resources/002.jpg'),
          checked: false,
          checkedBy: null
        },
      ]
    };
  }

  onPress() {

  }
  render() {
    return (
      <View>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'QA5', style: { color: '#fff', fontWeight: 'bold', fontSize: 22 } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <ScrollView>
          <View style={ styles.checkContainer }>
            {
              this.state.users.map((u, i) => {
                return (
                  <Card
                    containerStyle={{borderRadius: 8}}
                    key={i.toString()}
                    title={ u.title }
                    image={u.avatar}>
                    <Text style={{marginBottom: 10}}>
                      The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                      onPress={ () => {
                        console.log(u.checked);
                        u.checked = !u.checked;
                        u.checkedBy = 'Bogomolov';
                        this.setState([...this.state.users.slice(0, i), u, ...this.state.users.slice(i+1)]);
                      } }
                      disabled={ u.checked }
                      icon={<Icon name='code' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title='CHECK NOW' />

                    <Avatar
                      rounded
                      icon={{name: 'users', type: 'font-awesome'}}
                      onPress={() => console.log("Works!")}
                      activeOpacity={0.7}
                      containerStyle={{flex: 2, marginLeft: 20, marginTop: 115}}
                    />
                  </Card>
                )
              })
            }
          </View>
        </ScrollView>
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
    backgroundColor: 'white',
    width: '100%'
  },
  title: {},
  instructions: {
    flex: 1,
    width: '100%'
  }
});