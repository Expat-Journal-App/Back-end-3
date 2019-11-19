const express = require('express')
const Stories = require('./journalModel')

const router = express.Router()

router.get('/stories', (req, res) => {
    Stories.getStories()
        .then(stories => {
            res.json(stories)
        })
        .catch(err => {
            res.status(500).json({message: 'Failed to get stories' + err.message})
        })
})

router.get('/stories/:id', validateStoryId, (req, res) => {
    res.json(req.stories)
})

function validateStoryId(req, res, next) {
    const {id} = req.params
    Stories.getStoryById(id)
    .then(stories => {
        if (stories) {
            req.stories = stories;
            next()
        } else {
            res.status(400).json({message: "invalid stories ID"})
        }
    })
    .catch(error => {
       res.status(500).json({message: 'Something terrible happend while checking hub id: ' + error.message,})
   })
   }

module.exports = router;