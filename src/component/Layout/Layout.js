import React,{ Component } from 'react';
import './Layout.css';
import Aux from '../../hoc/Ax';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
 

class Layout extends Component{

    state={
        showSideDrawer : false
    }

    sideDrawerClosedHandler=()=>{
         this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler =()=>{
        this.setState((prevState)=>{
            return { showSideDrawer:!prevState.showSideDrawer};
        });
    }
    
    render(){
        return (
          <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
              open={this.state.showSideDrawer}
              closed={this.sideDrawerClosedHandler}
            />
            <main className="Content">{this.props.children}</main>
          </Aux>
        );
    }
} 

export default Layout;
