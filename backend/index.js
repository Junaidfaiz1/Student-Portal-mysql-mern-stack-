import express, { query } from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({path: "../backend/config/config.env"})



const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})
db.connect((err, result) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log("Connected successfully to the MySQL database");
});

app.get("/", (req, res)=>{
    const query = "SELECT * FROM student";
    db.query(query, (err, result)=>{
        if(err) return res.json({message: "error inside the server"});
        return res.json({result});
    })
})

app.post("/add_Student",(req, res)=>{
    const query= "INSERT INTO student (name, email) VALUES (?)"
    const values = [req.body.name, req.body.email]
    db.query(query, [values], (err, result)=>{
        if(err) return res.status(500).json({
            message: "Server error",
            error: err
        })
        return res.status(200).json({
            result,
            message: "Data added successfull"
        })
    })
})

app.put("/update/:id", (req, res)=>{
    const id = req.params.id;
    const  query = "UPDATE student SET name = ?, email= ? where id = ?"
    
    db.query(query, [req.body.name, req.body.email, id], (err, result)=>{
        if(err) return res.status(500).json({
            message: "Server error",
            error: err
        })
        return res.status(200).json({
            result,
            message: "Data added successfull"
        })
    } )
})

app.delete("/delete/:id", (req, res)=>{
    const id = req.params.id;
    const  query = "DELETE FROM student WHERE id = ?"
    db.query(query, [id], (err, result)=>{
        if(err) return res.status(500).json({
            message: "Server error",
            error: err
        })
        return res.status(200).json({
            result,
            message: "Data added successfull"
        })
    } )
})

app.get("/read/:id",(req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM student where id = ?"
    db.query(query, [id], (err, result)=>{
        if(err) return res.status(500).json({
            message: "Server error",
            error: err
        })
        return res.status(200).json({
            result,
            message: "Data added successfull"
        })
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`port is running on ${process.env.PORT}`)
})