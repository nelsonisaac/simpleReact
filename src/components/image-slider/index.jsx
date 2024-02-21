import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./styles.css";

// url = https://picsum.photos/v2/list

export default function ImageSlider({ url, page = 1, limit = 5 }) {

    // We use this state to store the pictures from the list
    const [pic, setPic] = useState([]);

    // We use this state to store the currentSlide from the list of images. Initially we 
    // set the slide to 0 as it should display the first image from the list
    const [currentSlide, setCurrentSlide] = useState(0);

    // This function calls an API called fetch(), which gets the response from
    // the specified URL. we convert it to json and set the data to the images(pic state)
    async function fetchImages(url) {
        const response = await fetch(`${url}?page=1&limit=${limit}`);
        const data = await response.json();
        if (data) {
            setPic(data);
        }
    }

    // Initially the image is on slide 0. so when left "<-" arrow is clicked then
    // the image should go to the last slide. so we write that in the condition
    function handlePrevious() {
        setCurrentSlide(currentSlide === 0 ? pic.length - 1 : currentSlide - 1);
    }

    // If the slide is at the last, after clicking next(right arrow), it should 
    // display the first image. So if(cuurent slide === last) then 
    // setCurrentSlide to 0 to get the first image 
    function handleNext() {
        setCurrentSlide(currentSlide === pic.length - 1 ? 0 : currentSlide + 1);
    }


    // UseEffect() renders the url for every refresh or reload 
    useEffect(() => {
        if (url !== null) {
            fetchImages(url);
        }
    }, [url])

    return <div className="container">
        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
        {
            pic && pic.length
                ?
                pic.map((item, index) => (
                    <img
                        key={item.id}
                        src={item.download_url}
                        // Here we only need to show the one image at a time.
                        // So if currentSlide === index of image, then show it
                        // else hide the rest of the images using CSS class
                        className={currentSlide === index
                            ? "current-image"
                            : "current-image hide-image"}>
                    </img>
                ))
                : null
        }
        <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
        <span className="circle-indicators">
            {
                pic && pic.length
                    ? pic.map((_, index) => (
                        <button key={index}
                        // Same as the images, we only need to indicate the buttons
                        // which are selected, so if currentSlide === index, then 
                        // button color is white, else grey out the rest of the buttons
                            className={currentSlide === index
                                ? "current-indicator"
                                : "current-indicator unselected-button"}>

                        </button>
                    ))
                    : null
            }
        </span>
    </div>
}