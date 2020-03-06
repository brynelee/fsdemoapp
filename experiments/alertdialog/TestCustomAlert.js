import React, {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View,} from 'react-native';
import CustomAlertDialog from "./CustomAlertDialog";

const typeArr = ["不限", "男", "女"];

export default class TestCustomAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeName: '性别',
            type: 0,
            showTypePop: false,
        }
    }

    _openTypeDialog() {
        this.setState({showTypePop: !this.state.showTypePop})
    }

    render() {

        return (
            <View style={{flex: 1}}>

                <TouchableHighlight onPress={() => this._openTypeDialog()} style={styles.button}
                                    underlayColor="#a5a5a5">
                    <Text>{this.state.typeName}-{this.state.type}</Text>
                </TouchableHighlight>

                <CustomAlertDialog entityList={typeArr} callback={(i) => {
                    this.setState({
                        type: i,
                        typeName: typeArr[i],
                    })
                }} show={this.state.showTypePop} closeModal={(show) => {
                    this.setState({
                        showTypePop: show
                    })
                }}/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    button: {
        margin: 3,
        backgroundColor: 'white',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd'
    },
});