/**
 * Created by amita on 3/18/2016.
 */
import React, { PropTypes } from 'react'
import {Button} from 'react-bootstrap';
export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    onAddToCartClicked(e){
        e.preventDefault();
        this.props.itemAddAction()
        // alert('onAddToCartClicked called')
    }
    render() {
        return (
            <div>
            <div>{this.props.children}</div>
<Button className="pull-right"
onClick={(e)=>this.onAddToCartClicked(e)} >
Next
</Button>

            </div>
                )
            }
       }

ItemList.propTypes = {
    children: PropTypes.node
}