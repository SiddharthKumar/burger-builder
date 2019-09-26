import React,{Component} from 'react';
import PorpTypes from 'prop-types';
import './BurgerIngredient.css';


class BurgerIngredient extends Component {
    render (){
        let ingredient =null;
        console.log(this.props.type);
    switch (this.props.type) {
      case ("bread-bottom"):
        ingredient = <div className="BreadBottom"></div>;
        break;
      case ("bread-top"):
        ingredient = (
          <div className="BreadTop">
            <div className="Seeds1"></div>
            <div className="Seeds2"></div>
          </div>
        );
        break;
      case ("meat"):
        ingredient = <div className="Meat"></div>;
        break;
      case ("cheese"):
        ingredient = <div className="Cheese"></div>;
        break;
      case ("bacon"):
        ingredient = <div className="Bacon"></div>;
        break;
      case ("salad"):
        ingredient = <div className="Salad"></div>;
        break;
      default :
            ingredient=null;
    }
    return ingredient;
    }
} 

BurgerIngredient.porpTypes={
    type:PorpTypes.string.isRequired
};


export default BurgerIngredient;