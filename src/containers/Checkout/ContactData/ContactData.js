import React ,{ Component } from 'react'
import './ContactData.css';
import Button from '../../../component/UI/Button/Button';
import Spinner from '../../../component/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false,
  };

  orderHandler=(event)=>{
    event.preventDefault();
    this.setState({loading:true});
    const order={
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer:{
            name: 'Sidrock',
            address: {
                street : 'TestStreet',
                zipCode: '5555',
                country: 'India'
            },
            emial:'test@test.com'
        },
        deliveryMethod:'fastest'
    }
    axios
      .post("/order.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(this.setState({ loading: false }));
  }

  render() {
    let form = (
      <form>
        <input className='Input' type="text" name="name" placeholder="Your Name" />
        <input className='Input' type="email" name="email" placeholder="Your Email" />
        <input className='Input' type="text" name="street" placeholder="Street" />
        <input className='Input' type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
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