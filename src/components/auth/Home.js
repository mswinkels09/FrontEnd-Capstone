import  React  from "react"
import { Link } from "react-router-dom"
import "./Home.css"

export const Home = () => (
    <section className="home">
        <h1 className="home__title">RID THE DEW</h1>
        <section className="login__button">
            <Link to={"/login"}>
                LOGIN
            </Link>
        </section>
        <section className="register__button">
            <Link to={"/register"}>
                REGISTER
            </Link>
        </section>
    </section>
)