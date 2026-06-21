import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const ProductApi = () => {
    const [products, setproducts] = useState([]);
    const [editid, seteditid] = useState(null);

    const product_name = useRef();
    const product_price = useRef();
    const product_description = useRef();

    const formsubmit = async(e) => {
        e.preventDefault();
        const formobj = {
            product_name : product_name.current.value,
            product_price : product_price.current.value,
            product_description: product_description.current.value
        }

        if(editid){
            const respupdate = await axios.put(`https://6a36764b766b831960f9414f.mockapi.io/Product/${editid}`, formobj);
            const updatedata = products.map((item) => {
                if(editid == item.id) {
                    return respupdate.data;
                }
                return item;
            });
            setproducts(updatedata);
            seteditid(null);
        } else {
            const respformobj = await axios.post("https://6a36764b766b831960f9414f.mockapi.io/Product", formobj);
            setproducts([...products, respformobj.data]);
            // Clear Result
            product_name.current.value = "";
            product_price.current.value = "";
            product_description.current.value = "";
        }

    }

    const deletedata = async(id) => {
        try {
            await axios.delete(`https://6a36764b766b831960f9414f.mockapi.io/Product/${id}`);
            const deleteuserdata = products.filter((item) => {
                return item.id !== id;
            });
            setproducts(deleteuserdata);
        } catch(error) {
            console.log("Error:", error);
            
        }
    }

    const editdata = async(item) => {
        product_name.current.value = item.product_name;
        product_price.current.value = item.product_price;
        product_description.current.value = item.product_description;
        seteditid(item.id);
    }

    useEffect(() => {
            const productApi = async() => {
                try {
                const respapi = await axios.get("https://6a36764b766b831960f9414f.mockapi.io/Product");
                setproducts(respapi.data);
            } catch(error) {
                console.log("Error:", error);
            }
        }
            productApi();
    }, [])

  return <>
    <form onSubmit={formsubmit}>
        <label htmlFor="product_name">Name</label>
        <input type="text" name="product_name" id="product_name" ref={product_name} />
        <label htmlFor="product_price">Price</label>
        <input type="number" name="product_price" id="product_price" ref={product_price} />
        <label htmlFor="product_description">Product Description</label>
        <input type="text" name="product_description" id="product_description" ref={product_description} />
        <input type="submit" value="Add Product" />
    </form>
    <div className='result-wrap'>
        {
            products.map((data) => (
                <div key={data.id}>
                    <h2>{data.product_name}</h2>
                    <p>{data.product_price}</p>
                    <p>{data.product_description}</p>
                    <button type="button" onClick={()=> deletedata(data.id)}>Delete</button>
                    <button type="button" onClick={()=> editdata(data)}>Edit</button>
                </div>
            ))
        }
    </div>
  </>
}

export default ProductApi