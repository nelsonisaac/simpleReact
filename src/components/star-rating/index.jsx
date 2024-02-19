
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import './styles.css';

export default function StarRating({ noofStars = 5 }) {

    // We use one useState for storing the stars rating and the other for continous
    // rendering of the star colors while hovering.
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    // While mouse hover on the star, the currentIndex is set to the hover state variable
    function handleMouseOver(currentIndex) {
        setHover(currentIndex);
        console.log("on mouse over: " + currentIndex);
    }

    // When mouse leaves it should display the stars that are selected for the rating
    // so we set the rating value to the hover variable
    function handleMouseLeave(currentIndex) {
        setHover(rating);
        console.log("on mouse leave: " + currentIndex);
        console.log("on mouse leave rating: " + rating);
        console.log("on mouse leave hover: " + hover);
    }

    // When mouse is clicked, the no of stars selected should be stored in a variable
    // Here we get the current index and set it to the rating variable
    function handleOnclick(currentIndex) {
        setRating(currentIndex);
        console.log("onClick rating: " + currentIndex);

    }
    return <div className="star-rating">{

        // This is the spread operator which creates a <FaStar/> element for no of stars 
        // that we pass as an argument

        /*Explaination:
                // Here index is the current index, and hover is the index of the star that we want to move to.
                // For every mouse movement on each of the star, rendering occurs
                // Ex: if we move mouse on to 3rd star, then index=3 and the hover=3, so as the
                // condition satisfies, className = "active", which has css color:"yellow"
                // When we click on a star, then onClick renders and sets the rating variable = 3
                // Now rating=3, but when we leave the star, then handleMouseLeave() is invoked
                // and it sets the rating to setHover(rating), this makes hover = rating
                // Now as we move our mouse for every mouse movement to renders again and again,
                // so (currentIndex(3))<=(hover(3)), then hovered over star is yellow
                // Whenever mouse leaves a star ,handleMouseLeave() renders the stored rating=3 to hover
                // If it hovers>rating then, handleMouseOver() renders the currentIndex to the hover*/

        [...Array(noofStars)].map((_, index) => {
            index += 1;
            return (<div style={{ display: "inline-block", width: "50px" }}><FaStar
                key={index} //We need key to identify each of the stars

                className={index <= (hover) ? 'active' : 'inactive'}
                onMouseOver={() => { handleMouseOver(index) }}
                onMouseLeave={() => { handleMouseLeave(index) }}
                onClick={() => { handleOnclick(index) }}
            /></div>);
        })
    }

    </div>
}