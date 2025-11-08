import User from "../models/User.js";
import jwt from 'jsonwebtoken';
// import getDataUri from "../utils/datauri.ts";
// import cloudinary from "../utils/cloudinary.ts";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js";
// register route

export const register = async (req, res) => {
    const { name, password, role } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo= cloudResponse.secure_url;
    // check missing credentials.
    if (!name || !password || !role) {
        return res.status(401).json({
            "message": "Missing credentials!!"
        })
    }
    // check user is already registered or not
    const registeredUser = await User.findOne({ name });
    if (registeredUser) {
        return res.status(404).json({
            "message": "You have already registered.."
        })
    }
    // if not then we need to create newUser.
    const newUser = await User.create({
        name,
        password,
        role,
        profile_picture:logo
    })
    newUser.save();
    return res.status(201).json({
        "message": "Successfully Registered!!",
        newUser
    })
}

// login route

export const login = async (req, res) => {
    const { name, password, role } = req.body;
    console.log("name", name);
    console.log("password", password);
    console.log("role", role);
    if (!name || !password || !role) {
        return res.status(401).json({
            "message": "Missing credentials!!"
        })
    }
    const registeredUser = await User.findOne({ name });
    console.log("registeredUser-> ", registeredUser)
    // in case unknown user / unregistered user if try to logged in.
    if (!registeredUser) {
        return res.status(401).json({
            "message": "Sorry You need to register First"
        })
    }
    // in case if registered user 
    else {
        // check for password and role match
        let checkpassword = JSON.stringify(password.toLowerCase()) === JSON.stringify((registeredUser.password).toLowerCase());
        console.log("checkpassword", checkpassword);
        if (!checkpassword) {
            return res.status(401).json({
                "message": "Sorry Your password is incorrect"
            })
        }
        else {
            // if password is correct then check for role.
            let checkrole = JSON.stringify(role) === JSON.stringify(registeredUser.role);
            console.log("checkrole", checkrole)
            if (!checkrole) {
                return res.status(401).json({
                    "message": "Sorry you have not registered with this role."
                })
            }
            else {
                let token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                console.log("token", token);
                return res.status(201).cookie('token', token).json({
                    "message": "Logged in Successfully!!",
                    registeredUser
                })
            }
        }
    }
}

// logout route

export const logout = async (req, res) => {
    // at this place with the help of cookie we will check whether user is logged in or not at later stage.
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            "message": "Sorry You need to login first!!"
        })
    }
    return res.status(201).cookie('token', '').json({
        "message": "Logged out Successfully!!"
    })
}

// update profile

export const update = async (req, res) => {
    const userId = req.params.id;
    const { name, password } = req.body;
    const file=req?.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo= cloudResponse.secure_url;
    // first check user is logged in or not using jwt we will write at later stage.
    const usertobeUpdated = await User.findByIdAndUpdate(userId, {
        name,
        password,
        profile_picture:logo

    }, { new: true })
    if (!usertobeUpdated) {
        return res.status(401).json({
            "message": "Sorry No record find with this name."
        })
    }
    return res.status(201).json({
        "message": "User updated Successfully!!",
        usertobeUpdated
    })

}