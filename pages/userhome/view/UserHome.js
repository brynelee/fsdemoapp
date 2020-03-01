import React, {Component} from 'react';
import { connect } from 'react-redux';

import {View, Text} from 'react-native';
import ButtonView from '../../../components/ButtonView';

class UserHome extends Component {

    render(){

        return(
            <View>
                <Text>{this.props.userName}</Text>
                <Text>{this.props.userToken}</Text>
                <ButtonView btnName="Back to Home" onPress={() => this.props.navigation.navigate("Home")}></ButtonView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.logins.userName,
        userToken: state.logins.userToken
    }
}

export default connect (mapStateToProps, null)(UserHome);