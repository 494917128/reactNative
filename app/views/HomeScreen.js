import React from 'react'
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback, } from 'react-native';
import Anim from './Anim'
import FadeInView from './FadeInView'
import LogoTitle from './LogoTitle'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
  const params = navigation.state.params || {};
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('MyModal')}
          title="Info"
          color="#000"
        />
      ),
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button onPress={params.increaseCount||function(){}} title="+1" color="#000" />
      ),
    };
  };

  constructor(props){
    super(props);
    this.state = {
      count: 0
    }
  }
  componentWillMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount.bind(this) });
  }

  _increaseCount () {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Text>{this.state.count}</Text>
        <Anim />
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
        </FadeInView>
        <TouchableNativeFeedback onPress={() => this.props.navigation.navigate('Details',{
              itemId: 86,
              otherParam: 'anything you want here',
            })}>
          <Text>Go to Details</Text>
        </TouchableNativeFeedback>
      </View>
    );
  }
}