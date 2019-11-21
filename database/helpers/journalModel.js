const db = require('../config')

module.exports = {
    getStories,
    getStoryById,
    addStory,
    deleteStory,
    updateStory
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

function deleteStory(id) {
    return db("stories")
        .where({ id })
        .del()
        .then(data =>
        data
            ? "Story has been deleted"
            : `There was a problem deleting story ${id}`
        )
}

function getStories() {
    return db('locations_stories as ls')
    .join('locations as l', 'ls.location_id', 'l.id')
    .join('stories as s', 'ls.story_id', 's.id')
    .join('photos as p', 'p.story_id', 's.id')
    .select('s.id as story_id', 's.title as story_title', 's.date_trip as date_trip', 's.date_posting as date_posting', 's.story as story', 'l.city as city', 'l.country as country', 'p.photo_url as photo_url', 'p.description as photo_description')
    .orderBy('s.id')
}

// begin transaction;
// insert
// into stories (title, date_trip, date_posting, story)
// values('Test Title', '12-3-1234', '13-5-1990', 'Some Lorem Ipsum');
// insert
// into locations (city, country)
// values('Lagos', 'Nigeria');
// insert
// into photos (photo_url, description, story_id)
// values('https://i.imgur.com/15EKXog.jpg', 'test photo', 6);
// insert
// into locations_stories (story_id, location_id)
// values(6, 6);
// end;

function getDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today
}

function insertPhoto(story, storyId, t) {
    return db("photos").transacting(t).insert({
      photo_url: story.photo_url,
      description: story.description,
      story_id: storyId
    }, 'id');
  }
  function insertLocation(story, t) {
    return db("locations").transacting(t).insert({
      city: story.city,
      country: story.country
    }, 'id');
  }
  function insertLocationStory(storyId, locationId, t) {
    return db("locations_stories").transacting(t).insert({
      story_id: storyId,
      location_id: locationId
    }, 'id');
  }

function addStory(story) {
    return db.transaction(function(t) {
        return db('stories')
            .transacting(t)
            .insert({title: story.title, date_trip: story.date_trip, date_posting: getDate(), story: story.story}, 'id')
                .then(storyId => {
                    const newPhoto = insertPhoto(story, storyId[0], t)
                    const newLocation = insertLocation(story, t)
                    return Promise.all([newPhoto, newLocation])
                        .then(data => {
                            return insertLocationStory(storyId[0], data[1][0], t)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .then(t.commit)
                .catch(t.rollback)
    })
    .then((res) => {
        return getStoryById(res[0])
    })
    .catch((error) => {
        console.log(error)
    })
}



// begin transaction;
// update stories
// set title = 'Updated title', 
// date_trip = '12-2-1234',
// date_posting = '13-4-1235',
// story = 'Updated story'
// where id = 4;
// update locations
// set city = 'Tokyo', country = 'Japan'
// where id = 4;
// update photos
// set photo_url = 'https://i.imgur.com/O1j4R2k.jpg',
// description = 'some description',
// story_id = 4
// where id = 4;
// update locations_stories
// set story_id = 4, location_id = 4
// where id = 4;
// end;

// SELECT TOP 1 products.id FROM products WHERE products.id =

function updateLocationsStories(story_id, location_id, t) {
    return db("locations_stories").transacting(t)
        .where({ story_id: story_id })
        .update({ location_id: location_id })
        .then(res => {
            console.log(res)
        })
}

function updatePhoto(storyId, story, t) {
    return db("photos").transacting(t).where('photos.story_id', storyId).update({
      photo_url: story.photo_url,
      description: story.description,
    });
}

function updateLocation(res, story, storyId, t) {
        if (res.length === 0) {
        return db("locations").transacting(t).insert({
            city: story.city,
            country: story.country
            })
            .then(res2 => {
                console.log(res2)
                updateLocationsStories(storyId, res2[0], t)
            }) 
        } else {
            const check = res[0].id
            updateLocationsStories(storyId, check, t)
    }
}

function checkLocation(storyId, story, t) {
    return db("locations").transacting(t)
    .select('locations.id')
    .where('locations.city', story.city)
    .then(res => {
        console.log(res)
        return updateLocation(res, story, storyId, t)
    })
    .catch(err => {
        console.log(err)
    })
}

function updateStory(id, story){
    return db.transaction(function (t) {
        return db('stories')
        .transacting(t)
        .where({id})
        .update({title: story.title, date_trip: story.date_trip, date_posting: getDate(), story: story.story})
            .then(() => {
                const newPhoto = updatePhoto(id, story, t)
                const newLocation = checkLocation(id, story, t)
                return Promise.all([newPhoto, newLocation])
                    .then(data => {
                        console.log(data)
                        return data
                    })
            })
            .then(t.commit)
            .catch(t.rollback)
    })
    .then((res) => {
        console.log(res)
        return getStoryById(id)
    })
    .catch((error) => {
        console.log(error)
    })
}


function getStoryById(storyId) {
    return db('locations_stories as ls')
    .join('locations as l', 'ls.location_id', 'l.id')
    .join('stories as s', 'ls.story_id', 's.id')
    .join('photos as p', 'p.story_id', 's.id')
    .select('s.id as story_id', 's.title as story_title', 's.date_trip as date_trip', 's.date_posting as date_posting', 's.story as story', 'l.city as city', 'l.country as country', 'p.photo_url as photo_url', 'p.description as photo_description')
    .orderBy('s.id')
    .where('s.id', storyId)
    .first()
}

