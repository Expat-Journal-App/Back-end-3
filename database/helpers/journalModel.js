const db = require('../config')

module.exports = {
    getStories,
    getStoryById,
    addStory
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
    });
  }
  function insertLocation(story, t) {
    return db("locations").transacting(t).insert({
      city: story.city,
      country: story.country
    });
  }
  function insertLocationStory(storyId, locationId, t) {
    return db("locations_stories").transacting(t).insert({
      story_id: storyId,
      location_id: locationId
    });
  }

function addStory(story) {
    return db.transaction(function(t) {
        return db('stories')
            .transacting(t)
            .insert({title: story.title, date_trip: story.date_trip, date_posting: getDate(), story: story.story})
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
        console.log(res)
        return getStoryById(res[0])
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
}