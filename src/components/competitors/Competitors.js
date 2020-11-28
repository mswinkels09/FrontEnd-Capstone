import React, { useContext, useEffect} from "react"
import "../progress/ProgressList.css";
import "./Competitors.css"
import { UserContext } from "../users/UserProvider";
import { TrophyContext } from "../trophies/TrophyProvider";


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
        <section className="competitor">
            <h3 className="h3__competitor"><strong>
                <div className="competitor__name">
                    <div>{user.username}</div> 
                </div>
            </strong></h3>
            <div className="trophy__data_div">
                {
                        trophies.map(trophy => {
                            const foundTrophies = otherUserTrophiesArray.find(uta => {
                                return uta.trophyId === trophy.id
                            }) || {}
                            console.log(otherUserTrophiesArray,"test")
                            if(foundTrophies.trophyId === trophy.id) {
                                if(foundTrophies.userId === user.id) {
    
                                    return<div className="trophy__data">
                                        <img className="trophy__img_competitor" src="https://cdn3.iconfinder.com/data/icons/flat-set-1/64/flat_set_1-12-512.png"></img>
                                        <div className="trophy__data_name">{`${trophy.name}`}</div>
                                    </div>
                                    
                                }
                            }
                            
    
                    })
                }
            </div>
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