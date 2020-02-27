import React, { Component } from 'react';
import ButtonView from "./ButtonView";
import {postData, getData} from "../utils/networkutils"


import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert,
  Fetch
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;

const PWRightWid = 100;

export default class LoginView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userNameTip: "手机号",
      userName: "",
      userPWTip: "验证码",
      userPW: "",
      userToken: "",
      changeBtnTitle: "使用账号密码登录",
      PWRight: 0,
    };

  }

  render() {

    return (

      <View style={styles.container}>
        <View style={styles.BGViewStyle}>
          <View style={[styles.inputCellStyle, { height: 49.75, top: 0, right: 0, }]}>
            <Text style={styles.welcome}>
              {this.state.userNameTip}
            </Text>
            <TextInput style={styles.inputViewStyle}
              onChangeText={(text) => {
                this.setState({ userName: text });
              }}
              placeholder="请输入手机号"
            />
          </View>

          <View style={[styles.lineStyle, { top: 49.75 }]}></View>

          <View style={[styles.inputCellStyle, { height: 49.75, top: 50.25, right: this.state.PWRight, justifyContent: 'space-between' }]}>
            <Text style={styles.welcome}>
              {this.state.userPWTip}
            </Text>
            <TextInput style={styles.inputViewStyle}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ userPW: text });
              }}
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
          onPress={this._onClickLogin}
        ></ButtonView>

        <ButtonView
          btnName='忘记密码?'
          btnStyle={styles.forgetPWStyle}
          onPress={this._onClickForgetPW}
          textStyle={{ color: '#D6D6D6', justifyContent: 'flex-end', }}
        ></ButtonView>

        
        <ButtonView
          btnName={this.state.changeBtnTitle}
          btnStyle={styles.SIMBtnStyle}
          onPress={this._onClickSIM}
          textStyle={{ color: '#D6D6D6' }}
        ></ButtonView>

      </View>


    )
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

  _onClickLogin = () => {
    /* var usrInfo = "用户名：" + this.state.userName + "密码：" + this.state.userPW
    Alert.alert(usrInfo); */
    this.userLogin();
    //this.getUserList();
    //this.postTest();
    //this.postTest2();
  };

  //切换手机OTA认证和账号密码认证方式
  _onClickSIM = () => {
    this.setState({ PWRight: this.state.PWRight == PWRightWid ? 0 : PWRightWid });
    this._hiddenGetCodeBtn
    this.setState({ userNameTip: this.state.PWRight == PWRightWid ? "手机号" : "账户" });
    this.setState({ userPWTip: this.state.PWRight == PWRightWid ? "验证码" : "密码" });
    this.setState({ changeBtnTitle: this.state.PWRight == PWRightWid ? "使用账号密码登录" : "使用手机号验证码登录" });
  };

  _onClickForgetPW = () => {
    this.props.navigation.navigate('Details');
  };

  _hiddenGetCodeBtn = () => {
    if (this.state.PWRight == PWRightWid) {
      reuturn(
        <ButtonView
          btnName='获取验证码'
          btnStyle={{ alignItems: 'flex-end', backgroundColor: '#D6D6D6' }}
          onPress={this._getPhoneCode}
          textStyle={{ color: 'gray', justifyContent: 'flex-end', }}
        ></ButtonView>
      );
    } else {
      return NULL;
    }
  }


  /*
  Login Response Payload definition in usercenter
  
  error code definition：
      0x1 - login success
      0x2 - password is not correct
      0x3 - user not exist
      0x4 - token expired
  

  public static final int LOGIN_SUCCESS = 0x1;
  public static final int PASSWORD_INCORRECT = 0x2;
  public static final int USER_NOT_EXIST = 0x3;
  public static final int TOKEN_EXPIRED = 0x4;

  public static final String MSG_PASSWORD_INCORRECT = "Password provided is incorrect.";
  public static final String MSG_USER_NOT_EXIST = "User not exist, please verify or register.";
  public static final String MSG_TOKEN_EXPIRED = "Token expired.";

  public int errorCode;
  public String errorMessage;
  public String username;
  public String userToken;

  */

  getUserList = () => {

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

      /*      this.state.userName = responseJson.username;
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
            */
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

