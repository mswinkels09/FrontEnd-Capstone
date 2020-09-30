//how each item will be represented on DOM
import React from "react"
import "./ProgressList.css";


export const TodayProgress = ({ item, hours, calories, sugar, cost }) => {
    


    return( 
        <section className="progress__item">
            <h3 ><strong>
                <div className="item__name item__name_progress">
                   <div>{item.name}</div><div>{item.size} oz</div> 
                </div>
            </strong></h3>
            <div className="progress__data_div">
                <div className="progress__data">
                    <div className="progress__data_title">TOTAL CALORIES CONSUMED:</div>  
                    <div className="progress__data_data">{(calories !== 0)?calories :"N/A"}</div>
                </div>
                <div className="progress__data">
                    <div className="progress__data_title">TOTAL GRAMS OF SUGAR CONSUMED:</div>  
                    <div className="progress__data_data">{(sugar !== 0)?sugar :"N/A"}</div>
                </div>
                <div className="progress__data">      
                    <div className="progress__data_title">TOTAL MONEY SPENT: </div> 
                    <div className="progress__data_data">${(cost !== 0)?cost :"N/A"}</div>
                </div>
            </div>
        </section>
    ) 
}