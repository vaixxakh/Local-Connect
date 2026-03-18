    const User = require("../models/User");
    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken");
    const asyncHandler = require("express-async-handler");

    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || "7d",
        });
    };

    exports.registerUser = asyncHandler(async (req, res) => {

        const { fullName, email, password, phoneNumber, role } = req.body;

            if(!fullName || !phoneNumber || !email || !password || !role){
                res.status(400);
                throw new Error("All fields are required!");
            };

        const userExists = await User.findOne({ email });

            if(userExists) {
                res.status(400);
                throw new Error("User already exists")
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPasword = await bcrypt.hash(password, salt);

            const user = await User.create({
                fullName, 
                phoneNumber,
                email, 
                password: hashedPasword,
                role,
            });

            res.status(201).json({
                success: true,
                message: "Registration successful",
                token: generateToken(user._id),
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    phoneNumber: user.phoneNumber,
                    email:user.email,
                    role: user.role,
                },
            });
        });

        exports.loginUser = asyncHandler(async(req, res) => {
            
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400);
                throw new Error("Email and password are required");
            }
            
            const user = await User.findOne({ email });

            if(!user) {
                res.status(401);
                throw new Error("User not found!");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                res.status(401);
                throw new Error("Password not match!");
            }
            res.json({
                success: true,
                message: "Login successful",
                user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                },
                  token: generateToken(user._id),
            });
        })
