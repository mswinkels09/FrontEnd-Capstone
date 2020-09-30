import React, { useContext, useEffect, useRef, useState } from "react"
import { TodayProgress } from "./TodayProgress";
import { UserContext } from "../users/UserProvider";
import { ConsumptionContext } from "../consumption/ConsumptionProvider";
import { ItemContext } from "../items/ItemProvider";
import "./ProgressList.css";


export const TodayProgressList = props => {
    const { getUserConsumptions, getConsumptionByItem, itemConsumptions } = useContext(ConsumptionContext)
    const { getCurrentUser} = useContext(UserContext)
    const { getItems} = useContext(ItemContext)

    const currentUserId = parseInt(localStorage.getItem("user"))

    const itemsSelected = useRef(0)

    const userItemArray = itemConsumptions.filter(item => {
        const userItemFound = item.consumptions.find(c => {
            return c.userId === currentUserId
        }) || {}
        const userItemId = userItemFound.userId
        return userItemId
    })



    // const [filteredItems, setFilteredItems] = useState([])
    const [testVariable, setTestVariable] = useState([])
    const [selectedItem, setSelectedItem] = useState({consumptions:{}})
    const [defaultPage, setDefaultPage] = useState([])

    useEffect(() => {
        const userItemArray = itemConsumptions.filter(item => {
            const userItemFound = item.consumptions.find(c => {
                return c.userId === currentUserId
            }) || {}
            const userItemId = userItemFound.userId
            return userItemId
        })
        setTestVariable(userItemArray)

    }, [itemConsumptions])

    
    
    useEffect(() => {
        const itemFound = userItemArray.find(uia => {
            return uia.id === parseInt(testVariable.itemSelect)
        }) || {}
        setSelectedItem(itemFound)
    }, [testVariable])
    
    useEffect(() => {
        //set default representation on page render 
        if(parseInt(itemsSelected.current.value) === 0 ) {
            setDefaultPage(testVariable)
        } else{
            setDefaultPage(testVariable)
        }
    }, [itemsSelected])

    useEffect(() => {
        setDefaultPage(testVariable)
    }, [testVariable])

    
    const handleControlledInputChange = (browserEvent) => {
        let filteredArray = []
        const newTestVariable = Object.assign({}, testVariable)
        newTestVariable[browserEvent.target.name] = browserEvent.target.value
        console.log(newTestVariable, "newtestvariable")


        const userItemArray = itemConsumptions.filter(item => {
            const userItemFound = item.consumptions.find(c => {
                return c.userId === currentUserId
            }) || {}
            const userItemId = userItemFound.userId
            return userItemId
        })
        
        const itemFound = userItemArray.find(uia => {
            return uia.id === parseInt(newTestVariable.itemSelect)
        }) || {}

        filteredArray.push(itemFound)
        setTestVariable(filteredArray)
    }
            
console.log(defaultPage, "defaultpageTODAY")

    useEffect(() => {
        getItems()
        getConsumptionByItem()
        getCurrentUser()
        getUserConsumptions(currentUserId)
    }, [])

    return (
        <div>
            <header className="header progress__header">
                <h1>TODAY'S PROGRESS</h1>
            </header>
            <article className="progressList">
                <fieldset>
                    <div className="div__add_consumption">
                        <select name="itemSelect" id="itemSelect" ref={itemsSelected}  className="form-control progress__form_select"
                            proptype="int"
                            defaultValue="0"
                            onChange={handleControlledInputChange}>

                            <option value="0">Item Select</option>
                            {userItemArray.map(item => (
                                <option key={item.id} value={item.id}>{item.name} - {item.size} oz</option>

                            ))}
                        </select>
                    </div>
                </fieldset>
                <section className="progress">
                    {
                        defaultPage.map(item => {
                            console.log(defaultPage,"test default")
                            const currentTime = new Date()
                                const todaysConsumptionsArray = item.consumptions.filter(consumption => {
                                    const consumptionTime = new Date(consumption.time)

                                    return consumptionTime.getDate() === currentTime.getDate()
                                })
                                let todaysConsumptionsObj = {}
                                todaysConsumptionsArray.forEach(consumption => {

                                    if (Object.keys(todaysConsumptionsObj).includes(consumption.itemId.toString())) {
                                        const totalTodayCalories = (consumption.servings * item.calories) + todaysConsumptionsObj[consumption.itemId].calories
                                        const totalTodaySugar = (consumption.servings * item.sugar) + todaysConsumptionsObj[consumption.itemId].sugar
                                        const totalTodayCost = (consumption.servings * item.cost) + todaysConsumptionsObj[consumption.itemId].cost
                                        todaysConsumptionsObj[consumption.itemId] = { "calories": totalTodayCalories, "sugar": totalTodaySugar, "cost": totalTodayCost }
                                    } else {
                                        todaysConsumptionsObj[consumption.itemId.toString()] = { "calories": (consumption.servings * item.calories), "sugar": (consumption.servings * item.sugar), "cost": (consumption.servings * item.cost) }


                                    }
                                    // hoursSinceConsumed = (Math.abs(currentTime.getTime() - consumptionTime.getTime())/ (1000 * 60 * 60)).toFixed(1)     

                                })
                                return Object.keys(todaysConsumptionsObj).map(key => {
                                    return <TodayProgress key={key}
                                        item={item}
                                        calories={todaysConsumptionsObj[key].calories }
                                        sugar={todaysConsumptionsObj[key].sugar}
                                        cost={todaysConsumptionsObj[key].cost}
                                    />
                                })
                        })

                    }
                </section>
                <div className="progress__btns">
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/today")}>
                        Today
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/week")}>
                        Week
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress/month")}>
                        Month
                    </button>
                    <button className="btn__change_progress btn" onClick={() => props.history.push("/progress")}>
                        Overall
                    </button>
                </div>
            </article>
        </div>
    )
}