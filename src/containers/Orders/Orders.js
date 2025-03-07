import React, {Component} from 'react';
import axios from '../../axios-orders';
import Order from '../../component/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import { privateDecrypt } from 'crypto';

class Orders extends Component{
    state ={
        orders:[],
        loading:true
    }

    componentDidMount(){
        axios.get('/order.json')
        .then(res=>{
                     //console.log(res.data);
                     const fetchedOrders = [];
                     for (let key in res.data) {
                       fetchedOrders.push({
                         ...res.data[key],
                         id: key
                       });
                     }
                     this.setState({ loading: false, orders: fetchedOrders });
                   })
        .catch(err=>{
            this.setState({loading:false});
        });
    }

    render(){
        return(
            <div>
               {this.state.orders.map(order =>(
                   <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                   />
               ))}
            </div>
        );

    }
}

export default withErrorHandler(Orders,axios); 