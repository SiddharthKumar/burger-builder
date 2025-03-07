import React from 'react';
import './Buildcontrols.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { lable: "Salad", type: "salad" },
  { lable: "Bacon", type: "bacon" },
  { lable: "Cheese", type: "cheese" },
  { lable: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className="BuildControls">
    <p>
      Current Price: <strong> {props.price.toFixed(2)} $</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.lable}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button 
    className="OrderButton" 
    disabled={!props.purchasable}
    onClick={props.ordered}
    > ORDER NOW</button>
  </div>
);
export default buildControls;