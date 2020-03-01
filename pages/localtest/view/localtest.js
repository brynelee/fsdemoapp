import React, { Component } from "react";
import { View, Button } from "react-native";

export default class LocalTest extends Component {

    render() {
        return (
            <View>
                <View>
                    <Text>Welcome to local test</Text>
                </View>
                <View>
                    <Text>Welcome to local test</Text>
                </View>
                <View>
                    <Text>Welcome to local test</Text>
                </View>
                <Button onPress={this._onChange} title = 'Local Test Button'></Button>
            </View>
        )
    }

    _onChange = () => {
        console.log("_onChange was called.");
        this.getUserList();
    }

    getUserList = () => {

        console.log("getUserList() was called.");
        alert("getUserList() was called.");
        let urlGetUserList = "http://192.168.3.127:8081/usercenter/getuserlist";
    /*
        getData(urlGetUserList).then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error('Error: ', error);
        });
    */
    }
}
