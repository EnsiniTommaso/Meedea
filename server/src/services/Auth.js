import { jwtDecode } from "jwt-decode";
import express from 'express'

async function CheckIdToken(token){
    
    const decoded =  jwtDecode(token);

    console.log(decoded)
}

export {CheckIdToken}
