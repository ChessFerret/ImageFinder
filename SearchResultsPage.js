import React, {Component} from "react";
import {Image, Text, View, StyleSheet} from "react-native";
import GridView from "react-native-easy-grid-view";
import { Actions } from 'react-native-router-flux';

export default class SearchResultsPage extends Component {
    constructor(props) {
        super(props);
        var ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // console.log("LENGTH in grid " + this.props.picturesArray.length);
        // console.log("pictures in grid " + this.props.picturesArray);
        // console.log("sliderValue in grid " + this.props.rowsNumber);
        this.state = {
            dataSource: ds.cloneWithCells(this.props.picturesArray, this.props.rowsNumber),
            cellWidth: 0,
            cellHeight: 0
        };
    }

    _renderCell(cell) {
        console.log("cell src" + cell.src);
        return <View onLayout={event => {
          var width = event.nativeEvent.layout.width;
         if(this.state.cellWidth!=width){
         this.setState({cellWidth:width})
         }
         if(this.state.cellHeight!=width){
         this.setState({cellHeight:width})
         }
        }}>
            <View style={{width:this.state.cellWidth,height:this.state.cellHeight,justifyContent:'center',backgroundColor:cell.backgroundColor}}
                   resizeMode={Image.resizeMode.stretch} source={cell.image}>
                <Image source={{uri: cell.src}} style={{width:this.state.cellWidth,height:this.state.cellHeight}}/>
            </View>
        </View>
    }

        render() {
            return <View>
                <GridView dataSource={this.state.dataSource}
                          spacing={8}
                          style={{padding:16}}
                          renderCell={this._renderCell.bind(this)}

                />
            </View>
        }
    }
