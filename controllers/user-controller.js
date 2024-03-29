const sequelize = require('../db')
const User = sequelize.models.User;
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const validateAdmin = require('../middleware/validateAdmin')

// USER SIGN UP

router.post('/register', function(req, res) {
    User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: bycrypt.hashSync(req.body.user.password, 13),
        isAdmin: req.body.user.isAdmin
    }).then(function createSuccess(user) {
        let token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
        res.status(200).json({
                    user: user,
                    message: 'User created successfully. Enjoy the rainbows!',
                    token: token
                });
            }
        )
        .catch(err => res.status(500).json({ error: err }))
})

// USER LOGIN

router.post('/login', function(req, res) {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    }) .then(function loginSuccess(user) {
        if (user) {
            bycrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                        res.status(200).json({
                            user: user,
                            message: 'User logged in, enjoy the rainbows!',
                            token: token
                        })
                } else {
                    res.status(502).send({ error: 'login failed'});
                }
            });
        } else {
            res.status(500).json({ error: err })
        }
    }) .catch(err => res.status(500).json({ error: err }))
});


// GET USER INFO (ALL) *PROTECTED ADMIN ROUTE*

router.get('/userinfo', validateAdmin, function(req, res){
    User.findAll()
        .then((users) => res.status(200).json(users))
        .catch(err => res.status(500).json({error: err}))
});

// UPDATE A USER *PROTECTED ADMIN ROUTE* - PROMOTE USER TO ADMIN
router.put('/update/:id', validateAdmin, function(req, res){
    const updateUser = {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: req.body.user.password,
        isAdmin: req.body.user.isAdmin
    }

    const query = { where: { id: req.params.id }};

    User.update(updateUser, query)
        .then(recordsChanged => res.status(200).json({message: `${recordsChanged} records changed.`}))
        .catch(err => res.status(500).json({ error: err }));
})


// DELETE A USER *PROTECTED ADMIN ROUTE*

router.delete('/delete/:id', validateAdmin, function(req, res) {
    const query = { where: { id: req.params.id }};
    User.destroy(query)
        .then((recordsChanged) => res.status(200).json({
            message: `${recordsChanged} records changed.`}),
            (err) => res.status(500).json({ error: err, message: 'delete failed'}))
        });


module.exports = router;