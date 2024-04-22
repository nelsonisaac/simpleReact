import MenuList from "./menu-list";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"


export default function MenuItem({ item }) {
    const [displayToggle, setDisplayToggle] = useState({});


    // here displayToggle is an object with item.label as a boolean in it
    // like displayToggle : { profile/settings : "true/false" }
    // Whenever we click in + , it calls handleToggle(item.label), which takes item.label
    // as a parameter and inserts that into the initially empty displayToggle:{} object
    function handleToggle(currentLabel) {
        // Here we are access the current displayToggle state, and adding a item.label
        // as one property of the object.
        // [currentLabel] adds the property to the displayToggle
        // !displayToggle[currentLabel] indicates that, it is setting opposite value
        // of whatever the initial value of displayToggle is
        setDisplayToggle({
            ...displayToggle,
            [currentLabel]: !displayToggle[currentLabel]
        })
        console.log(displayToggle);
    }
    return <li>
        <div  className="menu-item">
            <p>{item.label}</p>
            {
                item && item.children && item.children.length > 0
                    ? <span onClick={() => { handleToggle(item.label) }}>
                        {
                            displayToggle[item.label]
                                ? <FaMinus color="black" size={25} />
                                : <FaPlus color="black" size={25} />
                        }
                    </span> : null
            }
        </div>
        {
            item && item.children && item.children.length && displayToggle[item.label] > 0
                ? <MenuList list={item.children} />
                : null
        }
    </li>
}