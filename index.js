import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

let myUserName = process.env.name
let DB = process.env.database

console.log("value: ",myUserName)
console.log("Database",DB)
console.log("start of an backk project");
