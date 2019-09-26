import React from 'react';
import './Layout.css';
import Aux from '../../hoc/Ax';

const layout =(props)=>(
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;
