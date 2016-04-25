/**
 * Created by amita on 3/18/2016.
 */

import React, {PropTypes } from 'react';
import {Col} from 'react-bootstrap'
import {ItemList} from '../views'
import {Item} from '../views'
import {GroupListContainer} from './index.js'
import {bindActionCreators} from 'redux';
import * as itemActionCreators from 'common/webServices/itemService';
import * as itemAddActionCreators from 'common/actions/itemActions';

import {connect} from 'react-redux';

export default class ItemContainer extends React.Component {
    componentWillMount (){
      this.props.itemactions.getItems();

    }
    render() {
        const { products,addeditemsId } = this.props
        return (
                <div>

                <div className="box">
            <div className="row">
<Col xs={12} sm={12} md={6}>
        <GroupListContainer />
            </Col>
        </div>
        <div className="row">
        <Col xs={12} sm={12} md={12}>
            <ItemList
        itemAddAction={this.props.itemactions.getItems}>
        {products && products.map(item=>
    item.events.map(product =>
<Item

    product={product}


        />
)
)}
</ItemList>
    </Col>
    </div>
    </div>
    </div>
)
}
}
const mapStateToProps = (state) => ({
    products   : state.Items,
    addeditemsId:state.AddedItemsCount


});
const mapDispatchToProps = (dispatch) => ({
      itemactions : bindActionCreators(itemActionCreators, dispatch),
    itemAddActionCreators: bindActionCreators(itemAddActionCreators, dispatch)

})

ItemContainer.defaultProps ={
    products:[],
    addeditemsId:0

}

export default connect(mapStateToProps,mapDispatchToProps)(ItemContainer);
