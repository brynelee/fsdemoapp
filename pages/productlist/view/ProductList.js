import React, {Component} from 'react';
import { connect } from 'react-redux';

import {StyleSheet, View, Text, FlatList} from 'react-native';
import {ButtonView, InProgressView, NotFound} from '../../../components';
import ProductInfo from './ProductInfo';

import { logout } from '../../login/actionCreators';

import {SCREEN_WIDTH} from '../../../constants';

import {getProductList} from '../ProductActionCreators';

import {
    QUERY_PRODUCT_FAILURE, 
    QUERY_PRODUCT_IDLE,
    QUERY_PRODUCT_IN_PROGRESS,
    QUERY_RPODUCT_SUCCESS
} from '../ProductActionTypes';


class ProductList extends Component {

    constructor(props){
        super(props);
        this._getProductList();
    }

    render(){
        switch (this.props.queryStatus){

            case QUERY_PRODUCT_IDLE:
            case QUERY_PRODUCT_IN_PROGRESS:
                return (
                    <InProgressView textToShow="正在加载产品目录……" />
                );
            case QUERY_RPODUCT_SUCCESS:
                return(
                    <View style={styles.container}>
                        <FlatList
                            data={this.props.productList}
                            renderItem={this._renderItem}
                        />
                    </View>
                );
            case QUERY_PRODUCT_FAILURE:
            default:
                return (
                    <NotFound/>
                );
        }
    }

    _getProductList(){
        this.props.onLoadingProductList();
    }

    _renderItem({item}){
        return (
            <ProductInfo product={item}/>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("ProductList mapStateToProps was called. ");
    return {
        userName: state.logins.userName,
        userToken: state.logins.userToken,
        queryStatus: state.product.queryProductStatus,
        productList: state.product.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log("ProductList - mapDispatchToProps called ...");
    return {
        onLoadingProductList: () => {
            dispatch(getProductList());
        },
        onLogout: (userName, userToken, nav) => {
            dispatch(logout(userName, userToken, nav));
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProductList);

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