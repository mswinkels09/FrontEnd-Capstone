//how each item will be represented on DOM
import React from "react"
import "./ProgressList.css";


export const Progress = ({ item, hours, calories, sugar, cost }) => {
    

    return( 
        <section className="item">
            <h3 ><strong>
                <div className="item__name item__name_progress">
                   <div>{item.name}</div><div>{item.size} oz</div> 
                </div>
            </strong></h3>
            <div className="progress__data_div">
                <div className="progress__data">
                    <div className="progress__data_title">HOURS SINCE CONSUMED:</div> 
                    <div className="progress__data_data">{hours}</div>
                </div>
                <div className="progress__data">
                    <div className="progress__data_title">TOTAL CALORIES CONSUMED:</div>  
                    <div className="progress__data_data">{calories}</div>
                </div>
                <div className="progress__data">
                    <div className="progress__data_title">TOTAL GRAMS OF SUGAR CONSUMED:</div>  
                    <div className="progress__data_data">{sugar}</div>
                </div>
                <div className="progress__data">      
                    <div className="progress__data_title">TOTAL MONEY SPENT: </div> 
                    <div className="progress__data_data">${cost}</div>
                </div>
            </div>
        </section>
    ) 
}