import React,  {Component} from 'react';
import Aux from '../../hoc/Ax';
import Burger from '../../component/Burger/Burger';
import BurgerControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';

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
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }

    updatePurchaseState(ingredients){

        const sum=Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0});
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
        this.updatePurchaseState(updatedIngredients);
         
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
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler =()=>{
        this.setState({purchasing:true});
    }

    puchaseCancelHandler= () =>{
        this.setState({purchasing:false});
    }

    
    puchaseContinueHandler= () =>{
        alert('you continued');
    }
    
    render(){
        const disabledInfo = { ...this.state.ingredients };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0
        }
        return (
          <Aux>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.puchaseCancelHandler}
            >
              <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceld={this.puchaseCancelHandler}
                purchaseContinued={this.puchaseContinueHandler}
              />
            </Modal>
            <Burger ingredients={this.state.ingredients} />
            <BurgerControls
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              disabled={disabledInfo}
              purchasable={this.state.purchasable}
              price={this.state.totalPrice}
              ordered={this.purchaseHandler}
            />
          </Aux>
        );
    }
}

export default BurgerBuilder; 