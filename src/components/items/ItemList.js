//What the home page will look like with all the items listed
import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { Link } from "react-router-dom"
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
                    <button className="btn__add_consumption" onClick={() => props.history.push("/create__new_consumption")}>
                        <span>
                            +
                        </span>
                    </button>
                </div>
            </header>

            <article className="itemList items">
                {
                    items.map(item => {
                        return <section className="item" key={item.id}> 
                            <Link  to={`/${item.id}`}>
                                <h3>{item.name} - {item.size}oz</h3>
                            </Link>                           
                        </section>
                    })
                }
            </article>
        </div>
    )
}