import mysql2 from "mysql2"
import databaseConfig from '../config/database.js'

export class databaseController{

  constructor(){
    this.connection = mysql2.createConnection(databaseConfig)
    this.connection.connect((err)=>{
      if (err) throw err
      console.log('Connected!')
    })
  }
  async QueryDB(queryText){
    try {
      const [results, fields] = await this.connection.promise().query(queryText)
      return [results, fields];
    } catch (err) {
      console.log(err);
      return ["error",err]
    }
  }
}
