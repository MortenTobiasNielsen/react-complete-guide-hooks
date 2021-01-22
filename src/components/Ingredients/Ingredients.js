import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";
import {updateObject} from "../../shared/utility";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);

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
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
  };

  const removeIngredientHandler = id => {
    setIsLoading(true);
    
    fetch(`https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`, {
      method: "DELETE",
    })
    .then(response => {
      setIngredients(prevIngredients => 
        prevIngredients.filter(ingredient => ingredient.id !== id)
      );
      setIsLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
  };

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ingredients} onRemoveItem={(id) => removeIngredientHandler(id)}/>
      </section>
    </div>
  );
};

export default Ingredients;
