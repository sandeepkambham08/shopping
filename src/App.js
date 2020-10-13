import React, {Component} from 'react';
// import logo from './logo.svg';
// import background from './media/backgroundImage.jpg';
import menu from './media/menu.png';
import cart from './media/cart1.jpg';
import './App.css';

import Leftdrawer from './Left-drawer/LeftDrawer';
import Rightdrawer from './Right-drawer/RightDrawer';

import Items from './Items/Items.js'

class App extends Component {

  state = {
    leftMenuOpen: false,
    rightMenuOpen:false,
    selectedCategory:'vegetable',
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
    console.log(category);
    this.setState({selectedCategory:category});
  }

  render(){
    return (
      <div className="App">
       <header className="App-header">
            <img src={menu} onClick={()=>this.LeftdrawerOpen()} className='Menu-button' alt="menu-button"/>
            <p> The <span style={{fontWeight:"bolder", fontStyle:'italic',  textShadow:'3px 3px 7px #ff0f0f'}}>Shopping</span> store you love </p>
            <img src={cart} onClick={()=>this.rightDrawerOpen()} className='Cart-button' alt="menu-button"/>
        </header>
        <div className='App-body'>
          {/* <p>testing</p> */}
          <Leftdrawer
          isMenuOpen = {this.state.leftMenuOpen}
          backdropClicked = {this.LeftdrawerOpen}
          />
          <Rightdrawer
          isMenuOpen = {this.state.rightMenuOpen}
          backdropClicked = {this.rightDrawerOpen}
          />
          <div className='Categories'>
            <button onClick={()=>this.categorySelection('vegetable')}>Vegetables</button>
            <button onClick={()=>this.categorySelection('fruit')}>Fruits</button>
            <button onClick={()=>this.categorySelection('dairy')}>Dairy</button>
            <button onClick={()=>this.categorySelection('bakery')}>Bakery</button>
          </div>
          <Items
          selectedCategory = {this.state.selectedCategory}/>
          {/* <img src={background} className='Background-image'/> */}
        </div>
      </div>
    );
  }
}

export default App;
