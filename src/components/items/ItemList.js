//What the home page will look like with all the items listed
import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import Item from "./Item";
import "./Item.css"

export const ItemList = props => {
    const { items, getItems } = useContext(ItemContext)

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            <header className="header">
                <h1>PATH SO FAR</h1>
                <div className="div__add_consumption">
                    <button className="btn__add_consumption" onClick={() => props.history.push("/track_consumption")}>
                            +
                    </button>
                </div>
            </header>

            <article className="itemList items">
                {
                    items.map(item => {
                        return <Item key={item.id} item={item} />
                    })
                }
            </article>
        </div>
    )
}