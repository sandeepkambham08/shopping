import React from 'react';
// import './PersonalDetails.css'

const PersonalDetails= ()=>{

    return(
        <div className='personal-details-form'>
        <table id="address">
      <tr>
        <td class="label">Name</td>
        <td class="slimField">
          <input class="field" placeholder='First name' />
        </td>
        <td class="slimField">
          <input class="field"  placeholder='Middle Name' />
        </td>
        <td class="slimField" colspan="2">
          <input class="field"  placeholder='Last name'  />
        </td>
      </tr>
      <tr>
        <td class="label">Contact no</td>
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
    </table>
           
        </div>
    )
}

export default PersonalDetails;