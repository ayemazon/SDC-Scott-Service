import React from 'react';


const ShippingStatement = (props) => (
  <div>
    {
      props.fulfilledBy == "amazon" ?
        (<span style={{ fontSize: '13px', margin: '10px', paddingLeft: '0px' }}><b>Free Shipping</b> on orders over $25 shipped by Amazon or get Fast, Free Shipping with Amazon Prime</span>)
        :
        (<span style={{ fontSize: '13px', margin: '10px', paddingLeft: '0px' }}>Ships in <b>{props.expectedShipping}</b></span>)
    }
  </div>
);

//FREE Shipping

export default ShippingStatement;

