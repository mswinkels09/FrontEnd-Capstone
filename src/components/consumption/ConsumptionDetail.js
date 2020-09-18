import React, { useState, useEffect, useContext } from "react"
import { ConsumptionContext } from "./ConsumptionProvider";


export const ServingsDetail = (props) => {        
    const { consumptions, getConsumptions } = useContext(ConsumptionContext)
    
    useEffect(() => {
        getConsumptions()
    }, [])

    // useEffect(() => {
    //     debugger
    //     const todaysConsumptions = consumptions.filter(c => c.time.toLocaleDateString("en-US") === new Date().toLocaleDateString("en-US")) || {}
    // }, [consumptions])
    
    let todayServings = 0
    
    // const todayServings = todaysConsumptions.map(tc => tc.)
    return (
        <section className="employee">
            <h3 className="servings_today__header">Servings Consumed Today</h3>
            <div>
                {
    
                }
            </div>
        </section>
    )
}

{

}