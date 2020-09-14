//how each item will be represented on DOM
import React from "react"

export default ({ item}) => (
    <section className="item">
        <h3 className="item__name"><strong>{item.name}</strong></h3>
    </section>
)