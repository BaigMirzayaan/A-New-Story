import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: 'mysql-16ba2c6-a-new-story-db.g.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_OvX3_Rb5bdOGmU6VwfZ',
    database: 'defaultdb',
    port: 21051,
    connectTimeout: 10000 
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Hello, this is the backend()");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    console.log("Request Body: ", req.body); // Log the request body
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            console.error("Error: ", err); // Log any errors
            return res.json(err);
        }
        return res.json("Book has been created");
    });
});

app.delete("/books/:id", (req, res) =>{
    const bookId = req.params.id;
    console.log(bookId);
    
    const q = "DELETE FROM books WHERE id = (?)";

    db.query(q, [bookId], (err, data) => {
        if (err) {
            console.error("Error: ", err); // Log any errors
            return res.json(err);
        }
        return res.json("Book has been deleted");
    });
});

app.put("/books/:id", (req, res) =>{
    const bookId = req.params.id;
    console.log(bookId);
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    db.query(q, [...values, bookId], (err, data) => {
        if (err) {
            console.error("Error: ", err); // Log any errors
            return res.json(err);
        }
        return res.json("Book has been Updated");
    });
});

app.listen(process.env.PORT || 8800, () => {
    console.log("Connected to backend()");
});
