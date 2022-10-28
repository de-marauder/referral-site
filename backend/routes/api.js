const router = require('express').Router();
const axios = require('axios');

const User = require('../models/User');

router.get('/', async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json({
            users
        })
    } catch (e) {
        console.log(`Could not fetch users.\n${e.message}`)
        res.status(403).json({
            error: `Could not fetch users.\n${e.message}`
        })

    }

})

router.post('/', async (req, res) => {

    const { referrer } = req.query;
    const user = {
        ...req.body,
        referrer: referrer ? referrer : null
    };

    const newUser = new User(user);

    // Check if user exists using emails which should ideally be unique
    try {
        const usersEmails = (await User.find()).map((user) => user.email)

        if (usersEmails.includes(newUser.email)) {
            res.status(403).json({ error: "User already exists" })
            return;
        }
    } catch (e) {
        console.log(`Authentication failed. Could not read database ${e.message}`)
        res.status(403).json({
            error: `Authentication failed. Could not read database ${e.message}`
        })
        return;
    }

    // Save user
    try {
        var referred = await newUser.save();

        var result = {
            user: newUser,
            // referrer: referrer,
        }

    } catch (e) {
        console.log(`ERROR: Could not read Database.\n${e.message}`)
        res.status(403).json({
            error: `Could not read Database.\n${e.message}`
        })
        return;
    }

    // Update referrer
    if (referrer) {
        try {
            console.log(`${process.env.APP_URL}/api`);
            await axios.put(`${process.env.APP_URL}/api`, { referrer: referrer, referred: referred })

        } catch (e) {
            console.log(`ERROR: Could not PUT referrer.\n${e.message}`)
            res.status(403).json({
                error: `Could not PUT referrer.\n${e.message}`
            })
            return;
        }

    }
    res.status(200).json(result)

})

router.put('/', async (req, res) => {

    console.log("PUT hit")
    const userID = req.body.referrer;
    const referred = req.body.referred;

    try {


        let referrerUser = await User.findById(userID);
        referrerUser = await User.findByIdAndUpdate(userID,
            {
                referralCount: referrerUser?.referralCount + 1,
                referred: [...referrerUser?.referred, referred]
            });

        console.log(referrerUser);

        result = {
            referrerUser,
        }

        res.status(200).json(result)
    } catch (e) {
        console.log("An error occured while trying to PUT. ", err)
        res.status(403).json({ error: `An error occured while tryin gto PUT. ${err}` })
    }
    console.log("PUT ends")
})



module.exports = router