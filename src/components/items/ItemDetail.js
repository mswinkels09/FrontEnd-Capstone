//How the Items will look on the home page
import React, { useContext, useEffect, useState } from "react"
import { ItemContext } from "./ItemProvider"
import "./ItemDetail.css";

export const ItemDetail = (props) => {
    const { deleteItem, getItemById} = useContext(ItemContext)

    const [items, setItems] = useState({})

    useEffect(() => {
        const itemId = parseInt(props.match.params.itemId)
        getItemById(itemId)
            .then(setItems)
    }, [])

    return (
        <section className="item itemDetail">
            <div>
                <button className="item_detail__btn_close" onClick={() => {
                    props.history.push(`/`)
                }}>X</button>
                <h3 className="item_detail__name">{items.name}</h3>
                <div className="item_detail item__form">Size: {items.size} oz</div>
                <div className="item_detail item__form">Calories: {items.calories}</div>
                <div className="item_detail item__form">Sugar: {items.sugar}</div>
                <div className="item_detail item__form">Cost: ${items.cost}</div>
                <div className="item_detail__btns">
                    <button className="btn item_detail__btn" onClick={() => {
                        props.history.push(`/edit/${items.id}`)
                    }}>Edit</button>
                    <button className="btn item_detail__btn" onClick={
                        () => {
                            deleteItem(items.id)
                                .then(() => {
                                    props.history.push("/")
                                })
                        }
                    }>
                        Delete Item
                    </button>
                </div>
            </div>
        </section>
    )
}