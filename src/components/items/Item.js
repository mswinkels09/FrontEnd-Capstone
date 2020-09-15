//how each item will be represented on DOM
import React from "react"
import { Link } from "react-router-dom"

export default ({ item }) => (
    <section className="item">
        <h3 className="item__name"><strong>
            <Link to={`/${item.id}`}>
                {item.name} - {item.size} oz
            </Link>
        </strong></h3>
        <div className="item__hours"></div>
        <div className="item__servings"></div>
    </section>
)