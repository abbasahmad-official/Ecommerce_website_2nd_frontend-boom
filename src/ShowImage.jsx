import React from "react";
import { API } from "./config"

const ShowImage = ({item, url, from=null, className="" }) => {
   return (<div className={`prduct-img ${className}`}>
        <img className={`${className}`} src={`${API}/${url}/photo/${item._id}`}  alt={item.name} style={{ objectFit: "cover", height: from? "70px": "200px"}}/>
    </div>)
}

export default ShowImage;