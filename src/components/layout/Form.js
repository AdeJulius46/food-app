"use client "
import React from 'react'
import EditableImage from '../Editableimage'
import { useState } from 'react'
import { useProfile } from '../Useprofile'
import AdressInput from './AdressInput'
const Form = ({onSave, user}) => {
    console.log(user)
    const [username, Setusername] = useState(user?.name  ||  "") 
    const [image, Setimage ] =useState(user?.image || "")

    const [phone, Setphone]= useState( user?.phone ||"")
    const [streetAddress, SetstreetAddress]= useState(user?.streetAddress || "")
    const [postalcode, Setpostalcode]= useState( user?.postalcode || "")
    const [city, Setcity]= useState( user?.city || "")
    const [country, Setcountry]= useState( user?.country || "")
    const [admin, Setadmin]=useState(user?.admin || false)
    const {data:loggedinuserdat}= useProfile()


    const  handleAddresschange = (propName,value) =>{
        if(propName ==='city' ) Setcity(value)
        if(propName ==='phone' ) Setphone(value)
        if(propName ==='country' ) Setcountry(value)
        if(propName ==='streetAdress' ) SetstreetAddress(value)
        if(propName ==='postalcode' ) Setpostalcode(value)
    }
  return (

<>
            <form className='mt-8  max-w-lg mx-auto' onSubmit={(ev)=>  onSave(ev,{name:username,image, phone, streetAddress, country,postalcode,city,admin})}>
                <div className='grid gap-4  items-start'  style={{gridTemplateColumns:".3fr .7fr"}}>
                <div clas sName='max-w-[200px]'>
               <EditableImage   link={image} setLink={Setimage}  />
                </div>
                <div>
                <input  type='text' placeholder='First and lastname' value={username} 
                onChange={(ev)=>Setusername(ev.target.value) }
         
                />
                <label>Email</label>
                <input  type='email'  disabled={true} value={user.email}    />
                {/* <label>Phone Number</label>
                <input  type='tel'   placeholder="Phone number"       value={phone}  onChange={ev=>Setphone(ev.target.value)}   />
                <label>Address</label>
                    <input type='text' placeholder='Street Address'    value={streetAddress}  onChange={ev => SetstreetAddress(ev.target.value)} />
                    <div className='flex gap-4'>
                        <div className=''>
                <label>City</label>
                    <input type='text' placeholder='City'  value={city}   onChange={ev => Setcity(ev.target.value)} />
                        </div>
                        <div>
                <label>Postal code</label>
                    <input type='text' placeholder='Postal code'    value={postalcode} onChange={ev =>Setpostalcode(ev.target.value)} /> 
                        </div>
                    </div>
                <label>Country</label>
                    <input type='text' placeholder='Country' 
                      value={country} onChange={ ev => Setcountry(ev.target.value)}  />
 */}

        <AdressInput  address={{streetAddress,postalcode,city,country,phone}} Setaddressprops={handleAddresschange}     />

                      {loggedinuserdat.admin &&(
                      <div>
                        <label className='p-2  gap-2 mb-2  inline-flex items-center ' htmlFor='adminCb'>
                        <input  id="adminCb" type='checkbox' className='' value={"1"}
                            checked={admin}
                            onChange={ev =>  Setadmin(ev.target.checked)}
                            />
                            <span>
                            Admin
                            </span>
                            </label>
                      </div>
                      )}
                <button  type='submit' >Save</button>
                </div>
                </div>
                 
            </form>
    </>
    )
}

export default Form