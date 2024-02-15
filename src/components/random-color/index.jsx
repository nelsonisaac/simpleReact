import React, { useEffect, useState } from "react";

export default function RandomColor() {

    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    const [color, setColor] = useState('hex');
    const [type, setType] = useState("");

    //useEffect() is used when changes has to happen when the state changes.
    //i.e.,when we click from rgb to hex or viceversa, after initial click 
    //only the type(state) is changed to whatever we choosed(rgb or hex)
    //But the color is not yet set because handleHexColor or handleRGB is not called 
    //only the state is changed but function is not called until we press RANDOM COLOR button
    //so we get "RGB color #FAA1A3" or "HEX color rgb(17,76,118)" which is wrong
    //To handle this, whenever there is a change in state we need to change the color initally
    //even without clicking the RANDOM COLOR button
    //By useEffect() , we add the [type] as a dependency, so when type changes then the
    //respective functions are called
    useEffect(() => {
        if (type === "rgb") { handleRGB() } else { handleHexColor() }
    }, [type])


    //To get random values
    function getRandom(length) {
        return Math.floor(Math.random() * length);
    }

    //Handles Hex color values
    function handleHexColor() {
        let hexColor = "#";
        for (let i = 0; i < 6; i++) {
            hexColor = hexColor + hex[getRandom(hex.length)];
        }
        setColor(hexColor);
    }

    //Handles RGB values
    function handleRGB() {
        const r = getRandom(256);
        const g = getRandom(256);
        const b = getRandom(256);
        setColor(`rgb(${r},${g},${b})`);
    }

    return <div style={{ width: "100vw", height: "100vh", backgroundColor: color }}>
        <button onClick={() => { setType("rgb") }}>RGB color</button>
        <button onClick={() => { setType("hex") }}>Hex color</button>
        <button onClick={() => {
            console.log(type)
            type === "rgb" ? handleRGB() : handleHexColor()
        }}>RANDOM COLOR</button>
        <div>
            {
                type === "rgb"
                    ? <div>RGB color {color}</div>
                    : <div>HEX color {color}</div>
            }
        </div>
    </div>
}