import axios from 'axios';
import React, { useRef, useState } from 'react'

const ContactForm = () => {

    const username = useRef();
    const useremail = useRef();
    const userdescription = useRef();

    const formsubmit = async(e) => {
        e.preventDefault();
        const formobj = {
            data: [
                {
                    Last_Name: username.current.value,
                    Email: useremail.current.value,
                    Description: userdescription.current.value,
                }
            ]
        };

        try {
            const resp = await axios.post("/api/lead", formobj);
            console.log("Lead Created Succesfully", resp.data);
            // Clear Result
            username.current.value = "";
            useremail.current.value = "";
            userdescription.current.value = "";
        } catch(error) {
            console.log(error.response?.data || error);
        }
    }
  return <>
    <form onSubmit={formsubmit}>
        <label htmlFor="username">Full Name</label>
        <input type="text" name="username" id="username" ref={username} />
        <label htmlFor="useremail">Email Address</label>
        <input type="email" name="useremail" id="useremail" ref={useremail} />
        <label htmlFor="userdescription">Message</label>
        <textarea name="userdescription" id="userdescription" ref={userdescription}></textarea>
        <input type="submit" value="Submit" />
    </form>
  </>
}

export default ContactForm