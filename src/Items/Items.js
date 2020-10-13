import React from 'react';
import itemsData from '../data/products.json';
import './Items.css';
// import i from '../media/ItemImages/1.jpg';
import StarRatings from 'react-star-ratings';

// console.log(itemsData);
// itemsData.forEach(element => {
//     console.log(element);
// });
const Items = (props) => {
    // let unique = [...new Set(itemsData.type)];
    // console.log(unique);
    return (
        <div>
            {/* <p>All items list here</p> */}
            <br></br><br></br>

            {itemsData.map(element => {
                if (element.type === props.selectedCategory) {
                    return (
                        <div className='Single-item' key={element.title}>
                            <img className='Item-image' src={require("../media/ItemImages/" + element.filename)} alt={element.description} />
                            <p className='Item-title' >{element.title}</p>
                            <p className='price' style={{ textAlign: 'center',objectFit:'contain' }} > ${element.price}</p>
                            <button className='Decrement-button'>-</button>
                            <span>{0}</span>
                            <button className='Increment-button'>+</button>
                            <br></br>
                            <StarRatings
                                rating={element.rating}
                                starDimension="15px"
                                starSpacing="3px"
                                starRatedColor='#ffd51c'
                                style={{zIndex:'50'}}
                            />
                            <br></br>
                            {/* <p>{element.description}</p> */}

                        </div>

                    )
                }

            })}
        </div>
    )
}

export default Items;