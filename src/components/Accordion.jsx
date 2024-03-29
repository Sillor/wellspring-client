import { useState } from "react";


const Accordion = () => {
    const[menuState, setMenuState] = useState(false)

    return (
        <div className="flex flex-col w-full gap-0.5 bg-white">

            {/* Links to patient information */}
            <div className={`grid justify-center overflow-hidden transition-all ease-in-out duration-300 bg-slate-100 text-slate-900 hover:bg-slate-300/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${menuState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <button className="flex overflow-hidden w-full">View Schedule List</button>
            </div>
            <div className={`grid justify-center overflow-hidden transition-all ease-in-out duration-300  bg-slate-100 text-slate-900 hover:bg-slate-300/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${menuState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <button className="flex overflow-hidden w-full">Search patient</button>
            </div>
            <div className={`grid justify-center overflow-hidden transition-all ease-in-out duration-300  bg-slate-100 text-slate-900 hover:bg-slate-300/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ${menuState ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <button className="flex overflow-hidden w-full">Logout</button>
            </div>

            {/*Determining when to change states*/}
            <button onClick={() => setMenuState(!menuState)} className="flex justify-between w-full bg-white">
                {menuState ? <img src="../src/assets/PrescriptionAssets/menu.png" alt="" className="m-2" /> : <img src="../src/assets/PrescriptionAssets/menu.png" alt="" className="m-2" />}
                <img src="../src/assets/PrescriptionAssets/user.png" alt="" className="m-2 grid" />
            </button>
        </div>
)}







export default Accordion;