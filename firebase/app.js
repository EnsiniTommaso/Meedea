import express from 'express'
import "dotenv/config";
import {CreateNewUser, LogInUser} from './firebase.js'

const app = express();

app.listen(process.env.PORT, ()=>console.log('listening on port', process.env.PORT))