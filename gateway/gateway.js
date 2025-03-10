import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Importa il middleware cors
import axios from "axios";
import auth from "./auth.js";
import channels from "./channels.js";

//istanziazione del microframework express
const app = express();
const port = 3000;
const nip = "0.0.0.0";

app.use(cors()); // Utilizza il middleware cors
/*Js non rispecchia criteri di sicurezza quindi molti servizi richiedono
una garanzia per gestire chiamate limitate in numero - ruolo di cors*/
app.use(auth);
app.use(channels);




app.listen(process.env.PORT || port, process.env.IP || nip, () => {
  console.log(`Gateway running at http://localhost:${port}`);
});
