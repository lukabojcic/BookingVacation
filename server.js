// npm i express express-validator bcryptjs config gravatar jsonwebtoken mongoose request  
//npm i -D nodemon concurrently
//cd client npm i axios react-router-dom redux react-redux redux-thunk redux-devtools-extension moment react-moment uuidc
const connectDB = require('./config/db');
const path = require('path');
const express = require ("express");
const app = express();

//DB
connectDB();

//Body parser
app.use(express.json( {extended: false }));

app.get('/', (req, res) => res.send('API Running'));

//Routers
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/vacations', require('./routes/api/vacations'));
app.use('/api/calendar', require('./Controllers/CalendarController'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));