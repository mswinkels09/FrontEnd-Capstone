import React from "react"
import "../progress/ProgressList.css";


export const Trophy = ({ trophy }) => {

    return( 
        <section className="trophy">
            <img className="trophy__img" src="https://cdn3.iconfinder.com/data/icons/flat-set-1/64/flat_set_1-12-512.png"></img>
            <h3 className="h3__trophy"><strong>
                <div className="trophy__name">
                    <div>{trophy.name}</div> 
                </div>
            </strong></h3>
        </section>
    ) 
}