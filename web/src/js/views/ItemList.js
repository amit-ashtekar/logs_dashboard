/**
 * Created by amita on 3/18/2016.
 */
import React, { PropTypes } from 'react'
import {Button} from 'react-bootstrap';
import Switch from 'react-toggle-switch'

export default class ItemList extends React.Component {
    constructor(props) {
        super(props);

    }
    onNextClicked(e,paginationAction){
        e.preventDefault();
        this.props.itemAddAction(paginationAction)
        // alert('onAddToCartClicked called')
    }


    toggle(e) {

       if(this.value) {
           this.value = false;
           this.props.liveLogHandlr.LiveLogHandler.unsubscribe();
       }
        else {
           this.value = true;
           this.props.liveLogAction()

       }
    }

    render() {
        var isSwitchOn=true;
        return (
            <div>
            <div>{this.props.children}</div>
                <div className="btn-toolbar">
                <Button className="pull-left"
                        onClick={(e)=>this.onNextClicked(e,"Prev")} >
                    Prev
                </Button>
<Button className="pull-left"
onClick={(e)=>this.onNextClicked(e,"Next")} >
Next
</Button>
                    </div>
                <Switch value={false} on={false} onClick={(e)=>this.toggle(e)}>

                </Switch>

                       </div>
                )
            }
       }

ItemList.propTypes = {
    children: PropTypes.node
}