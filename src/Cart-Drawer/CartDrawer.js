import React, { Component } from 'react';
import './CartDrawer.css';

import Backdrop from '../Backdrop/Backdrop.js';

import { connect } from 'react-redux';      // To access the store
import { render } from '@testing-library/react';

class Cart extends Component {

    render() {
        let Right_Drawer = ['Right-drawer', 'Right-drawer-close'];
        if (this.props.isMenuOpen) {
            Right_Drawer = ['Right-drawer', 'Right-drawer-open'];
        }
        let totalCartItems= 0;
        let totalPrice = 0;
        return (
            <div>
                {/* <Backdrop
                    isopen={this.props.isMenuOpen}
                    backdropClicked={this.props.backdropClicked} /> */}
                <div className={Right_Drawer.join(' ')} >
                    {/* <p>Inside Right Drawer</p> */}
                    <div>
                        <p>Cart Items</p>
                        {Object.keys(this.props.cart).map(cartItem => {
                            console.log(cartItem);
                            if (this.props.cart[cartItem].quantity) {
                                 totalCartItems = totalCartItems +1;
                                 totalPrice = totalPrice + (this.props.cart[cartItem].quantity *  this.props.cart[cartItem].price);
                                if(totalCartItems){
                                    return (
                                        <div key={cartItem} className='Cart-item'>
                                            <img className='Cart-item-image' src={require("../media/ItemImages/" + this.props.cart[cartItem].filename)} alt={this.props.cart[cartItem].description} />
                                            <div className='Cart-item-details'>
                                            <p>{this.props.cart[cartItem].title}</p>
                                            <p> ${this.props.cart[cartItem].price}</p>
                                            <button className='Decrement-button' hidden={this.props.cart[cartItem].quantity <= 0} onClick={() => this.props.decreaseItemQuantity(this.props.cart[cartItem])}>-</button>
                                            <span hidden={this.props.cart[cartItem].quantity <= 0} style={{ marginRight: '1em' }} >{this.props.cart[cartItem].quantity}</span>
                                             {/* <button className='Increment-button' onClick={()=>this.increaseQuantity(item)}>+</button> */}
                                            <button className='Increment-button' onClick={() => this.props.increaseItemQuantity(this.props.cart[cartItem])}>+</button>
                                            <p className='price' style={{ textAlign: 'center', margin: '10px 10px' }} > ${Math.round(this.props.cart[cartItem].quantity * this.props.cart[cartItem].price * 100) / 100}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                else 
                                return(
                                    <p> Cart is empty, start shopping ! </p>
                                )
                                
                            }
                        })}
                        {totalCartItems && <div>
                        {/* <p>---------------------------</p> */}
                        {/* <p>Total items in cart : {totalCartItems}</p> */}
                        <p className='Checkout-button' style={{ textAlign: 'center',width:'50%' , margin:'auto'}} >Checkout: ${Math.round(totalPrice*100)/100}</p>
                        </div>}
                        {!totalCartItems && <p> Cart is empty, start shopping ! </p>}
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
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(Cart);