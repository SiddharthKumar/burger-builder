import React ,{ Component } from 'react'
import './ContactData.css';
import Button from '../../../component/UI/Button/Button';
import Spinner from '../../../component/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../component/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderform:{
      name:{
        elementType: 'input',
        elementConfig:{
          type: 'text',
          placeholder:' Your Name'
        },
        value:'',
        validation:{
          required: true,
        },
        valid:false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZipCode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 4,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: ' Country '
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      emial: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: ' Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue:'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
        valication:{},
        valid: true
      }

    },
    formIsValid: false,
    loading: false,
  };

  // onSubmit form data and post request to server  
  orderHandler=(event)=>{
    event.preventDefault();
    this.setState({loading:true});
    const formData ={};
    for(let formElementIdentifier in this.state.orderform){
      formData[formElementIdentifier]= this.state.orderform[formElementIdentifier].value; // get all data state
    }
    const order={
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
    }
    axios
      .post("/order.json",order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(this.setState({ loading: false }));
  }

  checkValidity(value,rules){
    let isValid= true;
    if(!rules){
      return true; 
    }
    
    if(rules.minLength){
      isValid=value.length >= rules.minLength && isValid
    }
    
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }
  //form input data set to state
  inputChnagedHandler =(event, inputIdentifier) => {
    const updatedOrderForm ={
      ...this.state.orderform
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier]=updatedFormElement;
    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
   // console.log(updatedFormElement);
    this.setState({orderform: updatedOrderForm , formIsValid: formIsValid});
  }
 
  render() {
    const formElementsArray =[];
    for(let key in this.state.orderform){
      formElementsArray.push({
        id:key,
        config: this.state.orderform[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
       
        {formElementsArray.map(formElement =>(
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType} // pass Element Type 
            elementConfig={formElement.config.elementConfig}
            value ={formElement.config.value} //pass value of input
            invalid={!formElement.config.valid} // pass valid peramiter 
            shouldValidate={formElement.config.validation} //check valication are avilable or not
            touched = {formElement.config.touched}
            changed={(event)=>this.inputChnagedHandler(event,formElement.id)} 
           />
        ))}
        
        <Button btnType="Success" disabled ={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if(this.state.loading){
      form=<Spinner/>;
    }
    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;