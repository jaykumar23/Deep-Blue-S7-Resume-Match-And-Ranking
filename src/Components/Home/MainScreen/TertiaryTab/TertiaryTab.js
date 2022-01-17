import React, { Component } from 'react'
import { } from './TertiaryTab.css'

export default class TertiaryTab extends Component {
    render() {
        const offers = [
            {
                name: "Amazon",
                msg: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sunt ratione velit nemo dolor tenetur dolorum ducimus ea et dolores sapiente officiis reiciendis dolore facere ullam accusantium cum, ipsam alias."
            },
            {
                name: "Microsoft",
                msg: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero sunt ratione velit nemo dolor tenetur dolorum ducimus ea et dolores sapiente officiis reiciendis dolore facere ullam accusantium cum, ipsam alias."
            },

        ]
        return (
            <>
                {offers.map((curElem, index) => {
                    const { name, msg } = curElem;
                    return (
                        <div className="conatiner-fluid tab-card" key={index}>
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <h5>{name}</h5>
                            <p>{msg}</p>
                        </div>
                    )

                })}
            </>
        )
    }
}
