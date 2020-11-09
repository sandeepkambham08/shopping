import React, { Component }  from 'react';
import $ from 'jquery';
// import axios from 'axios';
import emailjs from 'emailjs-com';
// import Form from 'react-bootstrap/Form'
import PayPal from '../PayPal/PayPal.js';
import { connect } from 'react-redux';      // To access the store

import './AddressForm.css';
// import { render } from '@testing-library/react';
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

class AddressForm extends Component {

  state={
    firstName:'',
    lastName:'',
    phoneNumber:'',
    email:'',
    streetAddress:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    errormessage:'',
    validCheckout:false,
  }

  sendEmail =(e)=> {
    e.preventDefault();

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  submitForm =(event)=>{
    event.preventDefault();
    console.log(this.props.cart)
    console.log('Clicked on submit');
    let err = '';
    let streetAddress = 0;
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let phoneNumber = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    if(document.getElementById('apt_number').value){
      streetAddress = document.getElementById('street_number').value +', ' + document.getElementById('apt_number').value + ', ' + document.getElementById('route').value;
    }else{
      streetAddress = document.getElementById('street_number').value + ', ' + document.getElementById('route').value;
    }
    let city = document.getElementById('locality').value;
    let state = document.getElementById('administrative_area_level_1').value;
    let zipCode = document.getElementById('postal_code').value;
    let country = document.getElementById('country').value;
    if(!firstName || !lastName || !phoneNumber || !email || !streetAddress || !city || !state || !zipCode || !country){
      err = "* Please fill all the input fields";
    }
    if(firstName && lastName && phoneNumber && email && streetAddress && city && state && zipCode && country){
      // event.preventDefault();
      // alert('Please fill all the input fields');
      this.setState({
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        email:email,
        streetAddress:streetAddress,
        city:city,
        state:state,
        zipCode:zipCode,
        country:country,
      },()=>{
        console.log( this.state)
        this.setState({validCheckout:true});
        // var form = document.getElementById("Address-form");
        // console.log(form);
        // var elements = form.elements;
        // for (var i = 0, len = elements.length; i < len; ++i) {
        //  elements[i].readOnly = true;
        // }
        $("#Address-form input").prop("disabled", true);
      })
      err = "You can now proceed";
    }

    this.setState({errormessage:err})
    console.log(document.getElementById('email').value);
    console.log(document.getElementById('email').value);
    // console.log(firstName,lastName,phoneNumber,email,streetAddress,city,state,zipCode,country)
    console.log(streetAddress);
  }

  editForm = () =>{
    $("#Address-form input").removeAttr("disabled");
    this.setState({validCheckout:false});
    let err='';
    this.setState({errormessage:err})
  }

  hadleInput = (event) =>{
    console.log(event.target.id)
    console.log(event.target.value)
  }
  
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
  

render(){
  // if(this.props.orderCompleted){
  //   let templateParams = {
  //     to: this.state.email,
  //     subject: 'Order confirmation - from Shopping site',
  //     html:
  //     `<h3>Hello ${this.state.firstName} ${this.state.lastName},</h3>
  //     <h1>Thanks for your order</h1>`
  //   }
  //   emailjs.send('service_35uvf3l', 'template_g1v1dbp', templateParams, "user_zYvcx8ahyv9WeuNCKteNZ")
  //     .then(function (response) {
  //     console.log('SUCCESS!', response.status, response.text);
  //     }, function (error) {
  //     console.log('FAILED...', error);
  //     });
  // }
return (
  <div>
    <div className='Address-form' >
        <form id='Address-form'>
        <br></br>
        <table id="address">
        <tbody>
      <tr>
        <td className="label">Name </td>
        <td className="mediumField">
          <input className="Street-field" id="first-name" name="first-name" placeholder='First name'  required onChange={(event)=>this.hadleInput(event)}/>
        </td>
        <td className="wideField" colSpan="2">
          <input className="Street-field" id="last-name" placeholder='Last name'  required onChange={(event)=>this.hadleInput(event)}/>
        </td>
      </tr>
      <tr>
        <td className="label">Phone</td>
        <td className="slimField">
          <input className="Street-field" id="phone" required onChange={(event)=>this.hadleInput(event)} />
        </td>
        <td className="label">Email</td>
        <td className="mediumField">
          <input className="field" placeholder='name@example.com' id="email" required onChange={(event)=>this.hadleInput(event)}/>
        </td>
      </tr>
      
      </tbody>
    </table>
        <div className='search-box'>
        <label>
        {/* <span >Address:</span> */}
        <input id='search_location' className='search_location'  type='text' placeholder='Address' required onChange={(event)=>this.hadleInput(event)}/>
        </label>  
        </div>
        <table id="address">
        <tbody>
      <tr>
        <td className="label">Street address</td>
        <td className="slimField">
          <input className="Street-field" id="street_number" placeholder='street no' disabled={true} required onChange={(event)=>this.hadleInput(event)}/>
        </td>
        <td className="slimField">
          <input className="Street-field" id="apt_number"  placeholder='apt/unit' disabled={true} />
        </td>
        <td className="wideField" colSpan="2">
          <input className="Street-field" id="route" placeholder='street name' disabled={true} required onChange={(event)=>this.hadleInput(event)}/>
        </td>
      </tr>
      <tr>
        <td className="label">City</td>
        <td className="wideField" colSpan="3">
          <input className="field" id="locality" disabled={true} required onChange={(event)=>this.hadleInput(event)}/>
        </td>
      </tr>
      <tr>
        <td className="label">State</td>
        <td className="slimField">
          <input
            className="field"
            id="administrative_area_level_1"
            disabled={true}
            required onChange={(event)=>this.hadleInput(event)}
          />
        </td>
        <td className="label">Zip code</td>
        <td className="wideField">
          <input className="field" id="postal_code" disabled={true} required onChange={(event)=>this.hadleInput(event)}/>
        </td>
      </tr>
      <tr>
        <td className="label">Country</td>
        <td className="wideField" colSpan="3">
          <input className="field" id="country" disabled={true} required onChange={(event)=>this.hadleInput(event)}/>
        </td>
      </tr>
      </tbody>
    </table>
    {/* <input className='submit-button' type='submit' onClick={(event)=>this.submitForm(event)}/> */}
    <div className="Error-message">{this.state.errormessage}</div>
    {!this.state.validCheckout && <button  className='submit-button' onClick={(event)=>this.submitForm(event)} >Save</button>}
    {this.state.validCheckout && <button  className='submit-button' onClick={()=>this.editForm()} >Edit</button>}

    </form> 
    </div>
    <br></br>
    <h4 className='pricePaypal'>Total Amount is : ${this.props.orderTotal} </h4>
    <br></br>
    {this.state.validCheckout && 
    <PayPal
    total={this.state.phoneNumber} 
    email={this.state.email}
    firstName={this.state.firstName}
    lastName={this.state.lastName}
    />}
    </div>
)
}
}

const mapStateToProps = state => {
  return {
      cart: state.cart,
      orderCompleted:state.orderCompleted,
      orderTotal:state.orderTotal,
  };
};

export default connect(mapStateToProps)(AddressForm);