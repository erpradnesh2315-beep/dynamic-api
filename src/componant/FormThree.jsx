import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const FormThree = () => {
    const [posts, setposts] = useState([]);
    const [editid, seteditid] = useState(null);
    
    const title = useRef();
    const excerpt = useRef();

    const formsubmit = async(e) => {
        e.preventDefault();

        const formobj = {
            title: title.current.value,
            excerpt: excerpt.current.value,
        }

        if(editid) {
                const respupdate = await axios.put(`https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost/${editid}`, formobj);
                const updatedata = posts.map((item) => {
                    if(item.id == editid) {
                        return respupdate.data;
                    }
                return item;
            });
            setposts(updatedata);
            seteditid(null);
        }else {
            const resp = await axios.post("https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost", formobj);
            setposts([...posts, resp.data]);
        }

        // clear result
        title.current.value = "";
        excerpt.current.value = "";
    }

    const deletedata = async(id) => {
        try {
            await axios.delete(`https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost/${id}`);
            const deleteuserdata = posts.filter((item) => {
                return item.id !== id;
            });
            setposts(deleteuserdata);
        } catch(error) {
            console.log("Error :", error);  
        }
    }

    const editdata = async(item) => {
        title.current.value = item.title;
        excerpt.current.value = item.excerpt;
        seteditid(item.id);
    }


    useEffect(() => {
        const postApi = async() => {
            try {
                const respapi = await axios.get("https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost");
                setposts(respapi.data);
            } catch(error) {
                console.log("Error : ", error);
            }
        }
        postApi();
    }, [])

  return <>
    <form onSubmit={formsubmit}>
        <label htmlFor="title">Post Title</label>
        <input type="text" name="title" id="title" ref={title} />
        <label htmlFor="excerpt">Post Excerpt</label>
        <textarea name="excerpt" id="excerpt" ref={excerpt}></textarea>
        <input type="submit" value="Add Post" />
    </form>
    <div className='result-wrap'>
        {
            posts.map((data) => (
                <div key={data.id}>
                    <h2>{data.title}</h2>
                    <p>{data.excerpt}</p>
                    <button type="button" onClick={() => deletedata(data.id)}>Delete</button>
                    <button type="button" onClick={() => editdata(data)}>Edit</button>
                </div>
            ))
        }
    </div>
  </>
}

export default FormThree