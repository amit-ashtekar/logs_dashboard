/**
 * Created by amita on 3/18/2016.
 */

import React, {PropTypes } from 'react';
import {ItemList} from '../views'
import {Item} from '../views'
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
        <h2 className="intro-text text-center">
        <strong>Logs</strong>
        </h2>
        <hr/>
            </div>
                <div className="box">
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
    </div>
    </div>
)
}
}
const mapStateToProps = (state) => ({
    products   : state.Items,
    addeditemsId:state.AddedItemsCount,

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
