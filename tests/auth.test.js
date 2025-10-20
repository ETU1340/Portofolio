const request = require('supertest');
const app = require('../src/app');
const db = require('./setup');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.closeDatabase();
});

afterEach(async () => {
    await db.clearDatabase();
});

describe('Auth endpoints', () => {
    test('Register and login flow', async () => {
        const user = { name: 'Test', email: 'test@example.com', password: 'Pass1234' };

        const resRegister = await request(app)
            .post('/api/auth/register')
            .send(user)
            .expect(201);

        expect(resRegister.body.success).toBe(true);
        expect(resRegister.body.data.user.email).toBe(user.email);
        expect(resRegister.body.data.token).toBeDefined();

        const resLogin = await request(app)
            .post('/api/auth/login')
            .send({ email: user.email, password: user.password })
            .expect(200);

        expect(resLogin.body.success).toBe(true);
        expect(resLogin.body.data.token).toBeDefined();
    });
});
