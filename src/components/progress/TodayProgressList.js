//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { TodayProgress } from "./TodayProgress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";


export const TodayProgressList = props => {
    debugger
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
                <h1>TODAY'S PROGRESS</h1>
            </header>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress")}>
                Overall Consumptions
            </button>
            <button className="btn__todays_progress" onClick={() => props.history.push("/progress/month")}>
                Month's Consumptions
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

                            const todaysConsumptionsArray = item.consumptions.filter(consumption => {
                                const consumptionTime = new Date(consumption.time)

                                return consumptionTime.getDate() === currentTime.getDate()
                            })
                            let todaysConsumptionsObj = {}

                            todaysConsumptionsArray.forEach(consumption => {
                                debugger

                                if (Object.keys(todaysConsumptionsObj).includes(consumption.itemId.toString())) {
                                    const totalTodayCalories = (consumption.servings * item.calories) + todaysConsumptionsObj[consumption.itemId].calories
                                    const totalTodaySugar = (consumption.servings * item.sugar) + todaysConsumptionsObj[consumption.itemId].sugar
                                    const totalTodayCost = (consumption.servings * item.cost) + todaysConsumptionsObj[consumption.itemId].cost
                                    todaysConsumptionsObj[consumption.itemId] = { "calories": totalTodayCalories, "sugar": totalTodaySugar, "cost": totalTodayCost }
                                } else {
                                    todaysConsumptionsObj[consumption.itemId.toString()] = { "calories": (consumption.servings * item.calories), "sugar": (consumption.servings * item.sugar), "cost": (consumption.servings * item.cost) }


                                }
                                // hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)     

                            })
                            return Object.keys(todaysConsumptionsObj).map(key => {
                                return <TodayProgress key={key}
                                    item={itemFound()}
                                    calories={todaysConsumptionsObj[key].calories}
                                    sugar={todaysConsumptionsObj[key].sugar}
                                    cost={todaysConsumptionsObj[key].cost}
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