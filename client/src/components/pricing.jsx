import React from 'react';
import ReactDOM from 'react-dom';
import consts from '../../../env/setup.js';

import {
  Wrapper,
  WholeBox,
  PriceText,
  DeliveryText,
  SoldFulfilledText,
  AllText,
} from './elements.jsx';

import $ from 'jquery';

import ShippingStatement from './ShippingStatement.jsx';
import AvailabilityStatement from './AvailabilityStatement.jsx';
import SoldFulfilledStatement from './SoldFulfilledStatement.jsx';
import GiftWrapStatement from './GiftWrapStatement.jsx';
import UserLocationStatement from './UserLocationStatement.jsx';

class Pricing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetails: {},
      productId: null,
      changed: false,
      options: {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      today: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    window.addEventListener('load', this.handleLoad);
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
  }

  decoratePricingData(data) {
    data.gift_wrap_available = true;
    data.user_zip = '78726';
    data.sold_by = data.name;
    data.fulfilled_by = ((data.amz_holds_stock == true) ? "Amazon" : data.name);
    data.ships_on_sunday != 1 && data.ships_on_sunday != 1 ? data.expected_shipping = '4-5 Days' : 'One Day';
  }

  handleLoad() {
    var queryProductId = window.location.pathname.slice(1);
    
    console.log('queryProductId ' + queryProductId);
    if (queryProductId !== '') {
      $.ajax({
      url: '/product/pricing/' + queryProductId,
      type: 'GET',
      success: (serverData) => {
        console.log('serverData ' + typeof serverData + ', ' + serverData);
        this.decoratePricingData(serverData);
        console.log(JSON.stringify(serverData))
        return serverData;
      },
      error: (err) => {
        console.log('error getting data from server ' + err);
        return {};
      },
    }).then((dataReturned) => {
      var recId = dataReturned.id || queryProductId;
      this.setState({
        productDetails: dataReturned,
        productId: recId,
      });
      this.setState({
        changed: this.state.changed ? false : true,
      });
    });
  }}

  render() {
    return (
      <Wrapper>
        <WholeBox>
          <PriceText>${this.state.productDetails.price}</PriceText>

          {this.state.productDetails.free_delivery == false ? (
            <span style={{ color: '#0066C0', fontSize: '13px', margin: '10px', paddingLeft: '10px' }}>
              & Free Shipping
            </span>
          ) : (
              <ShippingStatement
                fulfilledBy={this.state.productDetails.fulfilled_by}
                expectedShipping={this.state.productDetails.expected_shipping}
              />
            )}

          <DeliveryText>
            <b>Want it{' '}
              {this.state.today.toLocaleDateString('en-US', this.state.options)} </b> ?
            Order within 7 hrs 56 mins and choose <b>Standard Shipping</b> at checkout.
          </DeliveryText>

          <AvailabilityStatement
            availQuantity={this.state.productDetails.quantity_available}
          />

          <SoldFulfilledText>
            <SoldFulfilledStatement
              soldBy={this.state.productDetails.sold_by}
              fulfilledBy={this.state.productDetails.fulfilled_by}
            />
          </SoldFulfilledText>

          <AllText>
            <GiftWrapStatement
              giftWrapAvailable={this.state.productDetails.gift_wrap_available}
            />
          </AllText>

          <AllText>
            <UserLocationStatement
              userZip={this.state.productDetails.user_zip}
            />
          </AllText>
        </WholeBox>
      </Wrapper>
    );
  }
}

export default Pricing;
