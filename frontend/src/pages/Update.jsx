import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const Update = ()  => {
    const [book, setBooks] = useState({
        title: "",
        desc: "",
        price: null,
        cover: "",
    });

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBooks(prev => ({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e => {
        e.preventDefault()

        try{
            await axios.put("http://localhost:8800/books/" + bookId, book);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    };

    console.log(book);

    return (
        <div className='form'>
            <h1>Update the book</h1>
            <input type = "text" placeholder = 'Title' onChange={handleChange} name = "title"/>
            <input type = "text" placeholder = 'Description' onChange={handleChange} name = "desc"/>
            <input type = "number" placeholder = 'Price' onChange={handleChange} name = "price"/>
            <input type = "text" placeholder = 'Cover' onChange={handleChange} name = "cover"/>
            <button className = 'update_save_button' onClick={handleClick}>Update</button>
        </div>
    )
}

export default Update