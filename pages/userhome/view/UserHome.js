import React, {Component} from 'react';
import { connect } from 'react-redux';

import {View, Text} from 'react-native';
import ButtonView from '../../../components/ButtonView';

import { logout } from '../../login/actionCreators';

class UserHome extends Component {

    render(){

        return(
            <View>
                <Text>{this.props.userName}</Text>
                <Text>{this.props.userToken}</Text>
                <ButtonView btnName="Logout" onPress={() => this.props.onLogout(this.props.userName, this.props.userToken, this.props.navigation)}></ButtonView>
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