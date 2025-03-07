import React,{Component} from 'react';
import Modal from '../../component/UI/Modal/Modal';
import Aux from '../Ax';

const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state={
            error :null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{this.setState({error:null});
            return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            });
        }

        componentWillUnmount(){
          console.log('willUnmount',this.reqInterceptor,this.resInterceptor);
          axios.interceptors.request.eject(this.reqInterceptor);
          axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler =()=>{
            this.setState({error:null});
        }
        render(){
            return (
              <Aux>
                <Modal
                  show={this.state.error}
                  modalClosed ={this.errorConfirmedHandler}
                >
                  {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
              </Aux>
            );
        }
    }
}
export default withErrorHandler;