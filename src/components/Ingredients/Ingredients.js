import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import {updateObject} from "../../shared/utility";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  
  useEffect(() => {
    fetch("https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json")
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        };

        setIngredients(loadedIngredients);
      });
  }, []);

  const addIngredientHandler = ingredient => {
    fetch("https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {"content-Type": "application/json"}
    })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      console.log(responseData);
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
