const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.registerUser = async function(req, res) {

    const { name, password } = req.body;  // input data nikale.

    try {
        let user = await adminModel.findOne({name});  // check pehle se to ni hai.
        if (user) {                            // If already registered then return.
            return res.status(400).send('Admin already exists');
        }

        let salt = await bcrypt.genSalt(10);  // SALT AND HASHING FOR ENCRYPTION.
        let hashedPassword = await bcrypt.hash(password, salt);

        admin = await adminModel.create({     // Create new User with hashed password.
            name,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Admin Created Successfully!"});
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

module.exports.loginUser = async function(req, res) {
    const { name, password } = req.body;

    try {

        let admin = await adminModel.findOne({ name });

        if (!admin) {
            return res.status(500).send("Name or Password Incorrect");
        }
        let isMatching = await bcrypt.compare(password, admin.password);
        if (!isMatching) return res.status(500).send("Name or Password Incorrect");

        let token =  jwt.sign({ id: admin._id, name: admin.name }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token, admin: { name: admin.name }});
    } catch (error) {
        console.log("error : " + error)
        res.status(500).send('Server Error');
    }

};