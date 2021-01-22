import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import {updateObject} from "../../shared/utility";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  
  const addIngredientHandler = ingredient => {
    setIngredients(prevIngredients => [
      ...prevIngredients, updateObject(ingredient, {id: Math.random().toString()})
    ]);
  };

  const removeIngredientHandler = id => {
    setIngredients(prevIngredients => 
      prevIngredients.filter(ingredient => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={(id) => removeIngredientHandler(id)}/>
      </section>
    </div>
  );
}

export default Ingredients;
