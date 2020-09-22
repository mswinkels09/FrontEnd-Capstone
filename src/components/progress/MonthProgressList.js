//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { MonthProgress } from "./MonthProgress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";


export const MonthProgressList = props => {
    const { getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser, currentUser } = useContext(UserContext)
    const { getItems, setItems, items } = useContext(ItemContext)

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
            <header className="header">
                <h1>Month's PROGRESS</h1>
            </header>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress")}>
                Overall Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/today")}>
                Today's Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/week")}>
                Week's Consumptions
            </button>
            <article className="progressList">
                <fieldset>
                    <div className="div__add_consumption">
                        <label htmlFor="itemSelect">Item select: </label>
                        <select name="itemSelect" id="itemSelect" className="form-control"
                            proptype="int"
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a item</option>
                            {userItemObj.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name} - {item.size} oz
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                {
                    itemConsumptions.map(item => {

                        const currentTime = new Date()

                        if (item.id === parseInt(selectedItem.itemSelect)) {

                            const monthsConsumptionsArray = item.consumptions.filter(consumption => {
                                const consumptionTime = new Date(consumption.time)

                                return consumptionTime.getMonth() === currentTime.getMonth()
                            })
                            let monthsConsumptionsObj = {}

                            monthsConsumptionsArray.forEach(consumption => {

                                if (Object.keys(monthsConsumptionsObj).includes(consumption.itemId.toString())) {
                                    const totalMonthCalories = (consumption.servings * item.calories) + monthsConsumptionsObj[consumption.itemId].calories
                                    const totalMonthSugar = (consumption.servings * item.sugar) + monthsConsumptionsObj[consumption.itemId].sugar
                                    const totalMonthCost = (consumption.servings * item.cost) + monthsConsumptionsObj[consumption.itemId].cost
                                    monthsConsumptionsObj[consumption.itemId] = { "calories": totalMonthCalories, "sugar": totalMonthSugar, "cost": totalMonthCost }
                                } else {
                                    monthsConsumptionsObj[consumption.itemId.toString()] = { "calories": (consumption.servings * item.calories), "sugar": (consumption.servings * item.sugar), "cost": (consumption.servings * item.cost) }


                                }
                                // hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)     

                            })
                            return Object.keys(monthsConsumptionsObj).map(key => {
                                return <MonthProgress key={key}
                                    item={itemFound()}
                                    calories={monthsConsumptionsObj[key].calories}
                                    sugar={monthsConsumptionsObj[key].sugar}
                                    cost={monthsConsumptionsObj[key].cost}
                                // hours={hoursSinceConsumed}
                                />
                            })
                        }
                    }
                    )

                }
            </article>
        </div>
    )
}