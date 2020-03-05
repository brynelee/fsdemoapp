import {
    QUERY_PRODUCT_ACTION,
    QUERY_PRODUCT_FAILURE_ACTION,
    QUERY_PRODUCT_LIST_SUCCESS_ACTION
} from './ProductActionTypes';

export const queryProductAction = () => {
    console.log("queryProductAction creator was called...");
    return {type: QUERY_PRODUCT_ACTION};
}

export const queryProductFailureAction = (error) => {
    console.log("queryProductFailureAction creator was called ...");
    return {type: QUERY_PRODUCT_FAILURE_ACTION, data: error};
}

export const queryProductListSuccessAction = (productList) => {
    console.log("queryProductListSuccessAction creator was called...");
    return {type: QUERY_PRODUCT_LIST_SUCCESS_ACTION, data: productList};
}

/*

    private int product_id;
    private String product_name;
    private int total_amount;
    private int amount_sold;
    private String description;
    private String institution_code;
    private String category;
    private BigDecimal unit_price; //Java中需要BigDecimal来实现精确计算
    private boolean isDynamicPrice; //MySQL中使用tinyint(1)来实现boolean类型

*/

export const getProductList = () => {

    return (dispatch) => {
        
        console.log("getProductList Aync action creator called ...");

        let urlQueryProductList = 'http://192.168.3.127:8082/tas/products';
        
        // dispatch loginStart action
        dispatch(queryProductAction());

        fetch(urlQueryProductList, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            credentials: 'include', // for cross origin setup
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
              //'Content-Type': 'application/x-www-form-urlencoded' // Java server 不能识别Fetch API 中发出json的方式
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
        }).then((response) => {

            if(response.status !== 200){
                console.error('Fail to get response with status ' + response.status);
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJson) => {

                console.log("getProductList - responseJson: ", responseJson);

                let productList = responseJson;
                console.log("productList is: ", productList);
                
                dispatch(queryProductListSuccessAction(responseJson));

            }).catch((error) => {
                console.error('Invalid json response: ' + error);
                dispatch(queryProductFailureAction(error));
            });
        }).catch((error) => {
            console.log("queryProductList fetch catched error: ", error);
            dispatch(queryProductFailureAction(error));
        })

    };
}