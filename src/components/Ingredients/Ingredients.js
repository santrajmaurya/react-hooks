import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    console.log('Rendering ingredients');
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-2957b.firebaseio.com/ingredients.json', {
      method : 'POST',
      body : JSON.stringify(ingredient),
      headers : {'Content-Type' : 'application/json'}
    }).then(response => {
      return response.json;
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {id : responseData.name, ...ingredient}
      ]);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
