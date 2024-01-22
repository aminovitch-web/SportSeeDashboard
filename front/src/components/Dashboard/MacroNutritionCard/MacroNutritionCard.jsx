import React from "react";
import "./_MacroNutritionCard.css";
import { formatValueMacroNutrition } from "../../../services/formatUserDataServices";
import { motion } from "framer-motion";
import { fadeInAnimation } from '../../../utils/animation/FadeInAnimation';
export default function MacroNutritionCard({ value, unite, type, icon}) {
 let formattedValue = formatValueMacroNutrition(value);
     return (
      <motion.div
      {...fadeInAnimation}
      >
       <div className="nutrition_card_wrapper">
      <div className="nutrition_icon_wrapper">
      <img src={icon} alt="icon"></img>
      <div className="nutrition_values_wrapper">
       <p className="nutrition_values">
         {formattedValue}
         {unite}
       </p>
       <span className="nutrition_categorie">{type}</span>
      </div>  
      </div> 
       </div>
      </motion.div>
     )
  }