import express from 'express';
import { middleware } from '../middleware.js';
import { accounts } from '../db.js';
import mongoose from 'mongoose';

const accountRouter = express.Router();

accountRouter.get('/balance', middleware, async (req, res) => {
    const user = req.userId;
    const found = await accounts.findOne({ userId: user });
    if (!found) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ balance: found.balance });
});

accountRouter.post('/transfer', middleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const toGiven = req.body.to;
        const amount = req.body.amount;

        const Account = await accounts.findOne({ userId: req.userId }).session(session);
        if (!Account || Account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Insufficient balance or account not found' });
        }

        const toAccount = await accounts.findOne({ userId: toGiven }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: 'Recipient account not found' });
        }

        await accounts.findOneAndUpdate(
            { userId: req.userId },
            { $set: { balance: Account.balance - amount } },
            { session }
        );

        await accounts.findOneAndUpdate(
            { userId: toGiven },
            { $set: { balance: toAccount.balance + amount } },
            { session }
        );

        await session.commitTransaction();
        res.status(200).json({ message: 'Transfer successful' });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ message: 'Transfer failed', error: err.message });
    } finally {
        session.endSession();
    }
});

export { accountRouter };
