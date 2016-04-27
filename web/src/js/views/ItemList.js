/**
 * Created by amita on 3/18/2016.
 */
import React, { PropTypes } from 'react'
import {Button} from 'react-bootstrap';
export default class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }
    onNextClicked(e,paginationAction){
        e.preventDefault();
        this.props.itemAddAction(paginationAction)
        // alert('onAddToCartClicked called')
    }
    onLiveLogClicked(e,paginationAction){
        e.preventDefault();
        this.props.liveLogAction()
        // alert('onAddToCartClicked called')
    }
    stopLiveLogLoad(e,handler){
        e.preventDefault();
        var handlr=this.props.liveLogHandlr;
        this.props.liveLogHandlr.LiveLogHandler.unsubscribe();
    }

    render() {
        return (
            <div>
            <div>{this.props.children}</div>
                <Button className="pull-left"
                        onClick={(e)=>this.onNextClicked(e,"Prev")} >
                    Prev
                </Button>
<Button className="pull-right"
onClick={(e)=>this.onNextClicked(e,"Next")} >
Next
</Button>
                <Button className="pull-right"
                        onClick={(e)=>this.onLiveLogClicked(e)} >
                    Live Update
                </Button>
                <Button className="pull-right"
                        onClick={(e)=>this.stopLiveLogLoad(e)} >
                    Stop Live Update
                </Button>
            </div>
                )
            }
       }

ItemList.propTypes = {
    children: PropTypes.node
}