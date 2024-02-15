import React, { useState } from "react";
import data from "./data";


export default function Accordian() {

    //This state is to store the selected item from the dataItem.id
    const [selected, setSelected] = useState(null);
    //This state is to store the id of multiple selected items in an array
    const [multi, setMulti] = useState([]);
    //This state is to enable the multi selection
    const [enableMultiselection, setState] = useState(false);

    //This is to handle the single click on an item
    function handleClick(id) {
        console.log(selected);
        setSelected(id === selected ? null : id);
    }

    //When multi selection is clicked, we copy the contents into an array
    //We check if the id we chosed is present in the cpyMulti array
    //If its not present we  get -1, so then we push that into cpyMulti array
    //If its present then we splice(remove) the id from the already present array(cpyMulti)
    //Now set this cpyMulti array to the React hook array multi.
    function handleMultiselect(id) {
        let cpyMulti = [...multi];
        const indexOfCurrentID = cpyMulti.indexOf(id);
        indexOfCurrentID === -1 ? (cpyMulti.push(id)) : cpyMulti.splice(indexOfCurrentID, 1)
        setMulti(cpyMulti);
        console.log(indexOfCurrentID, multi);
    }

    return <div className="wrapper">
        <div className="multiButton">
            <button type="submit" onClick={() => {
                setState(!enableMultiselection);
            }}>Click for Multi-Selection</button>
        </div>
        <div className="accordian">
            {
                data && data.length > 0 ? (
                    data.map((dataItem) => {
                        return <div className="item">
                            <div onClick={() => {
                                enableMultiselection ? handleMultiselect(dataItem.id) : handleClick(dataItem.id)
                            }} className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span><div>{
                                    //This is for displaying the answer
                                    //If multi selection is selected then, we check if the selected item is 
                                    //present in the multi array.If its present display it, else do nothing 
                                    // because we are displaying only the answers that we clicked on, whose id are already
                                    //stored in the multi array, so we simply cheeck that multi array and display the answer
                                    enableMultiselection
                                        ? multi.indexOf(dataItem.id) !== -1 && (
                                            <div>{dataItem.answer}</div>
                                        )
                                        : selected === dataItem.id ? (dataItem.answer) : null
                                }
                                </div>
                            </div>
                        </div>
                    })
                ) : <div>No data</div>
            }
        </div>

    </div>
}
