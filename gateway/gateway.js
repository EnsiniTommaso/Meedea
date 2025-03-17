import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Importa il middleware cors
import axios from "axios";
import "dotenv/config";

//istanziazione del microframework express
const app = express();
const nip = "0.0.0.0";

app.use(cors()); // Utilizza il middleware cors
/*Js non rispecchia criteri di sicurezza quindi molti servizi richiedono
una garanzia per gestire chiamate limitate in numero - ruolo di cors*/

console.log('mode:', process.env.MODE);

app.get('/', async (res, req)=>{
  axios.get()
})
app.listen(process.env.PORT, nip, () => {
  console.log(`Gateway running at port ${process.env.PORT}`);
});
