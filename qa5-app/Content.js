import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon, Header, Avatar } from 'react-native-elements';

export class Conetnt extends React.Component {

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
                let checked = null;
                if (u.checkedBy) {
                  checked = (
                    <ListItem
                      leftAvatar={{
                        title: 'ok',
                        source: { uri: 'https://media.licdn.com/dms/image/C4D03AQEVAncY0Hsrkg/profile-displayphoto-shrink_200_200/0?e=1554336000&v=beta&t=PwcJNdIj3f26CN1YNlsLFdg9tP0_kxchGu2A-Q_juR8' },
                        showEditButton: false,
                      }}
                      title={ u.checkedBy }
                      subtitle={'Preisdent'}
                    />
                  )
                }
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

                        if ( !u.checked ) {
                          u.checkedBy = 'Bogomolov';
                        }else{
                          u.checkedBy = null;
                        }
                        u.checked = !u.checked;
                        this.setState([...this.state.users.slice(0, i), u, ...this.state.users.slice(i+1)]);



                      } }
                      // icon={<Icon name='code' color='#ffffff' />}
                      backgroundColor='#03A9F4'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                      title={ (u.checked)?'UNCHECK':'CHECK NOW' } />

                    {checked}

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