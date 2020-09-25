//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { Trophy } from "./Trophy";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";
import "./Trophy.css";
import { TrophyContext } from "./TrophyProvider";


export const TrophyList = props => {
    const { getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser} = useContext(UserContext)
    const { getItems} = useContext(ItemContext)
    const {getTrophies, getTrophyById, getUserTrophies, trophies, userTrophies} = useContext(TrophyContext)

    const [userTrophiesFound, setUserTrophies] = useState({})

    const currentUserId = parseInt(localStorage.getItem("user"))

    const userItemObj = itemConsumptions.filter(item => {
        const userItemFound = item.consumptions.find(c => {
            return c.userId === currentUserId
        }) || {}
        const userItemId = userItemFound.userId
        return userItemId
    })
  console.log(userItemObj)
    const userTrophiesObj = userTrophies.filter(t => {
        return t.userId === currentUserId
    })


    useEffect(() => {
        getItems()
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
        getTrophies()
        getUserTrophies()
    }, [])
    

    return (
        <div>
            <header className="header progress__header">
                <h1>TROPHIES</h1>
            </header>
            <article className="trophyList">
                <div>COMING SOON</div>
                <section className="progress">
{/* 
                {
                    userItemObj.map(item => {



                        
                        let totalItemConsumption = 0
                        let totalCalories = 0
                        let totalSugarIntake = 0
                        let totalCost = 0
                        
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

                            // const trophiesEarned = userTrophiesObj.find(ut => {

                            // })

                            return <Trophy key={item.id}
                                item={item}
                                calories={totalCalories}
                                sugar={totalSugarIntake}
                                cost={totalCost}
                                hours={hoursSinceConsumed}
                            />
                        })
                } */}
                </section>
            </article>
        </div>
    )
}