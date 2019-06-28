import React from 'react';
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
    this.handleLoad();
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.handleLoad);
  }

  handleLoad() {
    var queryProductId = window.location.pathname.slice(10);
    queryProductId = queryProductId.replace("/", "");
    //queryProductId = queryProductId.replace(":", "");
    console.log('queryProductId ' + queryProductId);
    $.ajax({
      url: consts.server_host + 'product/:' + queryProductId,
      type: 'GET',
      success: (serverData) => {
        console.log('serverData ' + typeof serverData + ', ' + serverData);
        return serverData;
      },
      error: (err) => {
        console.log('error getting data from server ' + err);
        return {};
      },
    }).then((dataReturned) => {
      var dataParsed = JSON.parse(dataReturned);
      var recId = dataParsed.id || queryProductId;
      this.setState({
        productDetails: dataParsed,
        productId: recId,
      });
      this.setState({
        changed: this.state.changed ? false : true,
      });
    });
  }

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
            availQuantity={this.state.productDetails.available_quantity}
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
