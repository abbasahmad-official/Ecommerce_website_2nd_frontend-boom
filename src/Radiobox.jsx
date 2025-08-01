import React, { Fragment, useState } from 'react'

const Radiobox = ({prices, handleFilters, selectedPrice}) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value);
        // setValue(event.target.value)
        // 
    }
    return (
        <div className="filter-selection-box">
            <h4 id='price'>Price</h4>
           {prices.map((price, i)=>(
           
            <div className="checkbox" key={i}>
                <input type="radio" 
               checked={selectedPrice.length === 0 ? (price._id === 0) : selectedPrice[0] === price.array[0]}
              // checked={selectedPrice.length && selectedPrice[0] === price.array[0]} // compare arrays by first value
                // defaultChecked={selectedPrice.length===0}
                name={"price"}
                onChange={handleChange}
                value={`${price._id}`}
                />
                <p>{price.name}</p>
            </div>
            
           ))} 
           
        </div>
    )
}

export default Radiobox
