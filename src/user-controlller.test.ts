import request from 'supertest';

const baseUrl = `https://localhost:${process.env.PORT}`;

describe('CRUD API 1', () => {
    it('should return empty array for GET api/users', async () => {
        const response = await request(baseUrl)
            .get('users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe([]);
    });
});
