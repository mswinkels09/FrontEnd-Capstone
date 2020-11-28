//how each item will be represented on DOM
import React from "react"
import { Link } from "react-router-dom"
import "./ProgressList.css";


export const TodayProgress = ({ item, calories, sugar, cost }) => {
    


    return( 
        <section className="progress__item">
            <h3 ><strong>
                <div className="item__name item__name_progress">
                <Link to={`/progress/${item.id}`}>{item.name}</Link><div className="item__size">{item.size} oz</div>
                </div>
            </strong></h3>
            <div className="progress__data_div">
                <div className="progress__data">
                    <div className="progress__data_title">TOTAL CALORIES CONSUMED:</div>  
                    <div className="progress__data_data">{calories}</div>
                </div>
                <div className="progress__data">
                    <div className="progress__data_title">TOTAL GRAMS OF SUGAR CONSUMED:</div>  
                    <div className="progress__data_data">{sugar}g</div>
                </div>
                <div className="progress__data">      
                    <div className="progress__data_title">TOTAL MONEY SPENT: </div> 
                    <div className="progress__data_data">${cost}</div>
                </div>
            </div>
        </section>
    ) 
}