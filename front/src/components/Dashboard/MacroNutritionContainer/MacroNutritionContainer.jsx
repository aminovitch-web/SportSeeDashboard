import React from "react";
import "./_MacroNutritionContainer.css";
import MacroNutritionCard from "../MacroNutritionCard/MacroNutritionCard";
import calorieIcon from '../../../assets/images/calories-icon.png';
import proteinIcon from '../../../assets/images/protein-icon.png';
import carbIcon from '../../../assets/images/carbs-icon.png';
import fatIcon from '../../../assets/images/fat-icon.png';

export default function MacroNutritionContainer({ keyData }) {
    console.log("MacroNutritionContainer is rendering");
    console.log("keydata component container :", keyData);
     return (
     <div className="nutrition_wrapper">
      <MacroNutritionCard 
      value={keyData.calorieCount}
      unite="kCal"
      type="Calories"
      icon={calorieIcon}
      />
          <MacroNutritionCard 
      value={keyData.proteinCount}
      unite="g"
      type="proteines"
      icon={proteinIcon}
      />
      <MacroNutritionCard 
      value={keyData.carbohydrateCount}
      unite="g"
      type="glucides"
      icon={carbIcon}
      />
       <MacroNutritionCard 
      value={keyData.lipidCount}
      unite="g"
      type="lipides"
      icon={fatIcon}
      />
      </div>
     )
  }