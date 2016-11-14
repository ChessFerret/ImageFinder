 import React, { Component } from 'react';
 import { AppRegistry } from 'react-native';
 import { Router, Scene } from 'react-native-router-flux';

 import SearchPage from './SearchPage';
 import SearchResultsPage from './SearchResultsPage';

 export default class ImageFinder extends Component {
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
