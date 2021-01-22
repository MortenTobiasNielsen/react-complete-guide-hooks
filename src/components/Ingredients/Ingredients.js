import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import {updateObject} from "../../shared/utility";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  
  const addIngredientHandler = ingredient => {
    fetch("https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json", {
      method: "POST",
      body: JSON.stringify({ingredient}),
      headers: {"content-Type": "application/json"}
    })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      setIngredients(prevIngredients => [
        ...prevIngredients, updateObject(ingredient, {id: responseData.name})
      ]);
    });
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
