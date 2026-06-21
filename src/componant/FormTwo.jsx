import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const FormTwo = () => {
    const [posts, setposts] = useState([]);
    const [editid, seteditid] = useState(null);
    
    const title = useRef();
    const excerpt = useRef();

    const formsubmit = async(e) => {
        e.preventDefault();
        const formobj = {
            title : title.current.value,
            excerpt : excerpt.current.value,
        }
        // Update Data
        if (editid) {
            const resp = await axios.put(`https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost/${editid}`, formobj);
            const updatedata = posts.map((item) => {
                if(editid == item.id) {
                    return resp.data;
                }
                return item;
            });
            setposts(updatedata);
            seteditid(null);
        } else {
    const respdata = await axios.post(
        "https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost",
        formobj
    );

    setposts([...posts, respdata.data]);
        }
        // Clear Result
        title.current.value = "";
        excerpt.current.value = "";
    }
    const deletedata = async(id) => {
        try {
            await axios.delete(`https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost/${id}`);
            const deleteuserdata = posts.filter((item) => {
                return item.id !== id;
            })
            setposts(deleteuserdata);
        } catch(error) {
            console.log("Error :", error);
        }
    }

    const editdata = (item) => {
        title.current.value = item.title;
        excerpt.current.value = item.excerpt;
        seteditid(item.id);
    }


    // Read Data
    useEffect(() => {
        const postApi = async() => {
            try {
                const resp = await axios.get("https://6a1cf58fbcc4f20d5ca3bbde.mockapi.io/blogpost");
                setposts(resp.data);
            } catch(error) {
                console.log("Error :", error);
            }
        }
        postApi();
    }, [])

  return <>
    <form onSubmit={formsubmit} className='post-form'>
        <div>
            <label htmlFor="title">Post Title</label>
            <input type="text" name="title" id="title" ref={title} />
        </div>
        <div>
            <label htmlFor="excerpt">Post Excerpt</label>
            <textarea name="excerpt" id="excerpt" cols="30" rows="10" ref={excerpt}></textarea>
        </div>
        <div>
            <input type="submit" value={editid !== null ? 'Update Post' : 'Add Post' } />
        </div>
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

export default FormTwo