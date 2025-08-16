import User from "../Models/Users.js";

export const CreateUser = async (req, res) => {
    try {
        const {firstname, lastname, email} = req.body;
    
        if(!firstname || !lastname || !email){
            return res.status(400).json({
                message: "Please provide all the required fields"
            })
        }
    
        const newUser = await User.create({
            firstname,
            lastname,
            email
        })
        res.status(200).json(newUser);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "Server Error"});
    }
} 

// Get all users
export const GetUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
export const GetUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
export const UpdateUser = async (req, res) => {
    try {
        // If email is in request, check if it's already used by someone else
        if (req.body.email) {
            const existingUser = await User.findOne({ email: req.body.email });
            if (existingUser && existingUser._id.toString() !== req.params.id) {
                return res.status(400).json({ message: "Email already in use" });
            }
        }

        // Update the user
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete user
export const DeleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
