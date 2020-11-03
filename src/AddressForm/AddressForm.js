import React from 'react';
import $ from 'jquery';
import './AddressForm.css';

const AddressForm=()=>{
    var searchLocation = 'search_location';
    const google = window.google;
    $(document).ready(function(){
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchLocation)), {
        types: ['geocode'],
        componentRestrictions:{'country':['CA']},
        // fields:['place_id','geometry']
    });
    autocomplete.addListener('place_changed',onPlaceChanged(autocomplete));
    })
    function onPlaceChanged(autocomplete){
        var place = autocomplete.getPlace();
        console.log(place);
    }
return (
    <div>
        <form>
        {/* <label>
        Enter your name:
        <input type='text' placeholder="Enter your name" name='Enter your name'/>
        </label> */}
        <label>
        Enter your address:
        <input id='search_location' className='search_location'  type='text' placeholder='Type address'/>
        </label>        
        
        </form>
        
    </div>
)
}

export default AddressForm;