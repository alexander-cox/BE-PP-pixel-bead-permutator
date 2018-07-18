process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest')(app);
const expect = require('chai').expect;

describe('API', () => {
    describe('ROUTE /api/users', () => {
        describe('GET /api/users', () => {
            it('returns an array with the correct length', () => {
                return request.get('/api/users')
                    .expect(200)
                    .then(({ body: users }) => {
                        expect(users).to.be.an('array');
                        expect(users.length).to.equal(2);
                    })
            });
            it('returns an array containing user objects with the correct properties', () => {
                return request.get('/api/users')
                    .expect(200)
                    .then(({ body: users }) => {
                        expect(users[0]).to.be.an('object');
                        expect(Object.keys(users[0]).length).to.equal(6);
                        expect(users[0].id).to.equal(1);
                        expect(users[0].username).to.equal('cockles');
                        expect(users[0].first_name).to.equal('Alex');
                        expect(users[0].last_name).to.equal('Cox');
                        expect(users[0].email).to.equal('alexander.cox@myemail.com');
                        expect(users[0].avatar_url).to.equal('https://pbs.twimg.com/profile_images/691705411939012609/YHZlX_97_400x400.jpg');
                        expect(users[1]).to.be.an('object');
                        expect(Object.keys(users[1]).length).to.equal(6);
                        expect(users[1].id).to.equal(2);
                        expect(users[1].username).to.equal('jsefton');
                        expect(users[1].first_name).to.equal('Jamie');
                        expect(users[1].last_name).to.equal('Sefton');
                        expect(users[1].email).to.equal('jamie.sefton@myemail.com');
                        expect(users[1].avatar_url).to.equal('https://pbs.twimg.com/profile_images/1011090533886889984/YaBHtvEp_400x400.jpg');
                    });
            });
        });
        describe('GET /api/users/:username', () => {
            it('returns a user object with correct user properties', () => {
                return request.get('/api/users/jsefton')
                    .expect(200)
                    .then(({ body: user }) => {
                        expect(user).to.be.an('object');
                        expect(user.id).to.equal(2);
                        expect(user.username).to.equal('jsefton');
                        expect(user.first_name).to.equal('Jamie');
                        expect(user.last_name).to.equal('Sefton');
                        expect(user.email).to.equal('jamie.sefton@myemail.com');
                        expect(user.avatar_url).to.equal('https://pbs.twimg.com/profile_images/1011090533886889984/YaBHtvEp_400x400.jpg');
                    });
            });
        });
        describe('GET /api/users/:user_id/favourites', () => {
            it('returns an array of favourite objects with the correct length', () => {
                return request.get('/api/users/1/favourites')
                    .expect(200)
                    .then(({ body: favourites }) => {
                        expect(favourites).to.be.an('array');
                        expect(favourites.length).to.equal(1);
                    });
            });
            it('returns an array with a favourite object with the correct properties', () => {
                return request.get('/api/users/1/favourites')
                    .expect(200)
                    .then(({ body: favourite }) => {
                        expect(favourite[0]).to.be.an('object');
                        expect(favourite[0].id).to.equal(1);
                        expect(favourite[0].solution_id).to.equal(1);
                        expect(favourite[0].title).to.equal('Snorlax');
                        expect(favourite[0].image_url).to.equal('https://pokemonrevolution.net/img/feature/snorlax.png');
                        expect(favourite[0].votes).to.equal(2);
                        expect(favourite[0].tags).to.equal('#snorlax#pokemon#sleepy');
                        expect(favourite[0].brand).to.equal('Hama');
                        expect(favourite[0].width_px).to.equal(60);
                        expect(favourite[0].height_px).to.equal(60);
                        expect(favourite[0].favourited).to.equal(3);
                    });
            });
        });
        describe('POST /api/users', () => {
            const newUserObj = {
                username: 'new_user',
                first_name: 'Joe',
                last_name: 'Bloggs',
                email: 'joe.bloggs@myemail.com',
                avatar_url: 'http://3.bp.blogspot.com/_2JjkZ1873XE/TC0A9pT1yjI/AAAAAAAAAJk/Da8dBVRoIZY/s1600/12.jpg'
            }
            it('returns back the same user object witht the expected properties', () => {
                return request.post('/api/users').send(newUserObj)
                .expect(201)
                .then(({body: user}) => {
                    expect(user).to.be.an('object');
                    expect(user.id).to.equal(3);
                    expect(user.username).to.equal(newUserObj.username);
                    expect(user.first_name).to.equal(newUserObj.first_name);
                    expect(user.last_name).to.equal(newUserObj.last_name);
                    expect(user.email).to.equal(newUserObj.email);
                    expect(user.avatar_url).to.equal(newUserObj.avatar_url);
                });
            });
        });
    });
    describe('ROUTE /api/beads', () => {
        describe('GET /api/beads', () => {
            it('returns expected array of beads', () => {
                return request.get('/api/beads')
                .expect(200)
                .then(({body: beads}) => {
                    expect(beads.length).to.equal(36);
                    expect(beads[0].id).to.equal(1);
                    expect(beads[0].colour_name).to.equal('White');
                    expect(beads[0].r).to.equal(236);
                    expect(beads[0].g).to.equal(237);
                    expect(beads[0].b).to.equal(237);
                    expect(beads[0].hex).to.equal('ECEDED');
                    expect(beads[0].style).to.equal('Standard');
                    expect(beads[0].transparent).to.equal(false);
                    expect(beads[0].size).to.equal('Medium');
                    expect(beads[0].brand).to.equal('Hama');
                    expect(beads[0].source_url).to.equal('https://www.hamabeads.com/shop-midi/midi-beads');
                    expect(beads[35].id).to.equal(36);
                    expect(beads[35].colour_name).to.equal('Brown');
                    expect(beads[35].r).to.equal(190);
                    expect(beads[35].g).to.equal(130);
                    expect(beads[35].b).to.equal(100);
                    expect(beads[35].hex).to.equal('BE8264');
                    expect(beads[35].style).to.equal('Standard');
                    expect(beads[35].transparent).to.equal(false);
                    expect(beads[35].size).to.equal('Medium');
                    expect(beads[35].brand).to.equal('Hama');
                    expect(beads[35].source_url).to.equal('https://www.hamabeads.com/shop-midi/midi-beads');
                });
            });
        });
        describe('GET /api/beads/:solution_id', () => {
            it('retrieves all beads for a specific solution', () => {
                return request.get('/api/beads/1')
                    .expect(200)
                    .then(({body: beads}) => {
                        expect(beads.length).to.equal(3600);
                        expect(beads.every(b => b.solution_id === 1)).to.equal(true);
                        expect(beads[0].id).to.equal(1);
                        expect(beads[0].x).to.equal(1);
                        expect(beads[0].y).to.equal(1);
                        expect(beads[0].bead_id).to.equal(null);
                        expect(beads[0].colour_name).to.equal(null);
                        expect(beads[0].r).to.equal(null);
                        expect(beads[0].g).to.equal(null);
                        expect(beads[0].b).to.equal(null);
                        expect(beads[3599].id).to.equal(3600);
                        expect(beads[3599].x).to.equal(60);
                        expect(beads[3599].y).to.equal(60);
                        expect(beads[3599].bead_id).to.equal(null);
                        expect(beads[3599].colour_name).to.equal(null);
                        expect(beads[3599].r).to.equal(null);
                        expect(beads[3599].g).to.equal(null);
                        expect(beads[3599].b).to.equal(null);
                        expect(beads[1750].id).to.equal(1751);
                        expect(beads[1750].x).to.equal(30);
                        expect(beads[1750].y).to.equal(11);
                        expect(beads[1750].bead_id).to.equal(31);
                        expect(beads[1750].colour_name).to.equal('Turqoise');
                        expect(beads[1750].r).to.equal(73);
                        expect(beads[1750].g).to.equal(152);
                        expect(beads[1750].b).to.equal(188);
                    });
            });
        });
        describe('POST /api/beads/:solution_id', () => {
            const testSolution = [ { x: 1,
    y: 1,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 2,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 3,
    bead_id: 33,
    colour_name: 'Light Grey',
    r: 233,
    g: 233,
    b: 233 },
  { x: 1,
    y: 4,
    bead_id: 33,
    colour_name: 'Light Grey',
    r: 233,
    g: 233,
    b: 233 },
  { x: 1,
    y: 5,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 6,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 7,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 8,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 9,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 10,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 11,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 },
  { x: 1,
    y: 12,
    bead_id: 1,
    colour_name: 'White',
    r: 236,
    g: 237,
    b: 237 } ]
            it('should return a 201 status and a report to confirm correct no insertions', () => {
                return request.post('/api/beads/3').send(testSolution)
                .expect(201)
                .then(({body: report}) => {
                    expect(report.insert_count).to.equal(12)
                    expect(report.solution_id).to.equal('3')
                });
            });
        });
        describe('GET /api/beads/temp', () => {
            const url = 'https://sm.ign.com/ign_in/news/p/pokemon-da/pokemon-day-2018-celebrations-include-snapchat-lenses-new-pi_6kqw.jpg';
            const width = 2;
            const height = 2;
            it('returns an array of arrays to represent x,y coords on an image', () => {
                return request.get(`/api/beads/temp?width=${width}&height=${height}&url=${url}`)
                .expect(200)
                .then(({body: pixels}) => {
                    expect(pixels).to.be.an('array');
                    expect(pixels.length).to.equal(2);
                    expect(pixels[0].length).to.equal(2);
                    expect(pixels[1].length).to.equal(2);
                    expect(pixels[0][1].colour_name).to.equal('Beige');
                    expect(pixels[0][1].r).to.equal(222);
                    expect(pixels[0][1].g).to.equal(180);
                    expect(pixels[0][1].b).to.equal(139);
                    expect(pixels[0][1].x).to.equal(1);
                    expect(pixels[0][1].y).to.equal(2);
                    expect(pixels[0][1].bead_id).to.equal(19);
                    expect(pixels[1][1].colour_name).to.equal('Beige');
                    expect(pixels[1][1].r).to.equal(222);
                    expect(pixels[1][1].g).to.equal(180);
                    expect(pixels[1][1].b).to.equal(139);
                    expect(pixels[1][1].x).to.equal(2);
                    expect(pixels[1][1].y).to.equal(2);
                    expect(pixels[1][1].bead_id).to.equal(19);
                })
            })
        })
    });
    describe('ROUTE /api/inventory', () => {
        describe('GET /api/inventory/', () => {
            it('gets all inventory objects as an array', () => {
                return request.get('/api/inventory/')
                .expect(200)
                .then(({body: items}) => {
                    expect(items.length).to.equal(53);
                    expect(items).to.be.an('array');
                    expect(items.every(item => item.quantity >= 0)).to.equal(true);
                    expect(items.every(item => item.user_id !== null)).to.equal(true);
                    expect(items.every(item => item.bead_id !== null)).to.equal(true);
                    expect(items[51].id).to.equal(52);
                    expect(items[51].users_id).to.equal(1);
                    expect(items[51].bead_id).to.equal(32);
                    expect(items[51].quantity).to.equal(47);
                });
            });
        });
    });
});