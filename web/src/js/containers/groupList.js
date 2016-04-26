/**
 * Created by amita on 4/25/2016.
 */

import React, {PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {Input} from "react-bootstrap";
import * as groupWebActionCreators from 'common/webServices/dropdownList.js';
import * as groupActionCreators from 'common/actions/dropdown.js';
import {connect} from 'react-redux';

export default class GroupListContainer extends React.Component {
    componentWillMount (){
        this.props.groupwebactions.getGroups();
    }
    onGroupSelected(e,obj){
        e.preventDefault();
        console.log("selected Group:",e.target.value);
    }
    render() {
        const { groups } = this.props;
if(groups.groups) {
    var groupValues = groups.groups.groups.map((group) => {
            return ( < option value = {group} > {group} < / option >)
}
    );
    }
        return (
            <Input type="select" label="Select Group"
        placeholder="Select Group"
    onChange={(e)=>this.onGroupSelected(e,this)}>
<option value="select">Select Group</option>

{groupValues}

</Input>
)
}
}
const mapStateToProps = (state) => ({

    groups:state.groups

});
const mapDispatchToProps = (dispatch) => ({

    groupactions:bindActionCreators(groupActionCreators, dispatch),
    groupwebactions:bindActionCreators(groupWebActionCreators, dispatch)
})



export default connect(mapStateToProps,mapDispatchToProps)(GroupListContainer);
