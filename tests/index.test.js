const supertest  = require('supertest');
const faker = require('faker');
const app = require('../src/app');
const db = require('../src/database');

const request = supertest(app);


describe('Endpoints Test', () => {
    let idTmp;
    let nameTmp;
    let emailTmp;
    
    beforeAll(async () => {
        await db.sequelize.sync({ force: true });
    });

    it('GET health check', async () => {
        const res = await request.get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Server is live !');
    });

    it('POST health check', async () => {
        const res = await request.post('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Ok !');
    });

    it('POST new user data', async () => {
        const randomString = faker.random.alphaNumeric(10);
        const payload = {
            name: faker.random.alphaNumeric(10),
            email: `${randomString}@test.com`,
            password: faker.random.alphaNumeric(20)
        };
        const res = await request.post('/user').send(payload);
        
        idTmp = res.body.newUser.id;
        nameTmp = res.body.newUser.name;
        emailTmp = res.body.newUser.email;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('New user sign up');
        expect(typeof res.body.newUser).toBe('object');
    });

    it('GET all user data', async () => {
        const res = await request.get('/users');
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by id', async () => {
        const res = await request.get(`/users?id=${idTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by name', async () => {
        const res = await request.get(`/users?name=${nameTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by email', async () => {
        const res = await request.get(`/users?email=${emailTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by id and email', async () => {
        const res = await request.get(`/users?id=${idTmp}&email=${emailTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by id and name', async () => {
        const res = await request.get(`/users?id=${idTmp}&name=${nameTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by email and name', async () => {
        const res = await request.get(`/users?email=${emailTmp}&name=${nameTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('GET user data by id, email and name', async () => {
        const res = await request.get(`/users??id=${idTmp}&email=${emailTmp}&name=${nameTmp}`);
        
        expect(res.status).toBe(200);
        expect(typeof res.body.users).toBe('object');
    });

    it('PUT user data', async () => {
        const randomString = faker.random.alphaNumeric(10);
        const payload = {
            name: faker.random.alphaNumeric(10),
            email: `${randomString}@test.com`,
            password: faker.random.alphaNumeric(20)
        };
        const res = await request.put(`/user/${idTmp}`).send(payload);
        
        idTmp = res.body.updatedUser.id;
        nameTmp = res.body.updatedUser.name;
        emailTmp = res.body.updatedUser.email;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User updated');
        expect(typeof res.body.updatedUser).toBe('object');
    });

    it('DELETE user data', async () => {
        const res = await request.delete(`/user/${idTmp}`);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User deleted');
    });

    afterAll(async () => {
        await db.sequelize.close();
    });
});

