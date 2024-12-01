const User = require("../models/User"); // Adjust the path as needed

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log('user already registered')
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password,
            pic,
        });
        // const user = {"name" : "name"}
        console.log(`${user.name} registered`);

        if (user) {
            res.status(201).json({ message : `${user.name} registered successfully`});
        } 
        else {
            console.log(error.message)
            res.status(400).json({ message: "Failed to create the user" });
        }
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.query;
    console.log(email, " ", password)

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (user && user.password === password) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                isAdmin: user.isAdmin,
            });
            console.log(`${user.name} logged in`)
        } 
        else if (user.password !== password) {
            console.log('check password')
            res.status(401).json({ message : "Incorrect password"})
        }
        else {
            console.log('user not found')
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.find({ email })
        
        console.log(`${user.name} found`)
        if (user) {
            res.status(200).json({
                _id : user.id,
                name : user.name,
                email : user.email,
                pic : user.pic,
                isAdmin : user.isAdmin
            })
        }
        else {
            res.status(401).json({ message : 'Invalid email' })
        }
        // res.status(200).json(user)
    } 
    catch (error) {
        console.log(error.message)
        res.status(500).json({ message : error.message})
    }
}

const getUsersByEmailSubstring = async (req, res) => {
    const search = req.query.searchTerm // Get the 'search' query parameter
    console.log(search)
    console.log(typeof search)
    try {
        const users = await User.find(
            { email: { $regex: search, $options: "i" } },
            { name: 1, pic: 1, email: 1, _id: 1, isAdmin : 1 } // Project specific fields and exclude _id
        );      
        console.log(users)  
        res.json(users); 
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message : error.message})
    }
}

module.exports = { registerUser, loginUser, getUser, getUsersByEmailSubstring, getAllUsers };
