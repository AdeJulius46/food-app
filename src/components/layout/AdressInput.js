import React from 'react'

const AdressInput = ({address, Setaddressprops }) => {
    
    const {phone,country, city,streetAddress,postalcode}=address
  return (
    <div>
        <label>Phone Number</label>
                <input  type='tel'   placeholder="Phone number"       value={phone}  onChange={ev=>Setaddressprops('phone',ev.target.value)}   />
                <label>Address</label>
                    <input type='text' placeholder='Street Address'    value={streetAddress}  onChange={ev=>Setaddressprops('streetAddress',ev.target.value)} />
                    <div classNam  e='flex gap-4'>
                        <div className=''>
                <label>City</label>
                    <input type='text' placeholder='City'  value={city}   onChange={ev=>Setaddressprops('city',ev.target.value)} />
                        </div>
                        <div>
                <label>Postal code</label>
                    <input type='text' placeholder='Postal code'    value={postalcode} onChange={ev=>Setaddressprops('postalcode',ev.target.value)} /> 
                        </div>
                    </div>
                <label>Country</label>
                    <input type='text' placeholder='Country' 
                      value={country} onChange={ev=>Setaddressprops('country',ev.target.value)}  />


    </div>
  )
}

export default AdressInput