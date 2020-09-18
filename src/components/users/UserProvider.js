import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const UserContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
        const currentUserId = localStorage.getItem("user")
        // const currentUserId = parseInt(sessionStorage.activeUser)
        const id = parseInt(currentUserId)

        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
            .then(setCurrentUser)
    }


    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <UserContext.Provider value={{
            users, addUser, getUsers, getCurrentUser, currentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}