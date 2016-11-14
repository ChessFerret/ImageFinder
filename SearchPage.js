import React, { Component } from 'react';
import {
  ActivityIndicator,
  Slider,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import SearchResultsPage from './SearchResultsPage';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'nissan',
      sliderValue: '2',
      isLoading: false,
    };
  }

  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicator
          size='large'/> ) :
      ( <View/>);
    return (
      <View style={styles.container}>
      {/* --- FIRST ROW OPENED --- */}
        <View style={styles.rowCreator}>
          <Text style={styles.cellLeft}>
            Search Term:
          </Text>
          <TextInput value={this.state.searchString}
          underlineColorAndroid ='blue'
           style={[styles.cellRight, styles.textInput]}
           onChangeText={ (searchString) => this.setState({searchString}) }
           placeholder='Input topic here'>
          </TextInput>
        </View>{/* --- FIRST ROW CLOSED--- */}

        {/* --- SECOND ROW OPENED--- */}
        <View style={styles.rowCreator}>
          <Text style={styles.cellLeft}>
            Columns:
          </Text>
          <View  style={styles.rowCreator}>
            <Slider style={styles.cellRight}
              {...this.props}
              value={2}
              step={1}
              minimumValue={1}
              maximumValue={5}
              onValueChange={ (sliderValue) =>
                                this.setState({ sliderValue: sliderValue })} />
              <Text>
                {this.state.sliderValue}
              </Text>
          </View>
        </View>{/* --- SECOND ROW CLOSED--- */}

        <Text onPress={ () => this.onSearchPressed() }
              style={styles.button}>Search</Text>
        {spinner}

      </View>
    );
  }

  onSearchPressed() {
    let REQUEST_URL = new Request('https://www.bing.com/images/search?q=' +
    this.state.searchString + '&qs=n&form=QBILPG&pq=' + this.state.searchString
    +'&sc=8-4&sp=-1&sk=');

    this.fetchData(REQUEST_URL);
  }

  fetchData(REQUEST_URL) {
    this.setState({ isLoading: true });
    fetch(REQUEST_URL)
      .then((response) => response.text())
      .then((responseData) => {
        let cheerio = require('cheerio-without-node-native');
        let $ = cheerio.load(responseData);
        let pictures = [];
        let index = 0;
        $('img').each(function(i, elem) {
          let picture = { key: i, src: $(this).attr('src') };
          // check picture.src to start with "https:" (to get real pictures)
          // Further work.
          // console.log( picture.src.startsWith("https:") );
          // console.log(/^https:/.test(picture.src));
          // console.log(picture.src.substring(0, picture.src.length) == "http");
          if ( picture.src.charAt(5) == ":" ) {
              pictures[index] = picture;
              index++;
          }
        });
        this.setState({
            isLoading: false,
        });
        Actions.searchResultsPage({
              picturesArray: pictures, columnsNumber: this.state.sliderValue });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          searchString: 'Error '
        });
        console.log("Bad things during fetch " + error);
      })
      .done();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowCreator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cellLeft: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'right',
    textAlignVertical: 'center'
  },
  cellRight: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    textAlign: 'center',
  },
  button: {
    color: 'blue',
    fontSize: 16,
  }
});
