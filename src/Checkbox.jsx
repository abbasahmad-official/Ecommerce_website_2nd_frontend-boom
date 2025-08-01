import React, {useState} from 'react'


const Checkbox = ({ categories, handleFilters, selectedCategories }) => {

    const [checked, setChecked] = useState([]);

    const handleChange  = (c) => () => {
        const currentCategoryId =  selectedCategories.indexOf(c);
        const newCheckedCategoryId = [...selectedCategories];

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        // console.log(newCheckedCategoryId)
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return (
        <div className="filter-selection-box">
            
            <h4>Categories</h4>
            {categories.map((category,i) => (
                <div className="checkbox" key={i}>
                <input type="checkbox" 
                checked={selectedCategories.includes(category._id)}
                onChange={handleChange(category._id)}/>
                <p>{category.name}</p>
            </div>
        ))}
            {/* <div className="checkbox">
                <input type="checkbox" />
                <p>category name</p>
            </div> */}
        </div>

    )
}

export default Checkbox
