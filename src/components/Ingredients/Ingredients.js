import React, {useReducer, useEffect, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from './Search';
import useHttp from "../../hooks/http";
import {updateObject} from "../../shared/utility";

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case ("SET"):
      return action.ingredients;
    case ("ADD"):
      console.log(action);
      return [...currentIngredients, action.ingredient];
    case ("DELETE"):
      return currentIngredients.filter(ingredient => ingredient.id !== action.id)
    default:
      throw new Error("ingredientReducer action not handled");
  };
};

const Ingredients = () => {
  const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
  const {isLoading, error, data, sendRequest, reqExtra, reqIdentifier, clear} = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT") {
      dispatchIngredients({type: "DELETE", id: reqExtra})
    } else if (!isLoading && !error && reqIdentifier === "ADD_INGREDIENT")  {
      dispatchIngredients({
        type: "ADD", 
        ingredient: updateObject(reqExtra, {id: data.name}),
      });
    };
  }, [data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatchIngredients({type: "SET", ingredients: filteredIngredients});
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest(
      "https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json",
      "POST",
      JSON.stringify(ingredient),
      ingredient,
      "ADD_INGREDIENT"
    );
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(id => {
    sendRequest(
      `https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`,
      "DELETE",
      null,
      id,
      "REMOVE_INGREDIENT"
    );
  }, [sendRequest]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
};

export default Ingredients;
