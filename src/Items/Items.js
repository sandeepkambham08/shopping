import React, { Component } from 'react';
import itemsData from '../data/products.json';
import './Items.css';
// import i from '../media/ItemImages/1.jpg';
import StarRatings from 'react-star-ratings';

import { connect } from 'react-redux';

// console.log(itemsData);
// itemsData.forEach(item => {
//     console.log(item);
// });

class Items extends Component {
    // let unique = [...new Set(itemsData.type)];
    // console.log(unique);
    state = {
        quantity: 0,
        cart: {},
        itemsData: itemsData,
    }

    render() {
        // let totalCartItems=0;
        // let totalPrice = 0;
        // { Object.keys(this.props.cart).map(cartItem => {
        //         // console.log(this.state.cart[cartItem]);
        //         if (this.props.cart[cartItem].quantity) {
        //             totalCartItems = totalCartItems + 1;
        //         }
        //     })}
        

        return (
            <div>
                {/* <p>All items list here</p> */}
                {/* <p>This is from redux : {this.props.ctr}</p> */}
                {/* <button className='Increment-button' onClick={() => this.props.onIncrementCounter()}>+</button> */}
                <br></br><br></br>

                {this.props.itemsDataRedux.map(item => {
                    if (item.type === this.props.selectedCategory) {
                        return (
                            <div className='Single-item' key={item.title}>
                               <div style={{height:'30vh'}}>
                                <img className='Item-image' src={require("../media/ItemImages/" + item.filename)} alt={item.description} />
                                </div>
                                <div style={{height:'12vh'}}>
                                <p className='Item-title' >{item.title}</p>
                                <span style={{ zIndex: '50' }}><StarRatings
                                    rating={item.rating}
                                    starDimension="15px"
                                    starSpacing="3px"
                                    starRatedColor='#ffd51c'
                                /></span>
                                <span className='price' style={{ textAlign: 'center', margin: '10px 10px' }} > ${item.price}</span>
                                <br></br><br></br>
                                {/* <button className='Decrement-button' hidden={item.quantity<=0} onClick={()=>this.decreaseQuantity(item)}>-</button> */}
                                <button className='Decrement-button' hidden={item.quantity <= 0} onClick={() => this.props.decreaseItemQuantity(item)}>-</button>
                                <span hidden={item.quantity <= 0} style={{ marginRight: '1em' }} >{item.quantity}</span>
                                {/* <button className='Increment-button' onClick={()=>this.increaseQuantity(item)}>+</button> */}
                                <button className='Increment-button' onClick={() => this.props.increaseItemQuantity(item)}>+</button>
                                </div>
                                {/* <p>{item.description}</p> */}

                            </div>

                        )
                    }
                    return null

                })}
                {/* <div>
                    <p>Cart Items</p>
                    {Object.keys(this.props.cart).map(cartItem => {
                        // console.log(this.state.cart[cartItem]);
                        if (this.props.cart[cartItem].quantity) {
                            totalCartItems = totalCartItems + 1;
                            totalPrice = totalPrice + (this.props.cart[cartItem].quantity * this.props.cart[cartItem].price);
                            return (
                                <div key={cartItem} >
                                    <p>{this.props.cart[cartItem].title} Quantity : {this.props.cart[cartItem].quantity}</p>
                                    <img className='Item-image' src={require("../media/ItemImages/" + item.filename)} alt={item.description} />
                                    <span>{this.props.cart[cartItem].quantity} * ${this.props.cart[cartItem].price}</span>
                                    <span className='price' style={{ textAlign: 'center', margin: '10px 10px' }} > ${Math.round(this.props.cart[cartItem].quantity * this.props.cart[cartItem].price * 100) / 100}</span>
                                </div>
                            )
                        }
                    })}
                    <p>----------------------------------------------</p>

                    <p>Total items in cart : {totalCartItems}</p>
                    <p>{totalPrice}</p>
                    <p className='price' style={{ textAlign: 'center', width: '20%', margin: 'auto' }} >Total Price cart : {Math.round(totalPrice * 100) / 100}</p>
                </div> */}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ctr: state.counter,
        itemsDataRedux: state.itemsData,
        cart: state.cart,
    };
};

// const itemsTemp = this.props.itemsDataRedux;

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => {
            console.log('inside increment dispatch')
            dispatch({ type: 'INCREMENT' })
        },
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

export default connect(mapStateToProps, mapDispatchToProps)(Items);







// decreaseQuantity=(item)=>{
//     //  const that = this;
//     console.log(this.state.quantity);
//     // console.log(this.state.cart);

//     // Find item and update its quantity // 
//     const indexFound = this.state.itemsData.findIndex(result=> result.title===item.title);
//     console.log(indexFound);
//     let newArray = [...this.state.itemsData];
//     newArray[indexFound]={...newArray[indexFound],quantity:newArray[indexFound].quantity-1};
//     this.setState({itemsData:newArray},()=>{
//         this.setState({cart: {...this.state.cart, [item.title]: this.state.itemsData[indexFound]}},()=>{
//             console.log(this.state.cart);

//         });
//     });
//     // ^^^^^ Find item and update its quantity ^^^^^ // 


// }

//  increaseQuantity=(item)=>{
//     // const that = this;
//     console.log({item})
//     console.log(item.quantity);

//     // Find item and update its quantity // 
//     const indexFound = this.state.itemsData.findIndex(result=> result.title===item.title);
//     console.log(indexFound);
//     let newArray = [...this.state.itemsData];
//     newArray[indexFound]={...newArray[indexFound],quantity:newArray[indexFound].quantity+1};

//     this.setState({itemsData:newArray},()=>{
//         this.setState({cart: {...this.state.cart, [item.title]: this.state.itemsData[indexFound]}},()=>{
//             console.log(this.state.cart);
//         });
//     });
//     // ^^^^^ Find item and update its quantity ^^^^^ // 

// }