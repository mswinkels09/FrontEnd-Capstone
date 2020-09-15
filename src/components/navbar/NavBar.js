import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <section className="navbar">
            <div className="navbar__item">
                <Link className="navbar__link" to="/trophies">
                    <img className="navbar__img" src="https://png.pngtree.com/png-vector/20190927/ourlarge/pngtree-trophy-icon-png-image_1753387.jpg"></img>
                    <div className="navbar__title">Trophies</div>
                </Link>
            </div>
            <div className="navbar__item">
                <Link className="navbar__link" to="/progress">
                    <img className="navbar__img" src="https://cdn0.iconfinder.com/data/icons/web-development-and-studio/512/55_growth_Chart_flowchart_graph_increase_progress-512.png"></img>
                    <div className="navbar__title">Progress</div>
                </Link>
            </div>
            <div className="navbar__item active">
                <Link className="navbar__link" to="/">
                    <img className="navbar__img" src="https://image.flaticon.com/icons/png/512/25/25694.png"></img>
                    <div className="navbar__title">Home Page</div>
                </Link>
            </div>
            <div className="navbar__item">          
                <Link className="navbar__link" to="/competitors">
                    <img className="navbar__img" src="https://www.iconfinder.com/data/icons/hands-set-1/84/13-512.png"></img>
                    <div className="navbar__title">Competitors</div>
                </Link>
            </div>
            <div className="navbar__item">
                <Link className="navbar__link" to="/logout">
                    <img className="navbar__img" src="https://www.iconfinder.com/data/icons/flaticons-stroke/16/logout-1-512.png"></img>
                    <div className="navbar__title">Logout</div>
                </Link>
            </div>
        </section>
    )
}