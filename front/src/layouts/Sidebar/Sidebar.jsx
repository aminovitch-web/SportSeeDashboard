import React from "react";
import "./_Sidebar.css";
import bicycleIcon from "../../assets/images/Sidebar/bicycleIcon.png";
import fitnessIcon from "../../assets/images/Sidebar/fitnessIcon.png";
import swimmingIcon from "../../assets/images/Sidebar/swimmingIcon.png";
import yogaIcon from "../../assets/images/Sidebar/yogaIcon.png";

export default function Sidebar() {
    return (
        <>
            <div id="sidebar">
                <div className="icons_part">
                    <img src={yogaIcon} alt="yoga"></img>
                    <img src={swimmingIcon} alt="piscine"></img>
                    <img src={bicycleIcon} alt="vélo"></img>
                    <img src={fitnessIcon} alt="musculation"></img>
                </div>
                <div className="copyright">
                    <p>Copyright, SportSee 2020 </p>
                </div>
            </div>
        </>
    );
}
