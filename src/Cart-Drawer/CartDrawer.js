import React, { Component } from 'react';
import './CartDrawer.css';

import Backdrop from '../Backdrop/Backdrop.js';

import { connect } from 'react-redux';      // To access the store
// import { render } from '@testing-library/react';
// import PayPal from '../PayPal/PayPal.js';
import AddressForm  from '../AddressForm/AddressForm.js';
import OrderCompleted from '../OrderCompleted/OrderCompleted.js'
// import PersonalDetails from '../PersonalDetails/PersonalDetails.js'

class Cart extends Component {

    state={
        checkoutOpen:false,
    }

    OpenCheckout=(totalPrice)=>{
        this.setState({checkoutOpen:true})
        let total = Math.round(totalPrice*100)/100
        this.props.fixTotalValue(total);
    }
    closeCheckout=()=>{
        this.setState({checkoutOpen:false})
    }
    render() {
        let Right_Drawer = ['Right-drawer', 'Right-drawer-close'];
        if (this.props.isMenuOpen && !this.state.checkoutOpen) {
            Right_Drawer = ['Right-drawer', 'Right-drawer-open'];
        }
        if (this.props.isMenuOpen && this.state.checkoutOpen) {
            Right_Drawer = ['Right-drawer',  'check-out-open'];
        }

        let totalCartItems = 0;
        let totalPrice = 0;
        return (
            <div>
                <Backdrop
                    isopen={this.props.isMenuOpen}
                    backdropClicked={this.props.backdropClicked} />
                <div className={Right_Drawer.join(' ')} >
                    {/* <p>Inside Right Drawer</p> */}
                    <div className='split-left'>
                        <p>Cart Items</p>
                        {Object.keys(this.props.cart).map(cartItem => {
                            console.log(cartItem);
                            if (this.props.cart[cartItem].quantity) {
                                totalCartItems = totalCartItems + 1;
                                totalPrice = totalPrice + (this.props.cart[cartItem].quantity * this.props.cart[cartItem].price);
                                if (totalCartItems) {
                                    return (
                                        <div key={cartItem} className='Cart-item'>
                                            <img className='Cart-item-image' src={require("../media/ItemImages/" + this.props.cart[cartItem].filename)} alt={this.props.cart[cartItem].description} />
                                            <div className='Cart-item-details'>
                                                <p>{this.props.cart[cartItem].title}</p>
                                                <p> ${this.props.cart[cartItem].price}</p>
                                                <button className='Decrement-button' hidden={this.props.cart[cartItem].quantity <= 0} disabled={this.state.checkoutOpen} onClick={() => this.props.decreaseItemQuantity(this.props.cart[cartItem])}>-</button>
                                                <span hidden={this.props.cart[cartItem].quantity <= 0} style={{ marginRight: '1em' }} >{this.props.cart[cartItem].quantity}</span>
                                                {/* <button className='Increment-button' onClick={()=>this.increaseQuantity(item)}>+</button> */}
                                                <button className='Increment-button'  disabled={this.state.checkoutOpen}   onClick={() => this.props.increaseItemQuantity(this.props.cart[cartItem])}>+</button>
                                                <p className='price' style={{ textAlign: 'center', margin: '10px 10px' }} > ${Math.round(this.props.cart[cartItem].quantity * this.props.cart[cartItem].price * 100) / 100}</p>
                                            </div>
                                        </div>
                                    )

                                }
                                else
                                    return (
                                        <p> Cart is empty, start shopping ! </p>
                                    )

                            }
                            return null
                            
                        })}

                        {totalCartItems && <div>
                            {/* <p>---------------------------</p> */}
                            {/* <p>Total items in cart : {totalCartItems}</p> */}
                            <br></br>
                        {!this.props.orderCompleted && !this.state.checkoutOpen &&  <p className='Checkout-button' onClick={()=>{this.OpenCheckout(totalPrice)}} style={{ textAlign: 'center', width: '50%', margin: 'auto' }} >Checkout: ${Math.round(totalPrice * 100) / 100}</p> }
                        <br></br>
                        </div>}
                        {!totalCartItems && <p> Cart is empty,s start shopping ! </p>}

                    </div>
                    <div className='split-right'>
                        
                        <button className='closeCheckoout-button' title="Cancel checkout" onClick={()=>{this.closeCheckout()}}> X </button>
                        {/* <PersonalDetails/> */}
                        {!this.props.orderCompleted 
                        && <AddressForm/>}
                        {this.props.orderCompleted 
                        && <OrderCompleted/>}
                        {/* <PayPal
                        total={Math.round(totalPrice * 100)/100} /> */}
                    </div>
                    <p>{this.props.isMenuOpen}</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        orderCompleted:state.orderCompleted,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        increaseItemQuantity: (item) => {
            console.log('Item count should be increased', item);
            dispatch({ type: 'ITEM_INCREASE', item: item });
        },
        decreaseItemQuantity: (item) => {
            console.log('Item count should be increased', item);
            dispatch({ type: 'ITEM_DECREASE', item: item });
        },
        fixTotalValue: (total) =>{
            console.log('Fixing the total value now');
            dispatch({ type: 'FIX_TOTAL', value: total });
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);