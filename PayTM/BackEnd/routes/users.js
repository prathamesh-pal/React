import express from 'express';

import * as z from "zod";

import User from '../models/User.js';

import dotenv from "dotenv";

import jwt from 'jsonwebtoken'

dotenv.config();


const router = express.Router();


router.get("/", (req, res) => {
    res.send("Users Home")
});


const signupSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
  });

router.post("/signup", async (req, res) => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            errors: result.error.flatten()
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            massage: "Email already taken / incorrect input"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    const userid = user._id;

    const token = jwt.sign({
        userid
    }, (process.env.JWT_SECRET))

    res.json({
        message: "User created successfully",
        token: token
    })

})

const signinSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6)
})


router.post("/signin", async (req, res)=>{
    const valid  = signinSchema.safeParse(req.body);

    if(!valid.success){
        return res.status(400).json({
            errors: result.error.flatten()
        });
    }
    
    const user = await User.findOne({
        username: req.body.username ,
        password: req.body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET );
  
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({
        message: "Error while logging in"
    })

} )



export default router;