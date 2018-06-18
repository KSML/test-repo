import React, {Component} from 'react';
import {AppRegistry, Text, View, Button, TextInput} from 'react-native';

import Texting from './components/Texting/Texting';

export default class myapp extends Component{
	render(){
		return(
			<Texting/>
		);
	}
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('myapp',() => myapp);

