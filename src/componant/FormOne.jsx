import React, { useRef, useState } from 'react'

const FormOne = () => {
  const [formdata, setformdata] = useState([]);
  const [editindex, seteditindex] = useState(null);

  const username = useRef();
  const useremail = useRef();
  const userphone = useRef();

  const formsubmit = (e) => {
    e.preventDefault();
    const formobj = {
        username : username.current.value,
        useremail : useremail.current.value,
        userphone : userphone.current.value,
    }
    if(editindex !== null) {
        const updatedata = formdata.map((item, index) => {
            if(index === editindex) {
                return formobj;
            }
            return item;
        })
        setformdata(updatedata);
        seteditindex(null);
    } else {
        setformdata([...formdata, formobj]);
    }

    // Clear Result
    username.current.value = "";
    useremail.current.value = "";
    userphone.current.value = "";
  }

  const deletedata = (indexvalue) => {
    const deleteuserdata = formdata.filter((data, index) => {
        return index !== indexvalue;
    });
    setformdata(deleteuserdata);
  }

  const editdata = (indexvalue) => {
    username.current.value = formdata[indexvalue].username;
    useremail.current.value = formdata[indexvalue].useremail;
    userphone.current.value = formdata[indexvalue].userphone;
    seteditindex(indexvalue);
  }

  return <>
    <form onSubmit={formsubmit}>
        <label htmlFor="username">Full Name</label>
        <input type="text" name="username" id="username" ref={username} />
        <label htmlFor="useremail">Email Address</label>
        <input type="email" name="useremail" id="useremail" ref={useremail} />
        <label htmlFor="userphone">Phone</label>
        <input type="tel" name="userphone" id="userphone" ref={userphone} />
        <input type="submit" value={editindex !== null ? "Update" : "Submit"} />
    </form>
    <div className='result-wrap'>
        {
            formdata.map((data, index) => (
                <div key={index}>
                    <h2>{data.username}</h2>
                    <p>{data.useremail}</p>
                    <p>{data.userphone}</p>
                    <button type="button" onClick={() => deletedata(index)}>Delete</button>
                    <button type="button" onClick={() => editdata(index)}>Edit</button>
                </div>
            ))
        }
    </div>
  </>
}

export default FormOne