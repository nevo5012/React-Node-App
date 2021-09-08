import express from 'express'
import cors from 'cors'
import './configs/database.js'


import membersController from './members/memberController.js'
import ordersController from './orders/orderController.js'
import userController from './users/userController.js'

require("dotenv").config();
let app = express()
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/health',(req, res) => {
    res.status(200).send('Ok');
  });
app.use('/api/members', membersController);
app.use('/api/orders', ordersController);
app.use('/api/users', userController);

app.listen(port);
console.log('Server is up on localhost, listening to port 8000');