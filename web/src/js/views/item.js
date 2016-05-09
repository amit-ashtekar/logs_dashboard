/**
 * Created by amita on 3/17/2016.
 */
import React, {PropTypes } from 'react'
import {Button} from 'react-bootstrap';
import moment from 'moment';
import {Col} from 'react-bootstrap'

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    onAddToCartClicked(e,id){
        e.preventDefault();
        this.props.itemAddAction()
        // alert('onAddToCartClicked called')
    }
    getStyle(id){
        if(id % 2 == 0)
        return true;
        else
        return false;
    }


    render() {
        const tdstyle = {
            'padding-top': '2%',
        'background-color':'#CABEAD'
        };
        const td1style = {
            'padding-top': '2%',
            'background-color':'#F0E197'
        };
        const msgpadding = {
            'padding-left': '11%'

        };

      //  const {id, price, quantity, title } = this.props.product

        return (
            <div className="row box" style={this.getStyle(this.props.indexkey)?tdstyle:td1style}>
                <Col xs={2} sm={2} md={2}>
                    { moment.utc(this.props.product.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </Col>
                <Col xs={10} sm={10} md={10} style={msgpadding}>
                    {this.props.product.message }
                </Col>
                </div>
            )
    }
}

Item.propTypes = {
    price: PropTypes.number,
    quantity: PropTypes.number,
    title: PropTypes.string
}
Item.defaultProps = {
    price: 0,
    quantity:0,
    title:'Item testing'
    };