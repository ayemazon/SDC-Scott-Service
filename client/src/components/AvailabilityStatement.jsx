import React from 'react';
import { AllText, SelectQuantity } from './elements.jsx';

const AvailabilityStatement = (props) => (
  <>
    {parseInt(props.availQuantity) > 0 ? (
      <>
        <div style={{ color: 'green', fontSize: '17px', margin: '10px' }}>In Stock</div>
        <AllText>
          <span style={{ padding: '0px 5px 2px 2px', margin: '10px' }}>Qty: </span>
          <SelectQuantity
            type="number"
            max={parseInt(props.availQuantity)}
            value="1"
            readOnly
          />
          <br />
          <img style={{ padding: '5px', paddingTop: '10px', paddingBottom: '0px', margin: '5px' }} src="/static/addToCartButton.png" alt="Add to Cart" />
          <br />
          <img style={{ padding: '5px', paddingTop: '0px', margin: '5px' }} src="/static/buyNowButton.png" alt="Buy Now" />
        </AllText>
      </>
    ) : (
        <span style={{ color: 'red', fontSize: '13px', margin: '10px' }}>Out of Stock</span>
      )}
  </>
);

export default AvailabilityStatement;
