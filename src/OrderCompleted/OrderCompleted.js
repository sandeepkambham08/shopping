import React, { Component } from 'react';
import './OrderCompleted.css';
import { connect } from 'react-redux';      // To access the store


class OrderCompleted extends Component {
    render(){
        return(
            <div className='payment-made'>
                <p className='price' >Payment successfull</p>
                <p>Order is placed</p>
                <p>Please check your email for confirmation</p>
            </div>
        )
    }
}

const mapStateToProps= state =>{
    return{
        orderCompleted: state.orderCompleted,
    }
}

export default connect(mapStateToProps)(OrderCompleted)