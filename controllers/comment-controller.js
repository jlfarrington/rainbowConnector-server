const express = require('express');
const validateSession = require('../middleware/validateSession');
const validateAdmin = require('../middleware/validateAdmin')
const router = express.Router();
const Comment = require('../db');

// CREATE COMMENT

router.post('/post/:rainbowid', validateSession, function(req, res) {
    Comment.create({
        body: req.body.comment.body,
        likes: req.body.comment.likes,
        rainbowId: req.params.rainbowid,
        userId: req.user.id
    })
        .then(
            function createSuccess(comment) {
                res.status(200).json({
                    comment: comment,
                    message: 'comment posted successfully'
                });
            }
        ) .catch(err => res.status(500).json({ error: err }))
})

// GET COMMENTS (ALL) *PROTECTED ADMIN ROUTE*

router.get('/all', validateAdmin, function(req, res){
    Comment.findAll()
        .then((users) => res.status(200).json(users))
        .catch(err => res.status(500).json({error: err}))
});

// UPDATE A COMMENT

router.put('/:id', validateSession, function(req, res) {
    const updateComment = {
        body: req.body.comment.body,
        likes: req.body.comment.likes
    };

    const query = { where: { id: req.params.id }}

    Comment.update(updateComment, query)
        .then(recordsChanged => res.status(200).json({message: `${recordsChanged} record(s) changed`}))
        .catch(err => res.status(500).json({ error: err }))
});


// GET COMMENTS BY RAINBOW ID
router.get('/:rainbowid', validateSession, function(req, res) {
    Comment.findAll({
        where: {
            rainbowId: req.params.rainbowid
        }
    })
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(500).json({ error: err }))
});

// DELETE COMMENT *PROTECTED ADMIN ROUTE*
router.delete('/:id', validateAdmin, function(req, res) {
    const query = { where: { id: req.params.id }};
    Comment.destroy(query)
        .then((recordsChanged) => res.status(200).json({
            message: `${recordsChanged} record(s) changed.`}),
            (err) => res.status(500).json({ error: err, message: 'delete failed'}))
        });


module.exports = router;