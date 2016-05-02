/**
 * Created by amita on 3/18/2016.
 */
import React, { PropTypes } from 'react'
import {Button} from 'react-bootstrap';
import Switch from 'react-toggle-switch';
import {urlobj} from 'common/apiurls'

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);

    }
    onNextClicked(e,paginationAction){
        e.preventDefault();
        var getLogEventsStorObj= JSON.parse( localStorage.getItem("getLogEvents"));
        this.props.loaderAction.startLoader();
        this.props.itemAddAction(urlobj.getItems, paginationAction,getLogEventsStorObj,this.itemAddActionSuccesscb);
        // alert('onAddToCartClicked called')
    }
    itemAddActionSuccesscb(resJson){
        var getLogEvents={};
        getLogEvents.nextForwardToken=resJson.nextForwardToken;
        getLogEvents. nextBackwardToken=resJson. nextBackwardToken;
        localStorage.setItem("getLogEvents",JSON.stringify(getLogEvents));
    }
     successcb(resJson){
        if(resJson) {

            console.log("liveLogEvents: ", resJson)
            var getLogEvents = {};
            getLogEvents.nextForwardToken = resJson.nextForwardToken;
            getLogEvents.nextBackwardToken = resJson.nextBackwardToken;
            localStorage.setItem("liveLogEvents", JSON.stringify(getLogEvents));


        }
    }
     errorcb(err){
        console.log('LiveLogError:', err);

    }


    toggle(e) {

       if(this.value) {
           this.value = false;
           this.props.liveLogHandlr.LiveLogHandler.unsubscribe();
       }
        else {
           this.value = true;
           var getLogEventsStorObj= JSON.parse( localStorage.getItem("liveLogEvents"));
           //this.props.loaderAction.startLoader();
           this.props.liveLogAction(urlobj.getLiveLogs,getLogEventsStorObj,this.successcb,this.errorcb);

       }
    }

    render() {
        var isSwitchOn=true;
        return (
            <div>
            <div>{this.props.children}</div>
                <div className="btn-toolbar">
                <Button className="pull-left" disabled={this.props.children.length===0 ? 'disabled' : ''}
                        onClick={(e)=>this.onNextClicked(e,"Prev")} >
                    Prev
                </Button>
<Button className="pull-left" disabled={this.props.children.length===0 ? 'disabled' : ''}
onClick={(e)=>this.onNextClicked(e,"Next")} >
Next
</Button>

                    <h4 className="brand-before-automargin pull-right">
                        <small>Live Logs</small>
                    </h4><Switch value={false} on={false} onClick={(e)=>this.toggle(e)}>

                </Switch>
                </div>

                       </div>
                )
            }
       }

ItemList.propTypes = {
    children: PropTypes.node
}