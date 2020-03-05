import {
    QUERY_PRODUCT_ACTION,
    QUERY_PRODUCT_FAILURE_ACTION,
    QUERY_PRODUCT_LIST_SUCCESS_ACTION
} from "./ProductActionTypes";

import {
    QUERY_PRODUCT_IDLE,
    QUERY_PRODUCT_IN_PROGRESS,
    QUERY_RPODUCT_SUCCESS,
    QUERY_PRODUCT_FAILURE
} from "./ProductActionTypes";

export default (state = {
                        productList: [],
                        queryProductStatus: QUERY_PRODUCT_IDLE
                        }, 
                action) => {
    
    console.log("Product reducer was called with action.type as: ", action.type);
    console.log("Product reducer was called with action.data: ", action.data);
    
    switch(action.type) {
        case QUERY_PRODUCT_ACTION:
            return {...state, queryProductStatus: QUERY_PRODUCT_IN_PROGRESS};
        case QUERY_PRODUCT_FAILURE_ACTION:
            return {...state, queryProductStatus: QUERY_PRODUCT_FAILURE};
        case QUERY_PRODUCT_LIST_SUCCESS_ACTION:
            let dataWithKey = action.data.map((item) => {
                item.dynamicPrice = item.dynamicPrice ? '是':'否';
                item = {...item, key: item.product_name};
                return item;
            })
            return {...state, productList: dataWithKey, queryProductStatus: QUERY_RPODUCT_SUCCESS};
        default:
            return state;
    }
    
}


