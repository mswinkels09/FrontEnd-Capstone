//What the home page will look like with all the items listed
import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { Link } from "react-router-dom"

export const ItemList = props => {
    const { items, getItems } = useContext(ItemContext)

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div>
            <h1>Items</h1>

            <button onClick={() => props.history.push("/create__new_item")}>
                Add item
            </button>

            <article className="itemList items">
                {
                    items.map(item => {
                        return <section className="item" key={item.id}> 
                            <Link  to={`/${item.id}`}>
                                <h3>{item.name}</h3>
                            </Link>                           
                        </section>
                    })
                }
            </article>
        </div>
    )
}