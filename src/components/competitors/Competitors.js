import React, { useContext, useEffect} from "react"
import "../progress/ProgressList.css";
import { UserContext } from "../users/UserProvider";
import { TrophyContext } from "../trophies/TrophyProvider";
import { Trophy } from "../trophies/Trophy";


export const Competitor = ({ user}) => {
    const { getCurrentUser, users, getUsers } = useContext(UserContext)
    const { getTrophies, getUserTrophies, trophies, userTrophies } = useContext(TrophyContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    const otherUserTrophiesArray = userTrophies.filter(t => {
        return t.userId !== currentUserId
    })

    console.log(otherUserTrophiesArray, "othertrophies")

    useEffect(() => {
        getUsers()
        getTrophies()
        getUserTrophies()
    }, [])

    return( 
        <section className="trophy">
            <h3 ><strong>
                <div className="trophy__name">
                    <div>{user.username}</div> 
                </div>
            </strong></h3>
                {
                        trophies.map(trophy => {
                            const foundTrophies = otherUserTrophiesArray.find(uta => {
                                return uta.trophyId === trophy.id
                            }) || {}
                            console.log(otherUserTrophiesArray,"test")
                            if(foundTrophies.trophyId === trophy.id) {
                                if(foundTrophies.userId === user.id) {
    
                                    return <div>{`${trophy.name}`}</div>
                                    
                                }
                            }
                            
    
                    })
                }
        </section>
    ) 
}

{/* <section className="trophy">
<h3 ><strong>
    <div className="trophy__name">
        <div>{user.username}</div> 
    </div>
</strong></h3>
    {
            trophies.map(trophy => {
                otherUserTrophiesArray.map(m => {

                    if(m.userId === user.id && m.trophyId === trophy.id) {
                        console.log(trophy.name, "test1")
                            return <div>{`${trophy.name}`}</div>
                            
                    }
                })
                

        })
    }
</section> */}