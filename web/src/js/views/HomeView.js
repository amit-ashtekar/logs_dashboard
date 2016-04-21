import React from 'react';
import {Link} from 'react-router';
import slide1 from '../../img/slide1.jpg';


export default class HomeView extends React.Component {

    render () {
        return (
            <div>
            <div className="row">
        <div className="box">
        <div className="col-lg-12 text-center">
        <div id="carousel-example-generic" className="carousel slide">

        <ol className="carousel-indicators hidden-xs">
        <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
        </ol>


        <div className="carousel-inner">
        <div className="item active">
        <img className="img-responsive img-full" src={slide1} alt=""/>
        </div>


        </div>


        <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
        <span className="icon-prev"></span>
        </a>
        <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
        <span className="icon-next"></span>
        </a>
        </div>

        </div>
        </div>
        </div>



        </div>






        );
    }

}
