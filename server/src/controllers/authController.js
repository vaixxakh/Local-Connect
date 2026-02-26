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
        const { name, email, password, phone, registrationPurpose } = req.body;

            if(!name || !phone || !email || !password || !registrationPurpose){
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
                name, 
                phone,
                email, 
                password: hashedPasword,
                registrationPurpose,
            });

            res.status(201).json({
                success: true,
                token: generateToken(user._id),
                user: {
                    id: user._id,
                    name:user.name,
                    phone: user.phone,
                    email:user.email,
                    registrationPurpose: user.registrationPurpose,
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
                throw new Error("Invalid credentials!");
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                res.status(401);
                throw new Error("Invalid credentials!");
            }
            res.json({
                success: true,
                message: "Login successful",
                token: generateToken(user._id),
                user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                registrationPurpose: user.registrationPurpose,
                },
            });
        })
