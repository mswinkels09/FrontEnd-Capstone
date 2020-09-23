import  React  from "react"
import Button from 'react-bootstrap/Button';
import "./Home.css"
import { ButtonGroup } from "react-bootstrap";

export const Home = (props) => (
    <section className="home">
        <div className="home__title_div">
            <h1 className="home__title">WHAT NOT TO DEW</h1>
        </div>
        <section className="auth">
            <div className="login__button">
                <Button variant="success" className="btn__home" onClick={() => props.history.push("/login")}>
                    LOGIN
                </Button>

            </div>
            <div className="register__button">
                <Button variant="danger" className="btn__home btn" onClick={() => props.history.push("/register")}>
                    REGISTER
                </Button>
            </div>
        </section>
    </section>
)