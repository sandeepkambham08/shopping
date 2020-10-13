import React from 'react';
import itemsData from '../data/products.json';
import './Items.css';
// import i from '../media/ItemImages/1.jpg';

// console.log(itemsData);
// itemsData.forEach(element => {
//     console.log(element);
// });
const Items = (props) =>{
    // let unique = [...new Set(itemsData.type)];
    // console.log(unique);
    return(
        <div>
            <p>All items list here</p>  
            {itemsData.map(element=>{
                if(element.type===props.selectedCategory){
                    return(
                        <div className='Single-item' key={element.title}>
                            <img className='Item-image' src={require("../media/ItemImages/"+element.filename)} alt={element.description}/>
                            <p className='Item-title'>{element.title} <span className='price' style={{textAlign:'right'}} > ${element.price}</span>  </p>
                            {/* <p>{element.description}</p> */}
                            
                        </div>
                        
                    )
                }
                
            })}
        </div>
    )
}

export default Items;