import React from "react";
import "./_MacroNutritionCard.css";
import { formatValueMacroNutrition } from "../../../services/formatUserDataServices";
import { motion } from "framer-motion";
import { fadeInAnimation } from '../../../utils/animation/FadeInAnimation';

// Component for displaying a macro nutrition card
export default function MacroNutritionCard({ value, unite, type, icon}) {
  // Format the value for display
  let formattedValue = formatValueMacroNutrition(value);

  return (
    // Wrapper with animation
    <motion.div {...fadeInAnimation}>
      {/* Main card wrapper */}
      <div className="nutrition_card_wrapper">
        {/* Icon and values container */}
        <div className="nutrition_icon_wrapper">
          {/* Nutrition icon */}
          <img src={icon} alt="icon"></img>
          {/* Values container */}
          <div className="nutrition_values_wrapper">
            {/* Formatted value and unit */}
            <p className="nutrition_values">
              {formattedValue}
              {unite}
            </p>
            {/* Nutrition type */}
            <span className="nutrition_categorie">{type}</span>
          </div>  
        </div> 
      </div>
    </motion.div>
  )
}