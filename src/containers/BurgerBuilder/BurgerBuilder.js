import React,  {Component} from 'react';
import Aux from '../../hoc/Ax';
import Burger from '../../component/Burger/Burger';
import BurgerControls from '../../component/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese: 0,
            meat: 0
        },
        totalPrice:4

    }

    addIngredientHandler =(type)=>{
        const oldCount =this.state.ingredients[type];
        const updtedCount = oldCount+1;
        const updatedIngredients ={...this.state.ingredients };
        updatedIngredients[type]= updtedCount;
        const priceAddition= INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState(
            { totalPrice : newPrice, ingredients:updatedIngredients}
        )
         
    }
    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updtedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updtedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
          totalPrice: newPrice,
          ingredients: updatedIngredients
        });
    }

    render(){
        const disabledInfo = { ...this.state.ingredients };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0
        }
        return (
          <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BurgerControls 
                ingredientAdded ={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                /> 
          </Aux>
        );
    }
}

export default BurgerBuilder; 