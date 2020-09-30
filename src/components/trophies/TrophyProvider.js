import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TrophyContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const TrophyProvider = (props) => {
    
    const [trophies, setTrophies] = useState([])
    const [userTrophies, setUserTrophies] = useState([])

    const getTrophies = () => {
        return fetch("http://localhost:8088/trophies")
        .then(res => res.json())
        .then(setTrophies)
    }

    const getTrophyById = (id) => {
        return fetch(`http://localhost:8088/trophies/${ id }`)
            .then(res => res.json())
    }
    
    const getExpandedTrophies = () => {
        return fetch("http://localhost:8088/userTrophies")
        .then(res => res.json())
        .then(setUserTrophies)
    }
   
    const getUserTrophies = () => {
        return fetch("http://localhost:8088/userTrophies")
            .then(res => res.json())
            .then(setUserTrophies)
    }
    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TrophyContext.Provider value={{
            trophies, getTrophies, getTrophyById, setTrophies,
            userTrophies, getUserTrophies
        }}>
            {props.children}
        </TrophyContext.Provider>
    )
}