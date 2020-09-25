//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { Competitor } from "./Competitors";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";
import { TrophyContext } from "../trophies/TrophyProvider";


export const CompetitorsList = props => {
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

return (
    <div>
        <header className="header progress__header">
            <h1>COMPETITORS</h1>
        </header>
        <article className="trophyList">
            <div>COMING SOON</div>
            <section className="progress">
                {}
            </section>
            </article>
        </div>
    )
}