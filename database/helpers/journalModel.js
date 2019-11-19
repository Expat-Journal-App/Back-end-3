const db = require('../config')

module.exports = {
    getStories,
    getStoryById
}

// select l.id as story_id,
// s.title as story_title,
// s.date_trip as date_trip,
// s.date_posting as date_posting,
// s.story as story,
// l.city as city,
// l.country as country,
// p.photo_url as photo_url,
// p.description as photo_description
// from locations_stories as ls
// join locations as l
// on ls.location_id = l.id
// join stories as s
// on ls.story_id = s.id
// join photos as p
// on p.story_id = s.id

function getStories() {
    return db('locations_stories as ls')
    .join('locations as l', 'ls.location_id', 'l.id')
    .join('stories as s', 'ls.story_id', 's.id')
    .join('photos as p', 'p.story_id', 's.id')
    .select('s.id as story_id', 's.title as story_title', 's.date_trip as date_trip', 's.date_posting as date_posting', 's.story as story', 'l.city as city', 'l.country as country', 'p.photo_url as photo_url', 'p.description as photo_description')
    .orderBy('s.id')
}

function getStoryById(storyId) {
    return db('locations_stories as ls')
    .join('locations as l', 'ls.location_id', 'l.id')
    .join('stories as s', 'ls.story_id', 's.id')
    .join('photos as p', 'p.story_id', 's.id')
    .select('s.id as story_id', 's.title as story_title', 's.date_trip as date_trip', 's.date_posting as date_posting', 's.story as story', 'l.city as city', 'l.country as country', 'p.photo_url as photo_url', 'p.description as photo_description')
    .orderBy('s.id')
    .where('s.id', storyId)
}