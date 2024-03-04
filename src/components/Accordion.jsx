import React from "react";
import { useState } from "react";



const Accordion = () => {
    const[menuState, setMenuState] = useState(false)

    return <div className="flex flex-col justify-between w-full">
        
        <div className={`grid overflow-hidden transition-all ease-in-out duration-300 ${menuState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <button className="flex overflow-hidden">item1</button>
        </div>


        <button onClick={() => setMenuState(!menuState)} className="flex justify-between w-full">

            {menuState ? <img src="../src/assets/PrescriptionAssets/menu.png" alt="" className="m-2" />: <img src="../src/assets/PrescriptionAssets/menu.png" alt="" className="m-2" />}

        </button>

        


    </div>
}







export default Accordion;