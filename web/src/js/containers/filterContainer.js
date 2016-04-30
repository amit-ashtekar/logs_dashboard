/**
 * Created by amita on 4/29/2016.
 */

import React, {PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {Col,Glyphicon} from 'react-bootstrap'
import {Input} from "react-bootstrap";
import * as groupWebActionCreators from 'common/webServices/dropdownList.js';
import * as groupActionCreators from 'common/actions/dropdown.js';
import * as itemActionCreators from 'common/webServices/itemService';
import {connect} from 'react-redux';
import {urlobj} from 'common/apiurls';
import {filterLogParams} from 'common/AWSConfig/config.js';

export default class FilterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterPattern: '',
            value:'0'

        };
    }
    componentWillMount (){
        this.props.streamwebactions.getStreams();
    }
    onSearch(e){
        e.preventDefault();
        console.log("filterLogParams:",filterLogParams);
        this.props.itemactions.getFilteredLogs(urlobj.getFilterLogEvents,undefined, filterLogParams,this.successcb);
    }


    handleChange(event) {

        //  this.state.filterPattern=event.target.value
        this.setState({filterPattern: event.target.value});
        filterLogParams.filterPattern = event.target.value;
        console.log("input box state :", filterLogParams.filterPattern);
    }

    handleSelect(event) {

        //this.state.value=event.target.value;
        this.setState({ value: event.target.value });

    }
    successcb(resJson){

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
                      </Col>  <Col xs={10} sm={10} md={4}>
                { this.state.value==="1" ? <Input type="text"  value={this.state.filterPattern}
                                                  onChange={(e)=>this.handleChange(e)}>

                </Input> : null }
                    { this.state.value==="0" ? <label className="form-control" >Enter Filtered Value</label> : null }
               </Col>

                <Col xs={2} sm={2} md={2}>
            <button type="button" className="btn btn-default"
                onClick={(e)=>this.onSearch(e)}>
                <Glyphicon glyph="search" />
            </button>
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

