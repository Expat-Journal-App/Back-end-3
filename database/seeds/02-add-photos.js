
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('photos').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {photo_url: 'https://i.imgur.com/O1j4R2k.jpg', description: 'image of a lake with mountains and trees', story_id: '1'},
        {photo_url: 'https://i.imgur.com/15EKXog.jpg', description: 'aerial shot of building', story_id: '2'},
        {photo_url: 'https://i.imgur.com/Nfcc4RQ.jpg', description: 'aerial shot of lake and forest', story_id: '3'},
        {photo_url: 'https://i.imgur.com/TAHdePL.jpg', description: 'a shot towards the stars in a canyon', story_id: '4'},
        {photo_url: 'https://i.imgur.com/9w6mxY6.jpg', description: 'image of a girl infront of horshoe-bend canyon', story_id: '5'}
      ]);
    });
};