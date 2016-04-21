/**
 * Created by amita on 3/17/2016.
 */
import React, {PropTypes } from 'react'
import {Button} from 'react-bootstrap';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tdstyle = {
            'padding-top': '2%'
        };
        const {id, price, quantity, title } = this.props.product

        return (
            <div className="box" style={tdstyle}> {id}:{title} - &#36;{price} {quantity ? `x ${quantity}` : null}

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