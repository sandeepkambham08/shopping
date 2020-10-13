import React from 'react';
import './Categories.css';


const Categories = (props) =>{
    console.log(props.selectedCategory);
    // var element = document.getElementById("vegetable");
    // element.classList.add("Selected-category");
    // let className = 'Category-button';
    // if (props.selectedCategory==='vegetable') {
    //   className += ' Selected-category';
    // }

    return(
        <div className='Categories'>
            <button id="vegetable" 
            className={props.selectedCategory==='vegetable'?'Category-button Selected-category': 'Category-button'} 
            onClick={()=>props.categorySelection('vegetable')}
            >Vegetables</button>
            
            <button id='fruit'     className={props.selectedCategory==='fruit'?'Category-button Selected-category': 'Category-button'} onClick={()=>props.categorySelection('fruit')}>Fruits</button>
            <button id='dairy'     className={props.selectedCategory==='dairy'?'Category-button Selected-category': 'Category-button'} onClick={()=>props.categorySelection('dairy')}>Dairy</button>
            <button id='bakery'    className={props.selectedCategory==='bakery'?'Category-button Selected-category': 'Category-button'}onClick={()=>props.categorySelection('bakery')}>Bakery</button>
          </div>
    )
}

export default Categories;