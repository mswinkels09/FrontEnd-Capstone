//What the home page will look like with all the items listed
import React, { useContext, useEffect, useState } from "react"
import { Competitor } from "./Competitors";
import { UserContext } from "../users/UserProvider";
import "../trophies/Trophy.css";
import { TrophyContext } from "../trophies/TrophyProvider";


export const CompetitorsList = props => {
    const { getCurrentUser, users, getUsers } = useContext(UserContext)
    const { getTrophies, getTrophyById, getUserTrophies, trophies, userTrophies } = useContext(TrophyContext)

    const [userTrophiesFound, setUserTrophies] = useState({})

    const currentUserId = parseInt(localStorage.getItem("user"))

    // const trophiesArray = trophies.filter(trophy => {
    //     const foundTrophies = userTrophiesArray.find(uta => {
    //         return uta.trophyId === trophy.id
    //     }) || {}
    //     const foundTrophyName 
    // })

    const foundOtherUsers = users.filter(u => {
        return u.id !== currentUserId
    })

    console.log(foundOtherUsers, "foundusers")


    
    const otherUserTrophiesArray = userTrophies.filter(t => {
        return t.userId !== currentUserId
    })
    
    console.log(otherUserTrophiesArray, "othertrophies")

    const foundTrophyArray = trophies.filter(trophy => {
            const foundTrophies = otherUserTrophiesArray.filter(uta => {
                if(uta.trophyId === trophy.id) {
                    return true
                }
            }) || {}
            console.log(foundTrophies, "foundtrophyarray")
            return foundTrophies
    })


    useEffect(() => {
        getUsers()
        getCurrentUser()
        getTrophies()
        getUserTrophies()
    }, [])


    return (
        <div>
            <header className="header progress__header">
                <h1>Competitors</h1>
            </header>
            <article className="trophyList">
                <section className="trophies">
                    {
                            foundOtherUsers.map(users => {
                                
                                    // if(foundTrophies.trophyId === trophy.id) {
                                    //     if(foundTrophies.userId === users.id) {

                                            return <Competitor key={users.id}
                                                user={users}
                                                // trophy={trophy}
                                            />
    
                                            
                                    //     }
                                    // }
                                    
            
                            
                            })


                        }

                </section>
            </article>
        </div>
    )
}



