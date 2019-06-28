import React from 'react';


const GiftWrapStatement = (props) => (
  <div>
    {
      props.giftWrapAvailable == true ?
        (<span style={{ margin: '10px' }}>Gift-wrap available.</span>)
        :
        (<span style={{ margin: '10px' }}>Gift-wrap is not available.</span>)
    }
  </div>
);

//FREE Shipping

export default GiftWrapStatement;

