import bcrypt from "bcryptjs"

export default [
  {
    "_id": "6273a0733d3f7b2af9320b24",
    "email": "example@gmail.com",
    "name": "Sandbox",
    "username": "sandbox",
    "password": bcrypt.hashSync('123456', 10),
    "picture": 'http://localhost:3000/img/avatars/JD.png'
  }
]