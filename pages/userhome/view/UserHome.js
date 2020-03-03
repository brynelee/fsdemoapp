import React, {Component} from 'react';
import { connect } from 'react-redux';

import {View, Text, StyleSheet} from 'react-native';
import ButtonView from '../../../components/ButtonView';

import { logout } from '../../login/actionCreators';

import {SCREEN_WIDTH} from '../../../constants';

class UserHome extends Component {

    render(){

        return(
            <View style={styles.container}>
                <View style={styles.BGViewStyle}>
                    <View style={styles.inputCellStyle, { height: 49.75, top: 0, right: 0}}>
                        <Text style={styles.welcome}>用户名</Text>
                        <Text style={styles.inputViewStyle1}>{this.props.userName}</Text>
                    </View>
                    <View style={[styles.lineStyle, { top: 100 }]}></View>
                    <View style={styles.inputCellStyle, { height: 49.75, top: 50.25, right: 0, }}>
                        <Text style={styles.welcome}>User Token</Text>
                        <Text style={styles.inputViewStyle2}>{this.props.userToken}</Text>
                    </View>
                    <View style={[styles.lineStyle, { top: 250 }]}></View>
                </View>
                <ButtonView btnStyle={styles.logoutBtnStyle} btnName="退出" underlayColor="red" onPress={() => this.props.onLogout(this.props.userName, this.props.userToken, this.props.navigation)}></ButtonView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("UserHome - userToken: ", state.logins.userToken);
    return {
        userName: state.logins.userName,
        userToken: state.logins.userToken
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("UserHome - mapDispatchToProps called ...");
    return {
        onLogout: (userName, userToken, nav) => {
            dispatch(logout(userName, userToken, nav));
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(UserHome);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        flexDirection: 'column',
    },
    BGViewStyle: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    inputCellStyle: {
        top: 20, left: 0, backgroundColor: 'white', flexDirection: 'row', position: 'absolute', alignItems: 'center',
    },
    lineStyle: {
        height: 0.5, backgroundColor: '#D6D6D6', position: 'absolute', left: 0, right: 0
    },
    inputViewStyle1: {
        height: 100, right: 0, left: 120, top: 20, borderColor: 'white', borderWidth: 1, position: 'absolute', fontSize: 18
    },
    inputViewStyle2: {
        height: 300, right: 0, left: 120, top: 0, borderColor: 'white', borderWidth: 1, position: 'absolute', fontSize: 15
    },
    logoutBtnStyle: {
        top: 300, backgroundColor: '#D6D6D6', height: 45, width: SCREEN_WIDTH - 32, position: 'absolute', margin: 16,
    },
    forgetPWStyle: {
        margin: 16,
        position: 'absolute',
        right: 0,
        top: 210,
        width: 150,
        height: 30,
        alignItems: 'flex-end',
        backgroundColor: '#F5FCFF',
    },
    SIMBtnStyle: {
        position: 'absolute',
        top: 260,
        height: 30,
        width: SCREEN_WIDTH - 32,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        top: 30,
        fontSize: 18,
        textAlign: 'left',
        margin: 10,
        height: 25,
        width: 100
    }
});