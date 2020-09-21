//how each item will be represented on DOM
import React from "react"


export const TodayProgress = ({ item, hours, calories, sugar, cost }) => {
    

    return( 
        <section className="item">
            <h3 className="item__name"><strong>
                    {item.name} - {item.size} oz
            </strong></h3>
            <div className="item__servings">
                calories: {calories}
            </div>
            <div className="item__hours">
                Sugar Intake: {sugar}
            </div>
            <div className="item__servings">
                Total Cost: ${cost}
            </div>
        </section>
    ) 
}