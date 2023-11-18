import bcrypt from "bcryptjs";
const users = [
    {
        name : "Admin User",
        email : "admin@gmail.com",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : true,
    },
    {
        name : "Lydia Chisom",
        email : "lych@gmail.com",
        password : bcrypt.hashSync("12345", 10),
        isAdmin : false,
    },
];

export default users;