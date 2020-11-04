import React from 'react';
import $ from 'jquery';
import './AddressForm.css';

const AddressForm=()=>{
    var searchLocation = 'search_location';
    const google = window.google;
    const componentForm = {
        street_number: "short_name",
        apt_number:"short_name",
        route: "long_name",
        locality: "long_name",
        administrative_area_level_1: "short_name",
        country: "long_name",
        postal_code: "short_name",
    };
      

    $(document).ready(function(){
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchLocation)), {
        types: ['geocode'],
        componentRestrictions:{'country':['CA','USA']},
        // fields:['place_id','geometry']
    });
    autocomplete.setFields(["address_component"])
    google.maps.event.addListener(autocomplete,'place_changed',  function(){
        var place = autocomplete.getPlace();
        console.log(place);
        for (const component in componentForm) {
            document.getElementById(component).value = "";
            document.getElementById(component).disabled = false;
          }
        
          // Get each component of the address from the place details,
          // and then fill-in the corresponding field on the form.
          for (const component of place.address_components) {
            const addressType = component.types[0];
        
            if (componentForm[addressType]) {
              const val = component[componentForm[addressType]];
              document.getElementById(addressType).value = val;
            }
          }        
    })
    })
    
return (
    <div className='Address-form'>
        <form>
        {/* <label>
        Enter your name:
        <input type='text' placeholder="Enter your name" name='Enter your name'/>
        </label> */}
        <label>
        Enter your address:
        <input id='search_location' className='search_location'  type='text' placeholder='Type address'/>
        </label>  
        <table id="address">
            
      <tr>
        <td class="label">Street address</td>
        <td class="slimField">
          <input class="field" id="street_number" placeholder='street no' disabled="false" />
        </td>
        <td class="slimField">
          <input class="field" id="apt_number"  placeholder='apt/unit' disabled="false" />
        </td>
        <td class="wideField" colspan="2">
          <input class="field" id="route" placeholder='street name' disabled="true" />
        </td>
      </tr>
      <tr>
        <td class="label">City</td>
        <td class="wideField" colspan="3">
          <input class="field" id="locality" disabled="false" />
        </td>
      </tr>
      <tr>
        <td class="label">State</td>
        <td class="slimField">
          <input
            class="field"
            id="administrative_area_level_1"
            disabled="true"
          />
        </td>
        <td class="label">Zip code</td>
        <td class="wideField">
          <input class="field" id="postal_code" disabled="true" />
        </td>
      </tr>
      <tr>
        <td class="label">Country</td>
        <td class="wideField" colspan="3">
          <input class="field" id="country" disabled="true" />
        </td>
      </tr>
    </table>
      
        
        </form>
        
    </div>
)
}

export default AddressForm;