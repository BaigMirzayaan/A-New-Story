import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = ()  => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () =>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    }, [])

    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:8800/books/" + id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <h1 className='library_name'>THOMAS FISHER RARE BOOK LIBRARY</h1>
            <div className = 'books'>{
                books.map(book =>(
                    <div key = {book.id} className='book'>
                        {book.cover && <img src = {book.cover} alt = ""/>}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className = 'delete_button' onClick={() => handleDelete(book.id)}>Delete</button>
                        <button className = 'update_button'><Link to = {`./update/${book.id}`}>Update</Link></button>
                    </div>
                ))
            }
            </div>
            <button className = "add_button"><Link to = {`./add`}>Add a book</Link></button>
        </div>
    )
}

export default Books