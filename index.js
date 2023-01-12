const express = require('express');
const cors = require('cors');
const connectToMongo = require('./Database/Db');

const http = require('http');
const fs = require('fs');

const multer = require('multer');
const csv = require('fast-csv');


const upload = multer({ dest: "temp/csv" })

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
connectToMongo();
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/teacher', require('./Routes/Teacher'));

app.use('/api/student', require('./Routes/Student'));

app.use('/api/course', require('./Routes/Course'))

// app.use('/upload_csv', require('./Routes/upload'));

app.listen(port, () => console.log(`Server running on port ${port} with url http://localhost:${port}`));
