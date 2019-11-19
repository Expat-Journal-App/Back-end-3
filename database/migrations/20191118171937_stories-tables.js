
exports.up = function(knex) {
  return knex.schema
    .createTable('stories', function(stories) {
        stories.increments()
        stories
            .string('title')
            .notNullable()
        stories
            .string('date_trip')
            .notNullable()
        stories
            .text('date_posting')
            .notNullable()
        stories
            .text('story')
            .notNullable()
    })
    .createTable('locations', function(locations) {
        locations.increments()
        locations
            .string('city')
            .notNullable()
        locations
            .string('country')
            .notNullable()
    })
    .createTable('locations_stories', function(locations_stories) {
        locations_stories.increments()
        locations_stories
            .integer('story_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('stories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        locations_stories
            .integer('location_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('locations')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
    })
    .createTable('photos', function(photos) {
        photos.increments()
        photos
            .string('photo_url')
            .notNullable()
        photos
            .string('description')
            .notNullable()
        photos
            .integer('story_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('stories')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('photos')
    .dropTableIfExists('locations_stories')
    .dropTableIfExists('locations')
    .dropTableIfExists('stories')
};
