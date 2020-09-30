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

    useEffect(() => {
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])

    return (
        <div className="div__itemList">
            <header className="header">
                <h1 className="pageTitle">PATH SO FAR</h1>
                <div className="div__add_consumption">
                    <button className="btn__add_consumption btn" onClick={() => props.history.push("/track_consumption")}>
                            +
                    </button>
                </div>
            </header>

            <article className="itemList items">
                {
                    itemConsumptions.map(item => {
                        
                        const userItemObj = item.consumptions.find(c => {
                            return c.userId === currentUserId}) || {}
                            
                            if(userItemObj.userId === currentUserId) {   
                                let totalItemConsumption = 0
                                const todaysConsumptionsArray = item.consumptions.filter(consumption => {
                                    const consumptionTime = new Date(consumption.time)
                                    const currentTime = new Date()

                                return consumptionTime.getDate() === currentTime.getDate()
                            })   

                                todaysConsumptionsArray.forEach(consumption => {
                                    totalItemConsumption += consumption.servings
                                })
                                let hoursSinceConsumed = 0
                                
                            
                                const currentTime = new Date()
                               
                                const sortedConsumptionTimes = item.consumptions.sort((a,b) => {return new Date(b.time) - new Date(a.time)})
                                
                                sortedConsumptionTimes.find(consumption => {
                                    const consumptionTime = new Date(consumption.time)
                                   return hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)
                                })
                                return <Item key={item.id}
                                item={item}
                                servings={totalItemConsumption}
            
                                hours={hoursSinceConsumed} />                        
                        }
                    })
                }
            </article>
        </div>
    )
}