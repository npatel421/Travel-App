const app = require('../server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('test server', () => {
    it ('return body message from test url', async done => {
        const res =  await request.get('/test')
        expect(res.body.message).toBe('pass!');
        done();
    })
})
