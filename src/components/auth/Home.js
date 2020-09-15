import  React  from "react"
import { Link } from "react-router-dom"
import "./Home.css"

export const Home = () => (
    <section className="home">
        <header>
            <h1 className="home__title">RID THE DEW</h1>
        </header>
        <section className="auth">
            <div className="login__button">
                <Link to={"/login"}>
                    LOGIN
                </Link>
            </div>
            <div className="register__button">
                <Link to={"/register"}>
                    REGISTER
                </Link>
            </div>
        </section>
    </section>
)