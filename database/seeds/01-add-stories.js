
exports.seed = function(knex) {
  //Deletes ALL existing entries
  return knex('stories').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('stories').insert([
        {title: 'A trip to Kiney Lake', date_trip: '15-5-2018', date_posting: '15-5-2018', story: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'},
        {title: 'The best locations in France', date_trip: '12-6-2018', date_posting: '12-6-2018', story: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'},
        {title: 'A stary night in the canyon', date_trip: '12-8-2018', date_posting: '12-8-2018', story: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'},
        {title: 'The best lake in the World Lake Brienz', date_trip: '12-7-2018', date_posting: '12-7-2018', story: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'},
        {title: 'A day at the horshoe-bend', date_trip: '15-8-2018', date_posting: '15-8-2018', story: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.'}
      ]);
    });
};
