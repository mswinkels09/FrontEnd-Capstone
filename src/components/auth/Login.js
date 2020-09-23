import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"


export const Login = props => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("user", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    passwordDialog.current.showModal()
                } else if (!exists) {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="main">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Password does not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--home" onSubmit={handleLogin}>
                    <section className="login__inputs">
                    <fieldset className="fieldset">
                        <input ref={email} type="email"
                            id="email"
                            className="form-control login__form"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="fieldset">
                        <input ref={password} type="password"
                            id="password"
                            className="form-control login__form"
                            placeholder="Password"
                            required />
                    </fieldset>
                    </section>
                        <button type="submit" className="btn__login btn">
                            GET BACK AT IT
                        </button>
                </form>
            </section>
            <section className="link--register">
                <button className="btn__login_register btn" onClick={() => props.history.push("/register")}>
                    FIRST TIME?
                </button>
            </section>
        </main>
    )
}