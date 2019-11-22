const request = require('supertest')
// const Stories = require('../database/helpers/journalModel')
const app = require('./server')
// const db = require('../database/config')

// beforeEach(async () => {
//     await db('stories').truncate()
//  })
//  beforeEach(async () => {
//     await db('locations').truncate()
//  })
//  beforeEach(async () => {
//     await db('photos').truncate()
//  })
//  beforeEach(async () => {
//     await db('locations_stories').truncate()
//  })

const userData = {
    "title": "Dummy 5",
    "date_trip": "12-3-1334",
    "story": "morewww Lorem Ipsum",
    "city": "Manchester",
    "country": "England",
    "photo_url": "https://i.imgur.com/15EKXog.jpg",
    "description": "test photo 13456"
};

describe('Server [GET /api]', () => {
    it('should return status code 200 if the server is running', async () => {
      const { statusCode } = await request(app).get('/');
      expect(statusCode).toEqual(200);
    });
});

describe('Get Stories Endpoint', () => {
    test('should get all stories', async () => {
        const { statusCode, body } = await request(app).get('/api/stories')
        expect(statusCode).toBe(200)
        expect(body).toBeDefined()
      })
  });

  describe('Get stories by id', () => {
    it('should get story by id', async () => {
        const response = await request(app)
          .get(`/api/stories/${1}`)
          expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
      });

  })

  describe('Test middleware', () => {
    it('should respond with status code 400 if user doesnt exists', async () => {
        const { statusCode } = await request(app)
        .get(`/api/stories/${7}`)
        expect(statusCode).toEqual(400);
    });
  })

  describe('POST', () => {
    it('should post story', async () => {
        const response = await request(app)
          .post(`/api/stories/`)
          .send(userData)
          expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
  })
})

describe('PUT', () => {
    it('should update story', async () => {
        const response = await request(app)
          .put(`/api/stories/${2}`)
          .send(userData)
          expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
  })
})