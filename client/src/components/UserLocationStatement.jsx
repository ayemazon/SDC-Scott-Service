import React from 'react';


const UserLocationStatement = (props) => (
  <div>
    {
      props.userZip !== null ?
        (
          <div style={{ lineHeight: '21px', borderTop: '1px solid #a9a9a9', fontSize: '11px', color: 'blue', margin: '8px', paddingLeft: '0px', paddingTop: '10px', verticalAlign: 'middle' }}>
            <span><img src="/static/locationPin.png" alt="" ></img></span>
            <span style={{ lineHeight: '21px', margin: '5px', paddingLeft: '5px', paddingBottom: '5px', verticalAlign: 'middle' }}>Deliver to {props.userZip} </span>
          </div>
        )
        :
        (<br />)
    }
  </div>
);




export default UserLocationStatement;

