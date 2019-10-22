import React,  {Component} from 'react';
import Aux from '../../hoc/Ax';
import Burger from '../../component/Burger/Burger';
import BurgerControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }

    componentDidMount(){
        axios.get("https://burger-builder-8cac6.firebaseio.com/ingredients.json")
        .then(response=>{
            this.setState({ingredients: response.data});
        })
        .catch(error=>{
            this.setState({error: true})
        });
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
        //alert('you continued');
        // this.setState({loading:true});
        // const order={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'Sid',
        //         address: {
        //             street : 'TestStreet',
        //             zipCode: '5555',
        //             country: 'India'
        //         },
        //         emial:'test@test.com'
        //     },
        //     deliveryMethod:'fastest' 
        // }
        // axios
        //   .post("/order.json", order)
        //   .then(response => {
        //     this.setState({ loading: false, purchasing: false });
        //   })
        //   .catch(this.setState({ loading: false, purchasing: false }));
        const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+ this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ queryString
        }); 
    } 
    
    render(){
        const disabledInfo = { ...this.state.ingredients };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0
        }
        let orderSummary =null;
        let burger =this.state.error ? <p>Ingredients can't be loaded!</p>:<Spinner/>;

        if(this.state.ingredients){
            
            burger=(
                <Aux>
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
            orderSummary=<OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceld={this.puchaseCancelHandler}
                purchaseContinued={this.puchaseContinueHandler}
              />;
        }
        if (this.state.loading) {
          orderSummary = <Spinner />;
        }

        return (
          <Aux>
            <Modal
              show={this.state.purchasing}
              modalClosed={this.puchaseCancelHandler}
            >
              {orderSummary}
            </Modal>
            {burger}
          </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios); 