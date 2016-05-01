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
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class FilterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterPattern: '',
            startTime:moment(new Date().getTime()),
            endTime:moment(new Date().getTime()),
            value:'0'

        };
    }
    componentWillMount (){

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
    handleDateChange(e,date){
        //this.setState({startTime: event.target.value});
        if(e  !==null) {
            this.setState({startTime: moment(e._d.getTime())});
            filterLogParams.startTime = e._d.getTime();
            console.log("startTime :", filterLogParams.startTime);
        }
        else{
            this.setState({startTime: 0});
            filterLogParams.startTime = 0;
            console.log("startTime :", filterLogParams.startTime);
        }
    }
    handleEndDateChange(e,date){
        //this.setState({startTime: event.target.value});
        if(e  !==null) {
            this.setState({endTime: moment(e._d.getTime())});
            filterLogParams.endTime = e._d.getTime();
            console.log("endTime :", filterLogParams.endTime);
        }
        else{
            this.setState({endTime: 0});
            filterLogParams.endTime = 0;
            console.log("endTime :", filterLogParams.endTime);
        }
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
                <option value="2">Start Time</option>
                <option value="3">End Time</option>



            </Input>
                      </Col>
                    <Col xs={10} sm={10} md={6}>
                    <div className="input-group add-on">

                { this.state.value==="1" ? <Input type="text"  value={this.state.filterPattern}
                                                  onChange={(e)=>this.handleChange(e)}>

                </Input> : null }
                    { this.state.value==="0" ? <label className="form-control" >Enter Filtered Value</label> : null }
                    { this.state.value==="2" ?         <DatePicker
                        placeholderText="Click to select a date"
                        selected={this.state.startTime}
                        onChange={(e,date)=>this.handleDateChange(e,date)}
                        className='form-control'>
                    </DatePicker> : null }
                    { this.state.value==="3" ?         <DatePicker
                        placeholderText="Click to select a date"
                        selected={this.state.endTime}
                        onChange={(e,date)=>this.handleEndDateChange(e,date)}
                        className='form-control'>
                    </DatePicker> : null }




                    <div className="input-group-btn">
            <button type="button" className="btn btn-default"
                onClick={(e)=>this.onSearch(e)}>
                <Glyphicon glyph="search" />
            </button>
                        </div>
                    </div>
                    </Col>


                </div>
        )
    }
}
const mapStateToProps = (state) => ({



});
const mapDispatchToProps = (dispatch) => ({


    itemactions : bindActionCreators(itemActionCreators, dispatch)
})



export default connect(mapStateToProps,mapDispatchToProps)(FilterContainer);

