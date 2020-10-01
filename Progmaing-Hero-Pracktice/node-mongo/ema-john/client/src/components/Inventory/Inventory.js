import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {

    const handleAddProducts=()=>{
        fetch('http://https://frozen-tor-57124.herokuapp.com//addProducts',{
            method:'POST',
            headers:{
                'Content-type':'Application/json'
            },
            body:JSON.stringify(fakeData)
        })
    }

    return (
        <div>
            <h1>Inventory coming soon...</h1>
            <button onClick={handleAddProducts}>Add products</button>
        </div>
    );
};

export default Inventory;