import React, { useContext, useRef, useEffect} from "react"
import { ConsumptionContext } from "./ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider"
import "../items/ItemForms.css";

export const ConsumptionForm = (props) => {
    const { addConsumption } = useContext(ConsumptionContext)
    const { items, getItems } = useContext(ItemContext)

    /*
        Create references that can be attached to the input
        fields in the form. This will allow you to get the
        value of the input fields later when the user clicks
        the save button.

        No more `document.querySelector()` in React.
    */
    const item = useRef(null)
    const servings = useRef(null)
    const time = useRef(null)

    /*
        Get animal state and location state on initialization.
    */
    useEffect(() => {
       getItems()
    }, [])

    const constructNewConsumption = () => {
        const usertime = time.current.value
        const itemId = parseInt(item.current.value)

        addConsumption({
            itemId,
            servings: parseInt(servings.current.value),
            time: usertime,
            userId: parseInt(localStorage.getItem("user"))

        })
        .then(() => props.history.push("/"))
    }

    return (
        <form className="newConsumptionForm">
            <header className="header">
                <h1 className="consumptionForm__title">TRACK CONSUMPTION</h1>
                <button className="btn__back_home btn" onClick={() => {
                    props.history.push("/")
                }}>Back</button>
            </header>
            <main className="main">
                <div className="form--item form--consumption">
                <fieldset>
                    <div className="form-group">
                        <select defaultValue="" name="item" ref={item} id="itemConsumption" className="form-control consumption__form_select" >
                            <option value="0">Select a item</option>
                            {items.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">

                        <input type="number" id="consumptionServings" ref={servings} required autoFocus className="form-control consumption__form" placeholder="Number Of Servings Consumed" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <input type="datetime-local" id="consumptionTime" ref={time} required autoFocus className="form-control consumption__form" placeholder="Date and Time of Consumption" />
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault() // Prevent browser from submitting the form
                        constructNewConsumption()
                    }}
                    className="btn btn-item">
                    Submit
                </button>
                </div>
            </main>
            <div className="btn__addItem_div">
                <button className="btn btn__addItem" onClick={() => props.history.push("/new_item")}>
                    Add Item
                </button>
            </div>
        </form>
    )
}