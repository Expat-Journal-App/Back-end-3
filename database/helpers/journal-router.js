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

module.exports = router;