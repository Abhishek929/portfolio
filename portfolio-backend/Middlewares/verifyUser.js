import Auth from "../Models/authModels.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const { username, email } = req.body;
        const user_name = await Auth.findOne({ username });
        const user_email = await Auth.findOne({ email });
        if (user_name) {
            return res.status(400).json({ message: "Username already exists" });
        } else if(user_email){
            return res.status(400).json({ message: "Email already exists" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default checkDuplicateUsernameOrEmail;
