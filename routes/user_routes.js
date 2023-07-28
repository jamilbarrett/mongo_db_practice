const router = require('express').Router();
const { User } = require('../models');

// Register User
router.post('/register', async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.json(user)

    } catch (error) {
        console.log(error)
        res.status(401).send({
            message: error.message.split(':')[2]
        })
    }
});


//   Login User

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        }).populate('favorites')


        if (!user) throw new Error('No user found with that username')
        const valid = await user.validatePass(req.body.password)

        if(!valid) throw new Error('Your password incorrect')

        res.json(user)
    } catch (err) {

        res.status(401).send({
            message: err.message.split(':')[2].trim()
        })

    }
})

// Favorite a planet
router.put('/user/favorite', async (req, res) => {
    try {
        const { user_id, planet_id } = req.body;

        const user = await User.findByIdAndUpdate(
            user_id,
            { $push: { favorites: planet_id } },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        // In case of an error, handle it gracefully and respond with an error
        res.status(500).json({ error: 'Unable to update user favorites' });
    }
});

module.exports = router;






module.exports = router;