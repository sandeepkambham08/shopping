import React, {Component} from 'react';
// import logo from './logo.svg';
// import background from './media/backgroundImage.jpg';
import menu from './media/menu.png';
import cart from './media/cart1.jpg';
import './App.css';
import StarRatings from 'react-star-ratings';

import _ from 'lodash';

import Leftdrawer from './Left-drawer/LeftDrawer';
import Rightdrawer from './Right-drawer/RightDrawer';
import Categories from './Categories/Categories'

import Items from './Items/Items.js'

import {connect} from 'react-redux';      // To access the store

class App extends Component {

  state = {
    leftMenuOpen: false,
    rightMenuOpen:false,
    selectedCategory:'fruit',
  }
  
  LeftdrawerOpen = () =>{
    // console.log('menu is now open');
    this.setState(prevState=>({
      leftMenuOpen:!prevState.leftMenuOpen
    }));
  }

  rightDrawerOpen = () =>{
     console.log('right is now open');
    this.setState(prevState=>({
      rightMenuOpen:!prevState.rightMenuOpen
    }));
  }

  categorySelection = (category) =>{
    // console.log(category);
    this.setState({selectedCategory:category});
  }

  checkHeader = _.throttle(() => {
    // Run JavaScript stuff here
    let scrollPosition = Math.round(window.scrollY);
    console.log('scrolling' + scrollPosition)
    if (scrollPosition > 70) {
      document.querySelector('header').classList.add('transparent');
      // document.querySelector(".App-logo").classList.add('sticky');
      // document.querySelector(".userLogo").classList.add('sticky');
    }
    // If not, remove "sticky" class from header
    else if (scrollPosition < 10) {
      document.querySelector('header').classList.remove('transparent');
      // document.querySelector(".App-logo").classList.remove('sticky');
      // document.querySelector(".userLogo").classList.remove('sticky');
    }

  }, 400);

  render(){
    let totalCartItems = 0 ; 
        // totalCartItems = Object.keys(this.props.cart).length; 
    {Object.keys(this.props.cart).map(cartItem=>{
          // console.log(this.state.cart[cartItem]);
          if(this.props.cart[cartItem].quantity){
              totalCartItems = totalCartItems+1;
          }
    })}
    return (
      <div className="App">
       <header className="App-header">
            <img src={menu} onClick={()=>this.LeftdrawerOpen()} className='Menu-button' alt="menu-button"/>
            <p> The <span style={{fontWeight:"bolder", fontStyle:'italic',  textShadow:'3px 3px 7px #0f0f0f'}}>Shopping</span> store you love </p>
            <div onClick={()=>this.rightDrawerOpen()} >
            <span className='Items-Count'>{totalCartItems}</span>
            <img src={cart} className='Cart-button' alt="menu-button"/>
            </div>
        </header>
        <div className='App-body'>
        {window.addEventListener('scroll', this.checkHeader)}
          {/* <p>testing</p> */}
          <Leftdrawer
          isMenuOpen = {this.state.leftMenuOpen}
          backdropClicked = {this.LeftdrawerOpen}
          />
          <Rightdrawer
          isMenuOpen = {this.state.rightMenuOpen}
          backdropClicked = {this.rightDrawerOpen}
          />
          <Categories
          categorySelection={this.categorySelection}
          selectedCategory = {this.state.selectedCategory}/>
          <Items
          selectedCategory = {this.state.selectedCategory}/>
          {/* <img src={background} className='Background-image'/> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
      cart : state.cart,
  };
};

export default connect(mapStateToProps)(App);
