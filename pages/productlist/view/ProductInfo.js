import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

class ProductInfo extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.item}>
                <Text>
                    {this.props.product.product_id}
                </Text>
                <Text>
                    {this.props.product.product_name}
                </Text>
                <Text>
                    {this.props.product.total_amount}
                </Text>
                <Text>
                    {this.props.product.description}
                </Text>
                <Text>
                    {this.props.product.category}
                </Text>
                <Text>
                    {this.props.product.institution_code}
                </Text>
                <Text>
                    {this.props.product.unit_price}
                </Text>
                <Text>
                    {this.props.product.isDynamicPrice}
                </Text>
                <Text>
                    {this.props.product.amount_sold}
                </Text>
            </View>
        )
    }

}


export default ProductInfo;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#169',
        height: 200,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
    }

});