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

router.post('/stories', (req, res) => {
    const newStory = req.body;
    Stories.addStory(newStory)
        .then(story => {
            res.status(200).json(story)
        })
        .catch(() => {
            res.status(500)
        })
})

router.put('/stories/:id', validateStoryId, (req, res, next) => {
    Stories.updateStory(req.stories.story_id, req.body)
        .then(story => {
            res.status(200).json(story)
        })
        .catch(next)
})

router.delete('/stories/:id', [validateStoryId], (req, res, next) => {
    Stories.deleteStory(req.stories.story_id)
    .then(() => {
        res.status(200).json({message: 'story has been deleted'})
    })
    .catch(next)
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

router.use((error, req, res) => {
    res.status(500).json({
        file: 'userRouter',
        method: 'req.method',
        url: req.url,
        message: error.message
    })
})

module.exports = router;