//How the Items will look on the home page
import React, { useContext, useEffect, useState } from "react"
import { ItemContext } from "./ItemProvider"

export const ItemDetail = (props) => {
    const { deleteItem, getItemById} = useContext(ItemContext)

    const [items, setItems] = useState({})

    useEffect(() => {
        const itemId = parseInt(props.match.params.itemId)
        getItemById(itemId)
            .then(setItems)
    }, [])

    return (
        <section className="item">
            <h3 className="item__name">{items.name}</h3>
            <button onClick={() => {
                props.history.push(`/`)
            }}>X</button>
            <div className="item__size">Size: {items.size} oz</div>
            <div className="item__location">Calories: {items.calories}</div>
            <div className="item__sugar">Sugar: {items.sugar}</div>
            <div className="item__cost">Cost: {items.cost}</div>
            <button onClick={
                () => {
                    deleteItem(items.id)
                        .then(() => {
                            props.history.push("/")
                        })
                }
            }>
                Delete Item
            </button>
            <button onClick={() => {
                props.history.push(`/edit/${items.id}`)
            }}>Edit</button>
        </section>
    )
}