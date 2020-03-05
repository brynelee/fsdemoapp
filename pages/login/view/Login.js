import React, { Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import ButtonView from "../../../components/ButtonView";

import {PWRightWid, SCREEN_WIDTH} from '../../../constants';

import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import {
  LOGIN_STATUS_FAILURE,
  LOGIN_STATUS_LOADING,
  LOGIN_STATUS_LOGOUT,
  LOGIN_STATUS_SUCCESS
} from '../UserModel';

import { loginConnect, serverAddrChange, userNameChange, passwordChange, switchAuthMethod } from '../actionCreators';

class LoginView extends Component {

  render() {
    console.log("LoginView - render() - loginStatus: ", this.props.loginStatus);
    switch(this.props.loginStatus){
      case LOGIN_STATUS_LOADING:
        return (
        <View style={styles.inputViewStyle, {fontSize: 25}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>Login in progress...</Text>
        </View>
        );
      case LOGIN_STATUS_SUCCESS:
        return (
          <View>
            <Text>Login successfully!</Text>
          </View>
        );
      case LOGIN_STATUS_LOGOUT:
      case LOGIN_STATUS_FAILURE:
        return (

          <View style={styles.container}>
            <View style={styles.BGViewStyle}>
              <View style={[styles.inputCellStyle, { height: 49.75, top: 0, right: 0, }]}>
                <Text style={styles.welcome}>
                  {this.props.serverAddrTip}
                </Text>
                <TextInput style={styles.inputViewStyle}
                  onChangeText={(text) => {this.props.onServerAddrChange(text)}}
                  placeholder="请输入服务器地址"
                />
              </View>
              <View style={[styles.inputCellStyle, { height: 49.75, top: 50.25, right: 0, }]}>
                <Text style={styles.welcome}>
                  {this.props.userNameTip}
                </Text>
                <TextInput style={styles.inputViewStyle}
                  onChangeText={(text) => {this.props.onUserNameChange(text)}}
                  placeholder="请输入手机号"
                />
              </View>
    
              <View style={[styles.lineStyle, { top: 100.5 }]}></View>
    
              <View style={[styles.inputCellStyle, { height: 49.75, top: 100.5, right: this.props.PWRight, justifyContent: 'space-between' }]}>
                <Text style={styles.welcome}>
                  {this.props.userPWTip}
                </Text>
                <TextInput style={styles.inputViewStyle}
                  secureTextEntry={true}
                  onChangeText={(text) => {this.props.onPasswordChange(text)}}
                  placeholder="请输入验证码"
                ></TextInput>
                <ButtonView
                  btnName='获取验证码'
                  btnStyle={{ width: 90, marginRight: 10, backgroundColor: '#D6D6D6' }}
                  onPress={this._getPhoneCode}
                  textStyle={{ color: 'gray', justifyContent: 'flex-end', }}
                ></ButtonView>
              </View>
    
              <View style={[styles.lineStyle, { top: 150.25 }]}></View>
            </View>
    
            <ButtonView
              btnName='登录'
              btnStyle={styles.loginBtnStyle}
              onPress={() => {this._onLoginButtonClick(this.props.userName, this.props.userPW)}}
            ></ButtonView>
    
            <ButtonView
              btnName='忘记密码?'
              btnStyle={styles.forgetPWStyle}
              onPress={this._onClickForgetPW}
              textStyle={{ color: '#D6D6D6', justifyContent: 'flex-end', }}
            ></ButtonView>
    
            
            <ButtonView
              btnName={this.props.changeBtnTitle}
              btnStyle={styles.SIMBtnStyle}
              onPress={this._onClickSIM}
              textStyle={{ color: '#D6D6D6' }}
            ></ButtonView>
    
          </View>
        );
    }
  }

  _onLoginButtonClick = (username, password) => {
    console.log("_onLoginButtonClick this.props.userName:", username);
    console.log("_onLoginButtonClick this.props.userPW:", password);
    this.props.onLoginButtonClick(username, password, this.props.navigation);
  }

  _getUserName = () => {
    alert('A name was submitted: ' + this.state.userName);
  };

  _getUserPW = () => {
    alert('A pwd was submitted: ' + this.state.userPW);
  }

  _getPhoneCode = () => {
    alert('获取验证码')
  }

  //切换手机OTA认证和账号密码认证方式
  _onClickSIM = () => {
    this.props.onSwitchAuthMethod();
    this._hiddenGetCodeBtn();
  };

  _onClickForgetPW = () => {
    this.props.navigation.navigate('Details');
    //this.props.history.push('/Details');
  };

  _hiddenGetCodeBtn = () => {
    if (this.props.PWRight == PWRightWid) {
      return(
        <ButtonView
          btnName='获取验证码'
          btnStyle={{ alignItems: 'flex-end', backgroundColor: '#D6D6D6' }}
          onPress={this._getPhoneCode}
          textStyle={{ color: 'gray', justifyContent: 'flex-end', }}
        ></ButtonView>
      );
    } else {
      return null;
    }
  }

  componentDidMount = () => {
    console.log("ComponentDidMount called...");
    console.log("this.props.userName: ", this.props.userName);
  }

}

LoginView.propTypes = {
  onLoginButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  console.log("mapStateToProps called...");
  console.log("mapStateToProps - state: ", state);
  console.log("mapStateToProps - state.logins.serverAddr ", state.logins.serverAddr);
  console.log("mapStateToProps - state.logins.userName", state.logins.userName);
  console.log("mapStateToProps - state.logins.userPW: ", state.logins.userPW);
  console.log("mapStateToProps - state.logins.userNameTip: ", state.logins.userNameTip);
  return {
    serverAddrTip: state.logins.serverAddrTip,
    serverAddr: state.logins.serverAddr,
    userName: state.logins.userName,
    userNameTip: state.logins.userNameTip,
    userPW: state.logins.userPW,
    userPWTip: state.logins.userPWTip,
    userToken: state.logins.userToken,
    changeBtnTitle: state.logins.changeBtnTitle,
    PWRight: state.logins.PWRight,
    loginStatus: state.logins.loginStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapDispatchToProps called...");
  return {
    onLoginButtonClick: (username, password, nav) => {
      dispatch(loginConnect(username, password, nav));
    },
    onServerAddrChange: (address) => {
      dispatch(serverAddrChange(address));
    },
    onUserNameChange: (username) => {
      dispatch(userNameChange(username));
    },
    onPasswordChange: (password) => {
      dispatch(passwordChange(password));
    },
    onSwitchAuthMethod: () => {
      dispatch(switchAuthMethod());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);

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
    left: 0, backgroundColor: 'white', flexDirection: 'row', position: 'absolute', alignItems: 'center',
  },
  lineStyle: {
    height: 0.5, backgroundColor: '#D6D6D6', position: 'absolute', left: 0, right: 0
  },
  inputViewStyle: {
    height: 49.5, right: 0, left: 80, top: 0, borderColor: 'white', borderWidth: 1, position: 'absolute'
  },
  loginBtnStyle: {
    backgroundColor: '#D6D6D6', height: 45, width: SCREEN_WIDTH - 32, top: 200, position: 'absolute', margin: 16,
  },
  forgetPWStyle: {
    margin: 16,
    position: 'absolute',
    right: 0,
    top: 270,
    width: 150,
    height: 30,
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  SIMBtnStyle: {
    position: 'absolute',
    top: 320,
    height: 30,
    width: SCREEN_WIDTH - 32,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
    height: 16.5,
    width: 100,
  },
});

