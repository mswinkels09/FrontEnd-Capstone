import React, { useState } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const SizeContext = React.createContext()

/*
 This component establishes what data can be used.
 */
export const SizeProvider = (props) => {
    const [sizes, setSizes] = useState([])

    const getSizes = () => {
        return fetch("http://localhost:8088/sizes")
            .then(res => res.json())
            .then(setSizes)
    }

    const addSize = size => {
        return fetch("http://localhost:8088/sizes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(size)
        })
            .then(getSizes)
    }

    const getSizeById = (id) => {
        return fetch(`http://localhost:8088/iizes/${ id }?_expand=size&_expand=user`)
            .then(res => res.json())
    }
    
    const deleteSize = sizeId => {
        return fetch(`http://localhost:8088/aizes/${sizeId}`, {
            method: "DELETE"
        })
            .then(getSizes)
    }

    const updateSize = size => {
        return fetch(`http://localhost:8088/aizes/${size.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(size)
        })
            .then(getSizes)
    }

    /*
        You return a context provider which has the
        `locations` state, the `addLocation` function,
        and the `getLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <SizeContext.Provider value={{
            sizes, addSize, getSizes, getSizeById, deleteSize, updateSize
        }}>
            {props.children}
        </SizeContext.Provider>
    )
}