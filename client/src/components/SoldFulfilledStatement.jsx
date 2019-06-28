import React from 'react';


const SoldFulfilledStatement = (props) => (
  <div>
    {
      props.soldBy === props.fulfilledBy ?
        (
          <div style={{ margin: '10px' }}>
            Sold and Fulfilled by {props.soldBy}.
          </div>
        )
        :
        (
          <div style={{ margin: '10px' }}>
            Sold by {props.soldBy} and Fulfilled by {props.fulfilledBy}.
          </div>
        )
    }
  </div>
);

export default SoldFulfilledStatement;

