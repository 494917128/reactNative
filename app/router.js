// In App.js in a new project

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  Animated,
  NativeModules,
  LayoutAnimation,
  TouchableOpacity, } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';
import FadeInView from './views/FadeInView'

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./images/cert0.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

class Anim extends React.Component {
  state = {
    w: 100,
    h: 100,
  };

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, {width: this.state.w, height: this.state.h}]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
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
  	console.log(this)
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

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const otherParam = navigation.state.params.otherParam

    return {
      title: otherParam ? otherParam : 'A Nested Details Screen',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
	}
  };

  render() {
  	const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');// 设置默认
    const otherParam = navigation.getParam('otherParam', 'some default value');// 设置默认

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {itemId}</Text>
        <Text>otherParam: {otherParam}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
			title="Update the title"
			onPress={() => this.props.navigation.setParams({otherParam: 'Updated!'})}
		/>
      </View>
    );
  }
}

class ModalScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>

      </View>
    );
  }
}

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./images/cert.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./images/cert.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const MyApp = createDrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

// 路由
const MainStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
	    backgroundColor: '#f4511e',
	  },
	  headerTintColor: '#fff',
	  headerTitleStyle: {
	    fontWeight: 'bold',
	  },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const TabbarStack = createBottomTabNavigator({
  Home: RootStack,
  Settings: SettingsScreen,
},{
navigationOptions: ({ navigation }) => ({
  tabBarIcon: ({ focused, tintColor }) => {
    const { routeName } = navigation.state;
    let iconName;
    if (routeName === 'Home') {
      iconName = 'ios-information-circle'+(focused ? '' : '-outline');
    } else if (routeName === 'Settings') {
      iconName = 'ios-options'+(focused ? '' : '-outline');
    }

    // You can return any component that you like here! We usually use an
    // icon component from react-native-vector-icons
    return <Ionicons name={iconName} size={25} color={tintColor} />;
  },
}),
tabBarOptions: {
  activeTintColor: 'tomato',
  inactiveTintColor: 'gray',
},
});

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default class App extends React.Component {
  render() {
    return <TabbarStack />;
  }
}