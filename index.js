import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

let myUserName = process.env.name

console.log("value: ",myUserName)
console.log("start of an backk project");
