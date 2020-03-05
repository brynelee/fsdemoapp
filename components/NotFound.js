import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const NotFound = () => {
  return (
    <View style={styles.inputViewStyle, {fontSize: 25}}>
      <Text style={{fontSize: 30, textAlign: 'center'}}>哎呀，没有找到你要的东西，抱歉，别急哈……</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  inputViewStyle: {
      height: 49.5, right: 0, left: 80, top: 100, borderColor: 'white', borderWidth: 1, position: 'absolute'
  }
});