import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ConsumptionContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const ConsumptionProvider = (props) => {
    const [consumptions, setConsumptions] = useState([])
    const [userConsumptions, setUserConsumptions] = useState([])
    const [userItemConsumptions, setUserItemConsumptions] = useState([])
    const [itemConsumptions, setItemConsumptions] = useState([])

    const getConsumptions = () => {
        return fetch("http://localhost:8088/consumptions")
            .then(res => res.json())
            .then(setConsumptions)
    }

    const addConsumption = consumption => {
        return fetch("http://localhost:8088/consumptions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consumption)
        })
            .then(getConsumptions)
    }

    const getUserConsumptions = (userid) => {
        return fetch(`http://localhost:8088/consumptions?userId=${ userid }`)
            .then(res => res.json())
            .then(setUserConsumptions)
    }

    const getConsumptionById = (id) => {
        return fetch(`http://localhost:8088/consumptions/${ id }?_expand=item&_expand=user`)
            .then(res => res.json())
    }

    const getConsumptionByItem = () => {
        return fetch(`http://localhost:8088/items?_embed=consumptions`)
            .then(res => res.json())
            .then(setItemConsumptions)
    }
    
    const deleteConsumption = consumptionId => {
        return fetch(`http://localhost:8088/consumptions/${consumptionId}`, {
            method: "DELETE"
        })
            .then(getConsumptions)
    }

    const updateConsumption = consumption => {
        return fetch(`http://localhost:8088/consumptions/${consumption.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consumption)
        })
            .then(getConsumptions)
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <ConsumptionContext.Provider value={{
            consumptions, addConsumption, getConsumptions, deleteConsumption, updateConsumption,
            getUserConsumptions, getConsumptionById, userConsumptions, getConsumptionByItem, userItemConsumptions, itemConsumptions
        }}>
            {props.children}
        </ConsumptionContext.Provider>
    )
}