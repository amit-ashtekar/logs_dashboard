/**
 * Created by amita on 4/29/2016.
 */

import React, {PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {Col} from 'react-bootstrap'
import {Input} from "react-bootstrap";
import * as groupWebActionCreators from 'common/webServices/dropdownList.js';
import * as groupActionCreators from 'common/actions/dropdown.js';
import * as itemActionCreators from 'common/webServices/itemService';
import {connect} from 'react-redux';

export default class FilterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterPattern: '',
            value:''

        };
    }
    componentWillMount (){
        this.props.streamwebactions.getStreams();
    }
    onStreamSelected(e){
        e.preventDefault();
        console.log("selected Stream:",e.target.value);
        this.props.streamactions.selectedStream(e.target.value);
        if(e.target.value!=="select") {
            var getLogEventsStorObj= JSON.parse( localStorage.getItem("getLogEvents"));
            this.props.itemactions.getItems(undefined, getLogEventsStorObj,this.successcb);
        }
    }
    handleChange(event) {

      //  this.state.filterPattern=event.target.value
        this.setState({ filterPattern: event.target.value });
        console.log("input box state :",this.state.filterPattern);
    }
    handleSelect(event) {

        //this.state.value=event.target.value;
        this.setState({ value: event.target.value });

    }
    successcb(resJson){
        var getLogEvents={};
        getLogEvents.nextForwardToken=resJson.nextForwardToken;
        getLogEvents. nextBackwardToken=resJson. nextBackwardToken;
        localStorage.setItem("getLogEvents",JSON.stringify(getLogEvents));
    }
    render() {
        const { streams } = this.props;

        return (

                <div className="row">
                    <Col xs={12} sm={12} md={6}>
            <Input type="select"
                   placeholder="Set Filter"
                   onChange={(e)=>this.handleSelect(e)}>
                <option value="select">Select Stream</option>
                <option value="1">Filter Pattern</option>



            </Input>
                      </Col>  <Col xs={12} sm={12} md={6}>
                { this.state.value==="1" ? <Input type="text"  value={this.state.filterPattern}
                                                  onChange={(e)=>this.handleChange(e)}>

                </Input> : null }
               </Col>
                </div>
        )
    }
}
const mapStateToProps = (state) => ({

    streams:state.streams

});
const mapDispatchToProps = (dispatch) => ({

    streamactions:bindActionCreators(groupActionCreators, dispatch),
    streamwebactions:bindActionCreators(groupWebActionCreators, dispatch),
    itemactions : bindActionCreators(itemActionCreators, dispatch),
})



export default connect(mapStateToProps,mapDispatchToProps)(FilterContainer);

