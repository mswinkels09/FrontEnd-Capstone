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

    const userItemArray = itemConsumptions.filter(item => {
        const userItemFound = item.consumptions.find(c => {
            return c.userId === currentUserId
        }) || {}
        const userItemId = userItemFound.userId
        return userItemId
    })

    // const trophiesArray = trophies.filter(trophy => {
    //     const foundTrophies = userTrophiesArray.find(uta => {
    //         return uta.trophyId === trophy.id
    //     }) || {}
    //     const foundTrophyName 
    // })


    const userTrophiesArray = userTrophies.filter(t => {
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
                <section className="trophies">
                {
                    trophies.map(trophy => {
                        const foundTrophies = userTrophiesArray.find(uta => {
                            return uta.trophyId === trophy.id
                        }) || {}
                        if(foundTrophies.trophyId === trophy.id) {
                            return <Trophy key={trophy.id}
                                trophy={trophy}
                        />
                        }
                        

                    })

                }

                </section>
            </article>
        </div>
    )
}