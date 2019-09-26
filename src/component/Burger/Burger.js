import React from 'react';
import  './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger=(props)=> {
    let transfromedIngredients= Object.keys(props.ingredients).map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
             return <BurgerIngredient key={igkey + i} type={igkey}/>;
        });
    })
    .reduce((arr,el)=>{
       
        return arr.concat(el)
    },[]);
    if(transfromedIngredients.length === 0){
        transfromedIngredients = <p>Please start adding ingredients!</p>
    }
    console.log(transfromedIngredients);
    return (
      <div className="Burger">
        <BurgerIngredient type="bread-top" />
            {transfromedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    );
}
export default burger;