import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../configuration.js';
import { user } from '../db.js';
import { middleware } from '../middleware.js';
import { accounts } from '../db.js';

const userRouter = express.Router(); 

// Validation Schemas
const Signup = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
});

const Signin = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

const Update = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
});

// Signup Route
userRouter.post('/signup', async (req, res) => {
    const body = Signup.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ message: 'Invalid inputs' });
    }

    const existingUser = await user.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(409).json({ message: 'Email already taken' });
    }


   
    const newUser = await user.create({
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password, 
    });
   
   
   
    const userId=newUser._id;
    const newAccount=await accounts.create({
        userId:userId,
        balance:Math.random(1,10000)*10000
    })

    const token = jwt.sign(
        {
            userId: userId,
        },
        JWT_SECRET
    );

    res.status(201).json({
        message: 'User created successfully',
        token: token,
    });
});

// Signin Route
userRouter.post('/signin', async (req, res) => {
    const load = Signin.safeParse(req.body);
    if (!load.success) {
        return res.status(400).json({ message: 'Invalid login inputs' });
    }

    const foundUser = await user.findOne({
        username: req.body.username,
        password: req.body.password, 
    });

    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
        {
            userId: foundUser._id,
        },
        JWT_SECRET
    );

    res.json({
        token: token,
    });
});

// Update Route
userRouter.put('/update', middleware, async (req, res) => {
    const load = Update.safeParse(req.body);
    if (!load.success) {
        return res.status(400).json({ message: 'Invalid update inputs' });
    }

    try {
        const result = await user.updateOne(
            { _id: req.userId }, 
            { $set: req.body }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'Updated successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error while updating user' });
    }
});
//bulk route 
userRouter.get("/bulk",async (req,res)=>{
    const check=req.query.filter||" ";
    try{const users=await user.find({
        $or:[
            {firstname:{$regex:`^${check}`,$options:"i"}},
            {lastname:{$regex:`^${check}`,$options:"i"}}
        ]
    })
    
    return res.status(200).json({
        user:users.map(user=>({
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname,
        _id:user._id



    }))})

}
catch(err){
    res.status(400).json({err});
}


})

export { userRouter };
