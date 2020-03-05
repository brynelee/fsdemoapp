import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import {ValuableAsset} from '../../../resources';

class ProductInfo extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.wholelist}>
                <View style={styles.namerow}>
                    <View style={styles.row1st}>
                        <Image source={ValuableAsset} style={{width: 30, height: 30}} />
                    </View>
                    <View style={styles.row2nd}>
                        <Text style={styles.title1}>
                            ID: 
                        </Text>
                        <Text style={styles.text1}>
                            {this.props.product.product_id}
                        </Text>
                    </View>
                    <View style={styles.row3rd}>
                        <Text style={styles.title2}>
                            Name: 
                        </Text>
                        <Text style={styles.text2}>
                            {this.props.product.product_name}
                        </Text>
                    </View>
                </View>
                <View style={styles.namerow}>
                    <View style={styles.row2nd}>
                        <Text style={styles.title1}>
                            Total amount: 
                        </Text>
                        <Text style={styles.text1}>
                            {this.props.product.total_amount}
                        </Text>
                    </View>
                    <View style={styles.row3rd}>
                        <Text style={styles.title2}>
                            Amount sold: 
                        </Text>
                        <Text style={styles.text2}>
                            {this.props.product.amount_sold}
                        </Text>
                    </View>
                </View>
                <View style={styles.namerow}>
                    <View style={styles.row2nd}>
                        <Text style={styles.title1}>
                            Description: 
                        </Text>
                        <Text style={styles.text1}>
                            {this.props.product.description}
                        </Text>
                    </View>
                    <View style={styles.row3rd}>
                        <Text style={styles.title2}>
                            Category: 
                        </Text>
                        <Text style={styles.text2}>
                            {this.props.product.category}
                        </Text>
                    </View>
                </View>
                <View style={styles.namerow}>
                    <View style={styles.row2nd}>
                        <Text style={styles.title1}>
                            机构代码:   
                        </Text>
                        <Text style={styles.text1}>
                            {this.props.product.institution_code}
                        </Text>
                    </View>
                    <View style={styles.row3rd}>
                        <Text style={styles.title1}>
                            单价： 
                        </Text>
                        <Text style={styles.text2}>
                            {this.props.product.unit_price}
                        </Text>
                        <Text style={styles.title2}>
                            是否动态报价： 
                        </Text>
                        <Text style={styles.text2}>{this.props.product.dynamicPrice}</Text>
                    </View>
                </View>
            </View>
        )
    }

}


export default ProductInfo;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    wholelist: {
        backgroundColor: '#169',
        height: 150,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
    },
    namerow: {
        flex: 9,
        flexDirection: 'row',
    },
    row1st: {
        flex: 1,
        backgroundColor: '#58a'
    },
    row2nd: {
        flex: 4,
        backgroundColor: '#77a',
        flexDirection: 'row'
    },
    row3rd: {
        flex: 4,
        backgroundColor: '#77a',
        flexDirection: 'row'
    },
    title1: {
        color: '#b77',
        fontSize: 15
    },
    text1: {
        color: 'white',
        fontSize: 13,
    },
    title2: {
        color: '#b77',
        fontSize: 15
    },
    text2: {
        color: 'white',
        fontSize: 13,
    }
});