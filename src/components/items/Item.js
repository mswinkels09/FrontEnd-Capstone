//how each item will be represented on DOM
import React from "react"
import { Link } from "react-router-dom"
import "./Item.css";

export const Item = ({ item, servings,hours }) => {

    return( 
        <section className="item">
            <h3><strong>
                <div className="item__name">
                <Link to={`/${item.id}`}>{item.name}</Link><div>{item.size} oz</div>
                </div>
            </strong></h3>
            <div className="item__data_div">
                <div className="item__data">
                    <div className="item__data_title">HOURS SINCE CONSUMED:</div> <div className="item__data_data">{hours}</div> 
                </div>
                <div className="item__data">
                    <div className="item__data_title">SERVINGS CONSUMED TODAY:</div> <div className="item__data_data">{servings}</div> 
                </div>
            </div>
        </section>
    ) 
}