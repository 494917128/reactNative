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
import { createBottomTabNavigator, createStackNavigator, createDrawerNavigator,StackNavigator } from 'react-navigation';
import Count from './views/Count'
import HomeScreen from './views/HomeScreen'
import DetailsScreen from './views/DetailsScreen'
import ModalScreen from './views/ModalScreen'

// 模态框路由
const RootStack = createStackNavigator(
  {
    Main: HomeScreen,
    MyModal: ModalScreen,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

// tabbar路由
const TabbarStack = createBottomTabNavigator(
  {
    Home: RootStack,
    Count: Count,
  },{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'ios-information-circle'+(focused ? '' : '-outline');
      } else if (routeName === 'Count') {
        iconName = 'ios-options'+(focused ? '' : '-outline');
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
    // tabBarVisible:tabBarVisible,
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  backBehavior:'none'
  }
);

// 页面路由
const MainStack = createStackNavigator(
  {
    Home: {
      screen: TabbarStack,
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
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
    return <MainStack />;
  }
}