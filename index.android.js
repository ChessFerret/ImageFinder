/**/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import { AppRegistry } from 'react-native';
 import { Router, Scene } from 'react-native-router-flux';

 import MainPage from './SearchPage';
 import GridPage from './SearchResultsPage';

 export default class TestProject extends Component {
   render() {
     return (
       <Router>
         <Scene key="root" hideNavBar={true}>
           <Scene key="searchPage" component={SearchPage} initial={true} />
           <Scene key="searchResultsPage" component={SearchResultsPage}
              hideNavBar={false}
              navigationBarStyle={
                {
                  backgroundColor:'transparent',
                  borderBottomWidth: 0,
                }
              }/>
         </Scene>
       </Router>
     )
   }
 }

AppRegistry.registerComponent('ImageFinder', () => ImageFinder);
