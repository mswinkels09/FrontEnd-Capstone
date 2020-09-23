//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { Progress } from "./Progress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";
import "./ProgressList.css";


export const ProgressList = props => {
    const { getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser} = useContext(UserContext)
    const { getItems} = useContext(ItemContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    const userItemObj = itemConsumptions.filter(item => {
        const userItemFound = item.consumptions.find(c => {
            return c.userId === currentUserId
        }) || {}
        const userItemId = userItemFound.userId
        return userItemId
    })

    const [selectedItem, setSelectedItem] = useState([])

    const handleControlledInputChange = (itemObj) => {
        const filteredItem = Object.assign({}, selectedItem)
        filteredItem[itemObj.target.name] = itemObj.target.value
        setSelectedItem(filteredItem)
    }

    const itemFound = () => {
        const foundItem = itemConsumptions.find(c => {
            return c.id === parseInt(selectedItem.itemSelect)
        })
            || {}
        return foundItem
    }



    useEffect(() => {
        getItems()
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])

    return (
        <div>
            <header className="header progress__header">
                <h1>OVERALL PROGRESS</h1>
            </header>
            <article className="progressList">
                <fieldset>
                    <div className="div__add_consumption">
                        <label htmlFor="itemSelect">Item select: </label>
                        <select name="itemSelect" id="itemSelect" className="form-control"
                            proptype="int"
                            defaultValue=""
                            onChange={handleControlledInputChange}>

                            <option value="0">Overall Progress</option>
                            {userItemObj.map(item => (
                                <option key={item.id} value={item.id}>{item.name} - {item.size} oz</option>

                            ))}
                        </select>
                    </div>
                </fieldset>
                <section className="progress">

                {
                    itemConsumptions.map(item => {

                        
                        let totalItemConsumption = 0
                        let totalCalories = 0
                        let totalSugarIntake = 0
                        let totalCost = 0
                        let hoursSinceConsumed = 0
                        const currentTime = new Date()
                        
                        if (item.id === parseInt(selectedItem.itemSelect)) {
                            console.log(selectedItem.itemSelect)

                            item.consumptions.forEach(consumption => {


                                totalItemConsumption += consumption.servings

                                totalCalories = item.calories * totalItemConsumption
                                totalSugarIntake = item.sugar * totalItemConsumption
                                totalCost = item.cost * totalItemConsumption

                            })
                            let hoursSinceConsumed = 0

                            const currentTime = new Date()

                            const sortedConsumptionTimes = item.consumptions.sort((a, b) => { return new Date(b.time) - new Date(a.time) })

                            sortedConsumptionTimes.find(consumption => {
                                const consumptionTime = new Date(consumption.time)
                                return hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime()) / (1000 * 60 * 60)).toFixed(1)
                            })

                            return <Progress key={item.id}
                                item={itemFound()}
                                calories={totalCalories}
                                sugar={totalSugarIntake}
                                cost={totalCost}
                                hours={hoursSinceConsumed}
                            />
                        } 
                        else if (selectedItem.value === 0) {
                                                         
                                    item.consumptions.forEach(consumption => {
                                        
                                        totalItemConsumption += consumption.servings
                                        
                                        totalCalories = item.calories * totalItemConsumption
                                        totalSugarIntake = item.sugar * totalItemConsumption
                                        totalCost = item.cost * totalItemConsumption
                                        
                                    })
                                    let hoursSinceConsumed = 0
                                    
                                    const currentTime = new Date()
                                    
                                    const sortedConsumptionTimes = item.consumptions.sort((a, b) => { return new Date(b.time) - new Date(a.time) })
                                    
                                    sortedConsumptionTimes.find(consumption => {
                                        const consumptionTime = new Date(consumption.time)
                                        return hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime()) / (1000 * 60 * 60)).toFixed(1)
                                    })
                                return <Progress key={item.id}
                                    item={item}
                                    calories={totalCalories}
                                    sugar={totalSugarIntake}
                                    cost={totalCost}
                                    hours={hoursSinceConsumed}
                                />
                            }
                    })
                }
                </section>
                <div className="progress__btns">
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/today")}>
                        Today
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/month")}>
                        Month
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/week")}>
                        Week
                    </button>
                </div>
            </article>
        </div>
    )
}