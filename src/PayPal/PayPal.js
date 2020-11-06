import React,{Component} from 'react';
import {connect} from 'react-redux';

// import {useState, useEffect, useRef} from 'react';
class PayPal extends Component {
constructor(props){
  super(props);
  this.paypalRef = React.createRef();
}
  state={
    paid:false,
    error:'',
  }

render(){
return(
    <div>
        <br></br>
        <h4 className='pricePaypal'>Total Amount is : ${this.props.orderTotal} </h4>
        <br></br>
        <div ref={this.paypalRef} />
    </div>
)
}
componentDidMount(){
  window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          console.log(this.props.orderTotal);
          let total = this.props.orderTotal;
          let purchase_units = [
            {
              description: "Shopping site Order",
              amount: {
                currency_code: "CAD",
                value: total,
              },
            },
          ];
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: purchase_units,
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.setState({paid:true})
          this.props.orderCompleted();
          console.log(order);
        },
        onError: (err) => {
          // setError(err),
          console.error(err);
        },
      })
      .render(this.paypalRef.current);
}

}

const mapStateToProps=state=>{
  return{
    orderTotal:state.orderTotal,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    orderCompleted:()=>{
      console.log('Order is now completed');
      dispatch({ type: 'ORDER_COMPLETED', value: true });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayPal); 

