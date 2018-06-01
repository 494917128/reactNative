import { AppRegistry } from 'react-native';
import React from 'react';
import App from './app/routers';
import { Provider } from 'react-redux';
import store from './app/store';

class Store extends React.Component {
  render() {
    return (
		<Provider store={store}>
			<App></App>
		</Provider>
    );
  }
}

AppRegistry.registerComponent('reactNative', () => Store);
