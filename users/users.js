import express from 'express'
import CheckIdToken from './auth.js';
import "dotenv/config";
import {QueryNChannelsWithOffset, QueryDB, AddUserWithUserName} from './database.js'
import {CreateNewUser, LogInUser} from './firebase.js'

const app = express();
app.use(CheckIdToken)
app.listen(process.env.PORT, ()=>console.log('listening on port', process.env.PORT))