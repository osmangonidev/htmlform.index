import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
      const savedCart = getDatabaseCart()
      const orderDetails={...loggedInUser,product:savedCart,shipment:data,date:new Date().toDateString()}
      fetch('http://https://frozen-tor-57124.herokuapp.com//addOrder',{
        method:'POST',
        headers:{
          'Content-type':'Application/json'
        },
        body:JSON.stringify(orderDetails)
      })
      .then(res=>res.text())
      .then(data=>{
        if(data){
          processOrder()
          alert('Successfully order placed')
        }
      })
      .catch(err=>console.log(err))

    };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
      {errors.name && <span className="error">Name is required</span>}
     
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}
     
      <input name="address" ref={register({ required: true })}  placeholder="Your Address" />
      {errors.address && <span className="error">Address is required</span>}
     
      <input name="phone" ref={register({ required: true })}  placeholder="Your Phone Number"/>
      {errors.phone && <span className="error">Phone Number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;