import React, {useReducer, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";
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

const httpReducer = (httpState, action) => {
  switch (action.type) {
    case ("SEND"):
      return {...httpState, isLoading: true, error: null};

    case ("RESPONSE"):
      return {...httpState, isLoading: false};

    case ("ERROR"):
      return {...httpState, isLoading: false, error: action.errorMessage};

    case ("CLEAR"):
      return {...httpState, error: null};

    default:
      throw new Error("httpReducer action not handled");
  }
};

const Ingredients = () => {
  const [ingredients, dispatchIngredients] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {isLoading: false, error: null});

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatchIngredients({type: "SET", ingredients: filteredIngredients});
  }, []);

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: "SEND"});

    fetch("https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: {"content-Type": "application/json"}
    })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      dispatchHttp({type: "RESPONSE"});
      dispatchIngredients({
        type: "ADD", 
        ingredient: updateObject(ingredient, {id: responseData.name}),
      });
    })
    .catch(error => {
      dispatchHttp({type: "ERROR", errorMessage: error.message});
    });
  };

  const removeIngredientHandler = id => {
    dispatchHttp({type: "SEND"});
    
    fetch(`https://react-hooks-project-95b9d-default-rtdb.europe-west1.firebasedatabase.app/ingredients/${id}.json`, {
      method: "DELETE",
    })
    .then(response => {
      dispatchHttp({type: "RESPONSE"});
      dispatchIngredients({type: "DELETE", id: id});
    })
    .catch(error => {
      dispatchHttp({type: "ERROR", errorMessage: error.message});
    });
  };

  const clearError = () => {
    dispatchHttp({type: "CLEAR"});
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      
      <IngredientForm 
        onAddIngredient={addIngredientHandler}
        loading={httpState.isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ingredients} onRemoveItem={(id) => removeIngredientHandler(id)}/>
      </section>
    </div>
  );
};

export default Ingredients;
