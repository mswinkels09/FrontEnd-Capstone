//What the home page will look like with all the items listed
import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { Item } from "./Item";
import { UserContext } from "../users/UserProvider";
import "./Item.css"
import { ConsumptionContext } from "../consumption/ConsumptionProvider";


export const ItemList = props => {
    const { userConsumptions, getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser, currentUser } = useContext(UserContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    // const itemUserId = itemConsumptions.map(item => {
    //     item.consumptions.find(c => {
    //         c.userId === parseInt(props.match.params.userId)
    //     })
    // }) || {}

    useEffect(() => {
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])

    return (
        <div>
            <header className="header">
                <h1>PATH SO FAR</h1>
                <div className="div__add_consumption">
                    <button className="btn__add_consumption" onClick={() => props.history.push("/track_consumption")}>
                            +
                    </button>
                </div>
            </header>

            <article className="itemList items">
                {
                    itemConsumptions.map(item => {
                        let totalItemConsumption = 0
                        
                        item.consumptions.forEach(consumption => {
                            totalItemConsumption += consumption.servings
                    })
                        let hoursSinceConsumed = 0
                        const currentTime = new Date()
                        
                        item.consumptions.forEach(consumption => {
                            const consumptionTime = new Date(consumption.time)
                            hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)

                        console.log(hoursSinceConsumed)
                    })
                    return <Item key={item.id}
                    item={item}
                    servings={totalItemConsumption}

                    hours={hoursSinceConsumed} />
                    })
                }
            </article>
        </div>
    )
}