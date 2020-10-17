import React, { Component } from 'react';
import itemsData from '../data/products.json';
import './Items.css';
// import i from '../media/ItemImages/1.jpg';
import StarRatings from 'react-star-ratings';

import {connect} from 'react-redux';

// console.log(itemsData);
// itemsData.forEach(item => {
//     console.log(item);
// });

class Items extends Component {
    // let unique = [...new Set(itemsData.type)];
    // console.log(unique);
    state={
        quantity:0,
        cart:{},
        itemsData:itemsData,
    }
     decreaseQuantity=(item)=>{
        //  const that = this;
        console.log(this.state.quantity);
        // console.log(this.state.cart);

        // Find item and update its quantity // 
        const indexFound = this.state.itemsData.findIndex(result=> result.title===item.title);
        console.log(indexFound);
        let newArray = [...this.state.itemsData];
        newArray[indexFound]={...newArray[indexFound],quantity:newArray[indexFound].quantity-1};
        this.setState({itemsData:newArray},()=>{
            this.setState({cart: {...this.state.cart, [item.title]: this.state.itemsData[indexFound]}},()=>{
                console.log(this.state.cart);
                
            });
        });
        // ^^^^^ Find item and update its quantity ^^^^^ // 

        
    }

     increaseQuantity=(item)=>{
        // const that = this;
        console.log({item})
        console.log(item.quantity);

        // Find item and update its quantity // 
        const indexFound = this.state.itemsData.findIndex(result=> result.title===item.title);
        console.log(indexFound);
        let newArray = [...this.state.itemsData];
        newArray[indexFound]={...newArray[indexFound],quantity:newArray[indexFound].quantity+1};

        this.setState({itemsData:newArray},()=>{
            this.setState({cart: {...this.state.cart, [item.title]: this.state.itemsData[indexFound]}},()=>{
                console.log(this.state.cart);
            });
        });
        // ^^^^^ Find item and update its quantity ^^^^^ // 
       
    }

    render(){
        let totalCartItems, totalPrice = 0 ; 
        totalCartItems = Object.keys(this.state.cart).length; 
        // Object.keys(this.state.cart).map(cartItem=>{
        //     totalCartItems = totalCartItems+this.state.cart[cartItem].quantity;
        //     // console.log(this.state.cart.length())
        // });

        return (
            <div>
                {/* <p>All items list here</p> */}
                <p>This is from redux : {this.props.ctr}</p>
                <button className='Increment-button' onClick={()=>this.props.onIncrementCounter()}>+</button>
                <br></br><br></br>
    
                {this.props.itemsDataRedux.map(item => {
                    if (item.type === this.props.selectedCategory) {
                        return (
                            <div className='Single-item' key={item.title}>
                                <img className='Item-image' src={require("../media/ItemImages/" + item.filename)} alt={item.description} />
                                <p className='Item-title' >{item.title}</p>
                                
                                <span style={{zIndex:'50'}}><StarRatings
                                    rating={item.rating}
                                    starDimension="15px"
                                    starSpacing="3px"
                                    starRatedColor='#ffd51c'
                                /></span>
                                <span className='price' style={{ textAlign: 'center', margin:'10px 10px'}} > ${item.price}</span>
                                <br></br><br></br>
                                {/* <button className='Decrement-button' hidden={item.quantity<=0} onClick={()=>this.decreaseQuantity(item)}>-</button> */}
                                <button className='Decrement-button' hidden={item.quantity<=0} onClick={()=>this.props.decreaseItemQuantity(item)}>-</button>
                                <span hidden={item.quantity<=0} style={{marginRight:'1em'}} >{item.quantity}</span>
                                {/* <button className='Increment-button' onClick={()=>this.increaseQuantity(item)}>+</button> */}
                                <button className='Increment-button' onClick={()=>this.props.increaseItemQuantity(item)}>+</button>
                                <br></br>
                                
                                <br></br> 
                                {/* <p>{item.description}</p> */}
    
                            </div>
    
                        )
                    }
    
                })}
            <div>
                <p>Cart Items</p>
                {Object.keys(this.state.cart).map(cartItem=>{
                    // console.log(this.state.cart[cartItem]);
                    if(this.state.cart[cartItem].quantity){
                        totalPrice = totalPrice + (this.state.cart[cartItem].quantity *  this.state.cart[cartItem].price);
                        return(
                            <div key={cartItem} >
                            <p>{this.state.cart[cartItem].title} Quantity : {this.state.cart[cartItem].quantity}</p>
                            {/* <img className='Item-image' src={require("../media/ItemImages/" + item.filename)} alt={item.description} /> */}
                            <span>{ this.state.cart[cartItem].quantity} * ${this.state.cart[cartItem].price}</span>
                            <span className='price' style={{ textAlign: 'center', margin:'10px 10px'}} > ${ this.state.cart[cartItem].quantity *  this.state.cart[cartItem].price}</span>
                            </div>
                            )
                    }
                })}
                <p>----------------------------------------------</p>
                
                <p>Total items in cart : {totalCartItems}</p>
                <p className='price' style={{ textAlign: 'center',width:'20%' , margin:'auto'}} >Total Price cart : {totalPrice}</p>
            </div>
            </div>
        )
    }
    
}

const mapStateToProps = state =>{
    return{
        ctr : state.counter,
        itemsDataRedux : state.itemsData,
    };
};

// const itemsTemp = this.props.itemsDataRedux;

const mapDispatchToProps = dispatch =>{
    const that = this;
    return {
        onIncrementCounter : () => {
            console.log('inside increment dispatch')
            dispatch({type:'INCREMENT'})
        },
        increaseItemQuantity : (item) =>{
            console.log('Item count should be increased', item);
            dispatch({type:'ITEM_INCREASE',item:item});
        },
        decreaseItemQuantity : (item) =>{
            console.log('Item count should be increased', item);
            dispatch({type:'ITEM_DECREASE',item:item});
        }
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Items);