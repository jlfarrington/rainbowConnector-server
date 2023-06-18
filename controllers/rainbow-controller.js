const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validateSession');
const validateAdmin = require('../middleware/validateAdmin');
const Rainbow = require('../db');
const cloudinary = require('cloudinary');

// REPORT A RAINBOW

router.post('/report', validateSession, function(req, res) {
    Rainbow.create({
        image: req.body.rainbow.image,
        likes: req.body.rainbow.likes,
        lat: req.body.rainbow.lat,
        long: req.body.rainbow.long,
        userId: req.user.id
    })
        .then(
            function createSuccess(rainbow) {
                res.status(200).json({
                    rainbow: rainbow,
                    message: 'Rainbow reported successfully. FULL ON.'
                });
            }
        ) .catch(err => res.status(500).json({ error: err }))
})


// GET ALL RAINBOWS

router.get('/', validateSession, function(req, res) {
    Rainbow.findAll()
        .then(rainbows => res.status(200).json(rainbows))
        .catch(err => res.status(500).json({ error: err }))
});


// UPDATE A RAINBOW

router.put('/:id', validateSession, function(req, res){
    const updateRainbow = {
        image: req.body.rainbow.image,
        likes: req.body.rainbow.likes,
        lat: req.body.rainbow.lat,
        long: req.body.rainbow.long
    }

    const query = { where: { id: req.params.id }};

    Rainbow.update(updateRainbow, query)
        .then(recordsChanged => res.status(200).json({message: `${recordsChanged} records changed.`}))
        .catch(err => res.status(500).json({ error: err }));
})


// DELETE A RAINBOW
router.delete('/:id', validateAdmin, function(req, res) {
    const query = { where: { id: req.params.id }};
    Rainbow.destroy(query)
        .then((recordsChanged) => res.status(200).json({
            message: `${recordsChanged} record(s) changed.`}),
            (err) => res.status(500).json({ error: err, message: 'delete failed'}))
        });



// CLOUDINARY SIGN
router.get('/cloudsign', validateSession, async(req, res) => {
    try {
        const ts = Math.floor(new Date().getTime() / 1000).toString();
        
      
        const sig = cloudinary.utils.api_sign_request({
            timestamp: ts, upload_preset: 'euqfw3n3'},
            process.env.CLOUDINARY_SECRET
        )

        res.status(200).json({
            sig, ts
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to sign'
        })
    }
})



// GET RAINBOW BY ID

router.get('/:id', validateSession, function(req, res) {
    Rainbow.findOne({
        where: { id: req.params.id }
    })
        .then(rainbow => res.status(200).json(rainbow))
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;