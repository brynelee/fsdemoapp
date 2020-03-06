/**
 * @format
 */
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
//import App from './AppNavTest';
//import {TestCustomAlert as App} from './experiments';

AppRegistry.registerComponent(appName, () => App);
