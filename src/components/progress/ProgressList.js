//What the home page will look like with all the items listed
import React, { useContext, useEffect, useRef } from "react"
import { Progress } from "./Progress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";


export const ProgressList = props => {
    const { userConsumptions, getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser, currentUser } = useContext(UserContext)
    const { getItems, items } = useContext(ItemContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    const item = useRef(null)

    useEffect(() => {
        getItems()
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])
    debugger
    return (
        <div>
            <header className="header">
                <h1>PROGRESS</h1>
                <fieldset>
                    <div className="div__add_consumption">
                        <label htmlFor="itemSelect">Item select: </label>
                        <select defaultValue="" name="itemSelect" ref={item} id="itemSelect" className="form-control" >
                            <option value="0">Select a item</option>
                            {items.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name} - {e.size} oz
                                </option>
                            ))
                            }
                        </select>
                    </div>
                </fieldset>
            </header>

            <article className="progressList">
                {
                    itemConsumptions.forEach(item => {
                        let totalItemConsumption = 0
                        let totalCalories = 0
                        let totalSugarIntake = 0
                        let totalCost = 0

                        item.consumptions.forEach(consumption => {
                            totalItemConsumption +=consumption.servings
                            
    
                                totalCalories += item.calories * totalItemConsumption
                                totalSugarIntake += item.sugar * totalItemConsumption
                                totalCost += item.cost * totalItemConsumption
                                console.log(totalCalories)
                        })


                        let hoursSinceConsumed = 0
                        const currentTime = new Date()
                        
                        item.consumptions.forEach(consumption => {
                            const consumptionTime = new Date(consumption.time)
                            hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)

                        console.log(hoursSinceConsumed)
                    })
                    return <Progress key={currentUserId}
                    item={item}
                    calories={totalCalories}
                    sugar={totalSugarIntake}
                    cost={totalCost}

                    hours={hoursSinceConsumed}
                     />
                    })
                }
            </article>
        </div>
    )
}