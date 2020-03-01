import React, { Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import ButtonView from "../../../components/ButtonView";

import {PWRightWid} from '../../../constants';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';

import {
  LOGIN_STATUS_FAILURE,
  LOGIN_STATUS_LOADING,
  LOGIN_STATUS_LOGOUT,
  LOGIN_STATUS_SUCCESS
} from '../UserModel';

import { loginConnect, userNameChange, passwordChange, switchAuthMethod } from '../actionCreators';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

class LoginView extends Component {

  render() {
    console.log("LoginView - render() - loginStatus: ", this.props.loginStatus);
    switch(this.props.loginStatus){
      case LOGIN_STATUS_LOADING:
        return (
        <View>
          <Text>Login in progress...</Text>
        </View>
        );
      case LOGIN_STATUS_SUCCESS:
        this.props.navigation.navigate("UserHome");
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
                  {this.props.userNameTip}
                </Text>
                <TextInput style={styles.inputViewStyle}
                  onChangeText={(text) => {this.props.onUserNameChange(text)}}
                  placeholder="请输入手机号"
                />
              </View>
    
              <View style={[styles.lineStyle, { top: 49.75 }]}></View>
    
              <View style={[styles.inputCellStyle, { height: 49.75, top: 50.25, right: this.props.PWRight, justifyContent: 'space-between' }]}>
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
    
              <View style={[styles.lineStyle, { top: 99 }]}></View>
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
    this.props.onLoginButtonClick(username, password);
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
  console.log("mapStateToProps - state.logins.userName", state.logins.userName);
  console.log("mapStateToProps - state.logins.userPW: ", state.logins.userPW);
  console.log("mapStateToProps - state.logins.userNameTip: ", state.logins.userNameTip);
  return {
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
    onLoginButtonClick: (username, password) => {
      dispatch(loginConnect(username, password));
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

/*

getUserList = () => {

  alert("getUserList() was called.");
  let urlGetUserList = "http://192.168.3.127:8081/usercenter/getuserlist";

  getData(urlGetUserList).then((responseJson) => {
    console.log(responseJson);
  })
  .catch((error) => {
    console.error('Error: ', error);
  });

}

  userLogin = () => {

    let urlLogin = 'http://192.168.3.127:8081/usercenter/login';
    //let params = 'username=dahai&password=666666';
    let params = 'username=' + this.state.userName + '&password=' + this.state.userPW;
    console.log(params);

    postData(urlLogin, params)
      .then((responseJson) => {

        let errorcode = parseInt(responseJson.errorCode);
        let errorMessage = responseJson.errorMessage;

        switch (errorcode) {

          case 1: //login success, proceed with token proccesing
          case 4: //token expired, proceed with token proccessing (save the new token too)
            console.log("login responded successfully.");
            alert(JSON.stringify(responseJson));

            //todo: login successfully, save the user info and route to userhome page

            this.state.userName = responseJson.username;
            this.state.userToken = responseJson.userToken;

            this.setState({ 'userName': responseJson.username, 'userToken': responseJson.userToken });

            user.userToken = resp.data.userToken;
            user.username = resp.data.username;
            localStorage.setItem('token', user.userToken);
            // 每次请求接口时，需要在headers添加对应的Token验证
            axios.defaults.headers.common['Authorization'] = user.userToken;
            // 更新token
            commit('auth_success', user);
            console.log("Store: the response username is ", user.username);
            console.log("Store: the state.user is ", this.state.user);

            break;

          case 2: //password is incorrect, need to tell the user to input again
            //errorMessage = resp.data.errorMessage;
            console.log(errorMessage);
            //commit('auth_passwordincorrect');
            break;

          case 3: //user does not exist, need to tell the user to input again or register
            //errorMessage = resp.data.errorMessage;
            console.log(errorMessage);
            //commit('auth_usernotexist');

        }
        return "responseJson.errorMessage";
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

}

*/

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
    backgroundColor: '#D6D6D6', height: 45, width: SCREEN_WIDTH - 32, top: 150, position: 'absolute', margin: 16,
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
    fontSize: 14,
    textAlign: 'left',
    margin: 10,
    height: 16.5,
    width: 100,
  },
});

