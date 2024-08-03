// Import necessary dependencies and components
import React from "react";
import "./_MacroNutritionContainer.css";
import MacroNutritionCard from "../MacroNutritionCard/MacroNutritionCard";

// Import icon images
import calorieIcon from '../../../assets/images/calories-icon.png';
import proteinIcon from '../../../assets/images/protein-icon.png';
import carbIcon from '../../../assets/images/carbs-icon.png';
import fatIcon from '../../../assets/images/fat-icon.png';

// Define the MacroNutritionContainer component
export default function MacroNutritionContainer({ keyData }) {
    // Log component rendering and received data
    console.log("MacroNutritionContainer is rendering");
    console.log("keydata component container :", keyData);

    // Render the component
    return (
        <div className="nutrition_wrapper">
            {/* Render MacroNutritionCard for Calories */}
            <MacroNutritionCard 
                value={keyData.calorieCount}
                unite="kCal"
                type="Calories"
                icon={calorieIcon}
            />
            {/* Render MacroNutritionCard for Proteins */}
            <MacroNutritionCard 
                value={keyData.proteinCount}
                unite="g"
                type="proteines"
                icon={proteinIcon}
            />
            {/* Render MacroNutritionCard for Carbohydrates */}
            <MacroNutritionCard 
                value={keyData.carbohydrateCount}
                unite="g"
                type="glucides"
                icon={carbIcon}
            />
            {/* Render MacroNutritionCard for Lipids */}
            <MacroNutritionCard 
                value={keyData.lipidCount}
                unite="g"
                type="lipides"
                icon={fatIcon}
            />
        </div>
    )
}