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
                    .then(({ body: user }) => {
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
                    .then(({ body: beads }) => {
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
                    .then(({ body: beads }) => {
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
            const testSolution = [{
                x: 1,
                y: 1,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 2,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 3,
                bead_id: 33,
                colour_name: 'Light Grey',
                r: 233,
                g: 233,
                b: 233
            },
            {
                x: 1,
                y: 4,
                bead_id: 33,
                colour_name: 'Light Grey',
                r: 233,
                g: 233,
                b: 233
            },
            {
                x: 1,
                y: 5,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 6,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 7,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 8,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 9,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 10,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 11,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            },
            {
                x: 1,
                y: 12,
                bead_id: 1,
                colour_name: 'White',
                r: 236,
                g: 237,
                b: 237
            }]
            it('should return a 201 status and a report to confirm correct no insertions', () => {
                return request.post('/api/beads/3').send(testSolution)
                    .expect(201)
                    .then(({ body: report }) => {
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
                    .then(({ body: pixels }) => {
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
        });
    });
    describe('ROUTE /api/inventory', () => {
        describe('GET /api/inventory/', () => {
            it('gets all inventory objects as an array', () => {
                return request.get('/api/inventory/')
                    .expect(200)
                    .then(({ body: items }) => {
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
        describe('GET /api/inventory/:user_id', () => {
            it('returns an array of inventory items for the specified user', () => {
                return request.get('/api/inventory/1')
                    .expect(200)
                    .then(({ body: items }) => {
                        expect(items).to.be.an('array');
                        expect(items.length).to.be.equal(25);
                        expect(items.every(item => item.quantity >= 0)).to.equal(true);
                        expect(items.every(item => item.users_id === 1)).to.equal(true);
                        expect(Object.keys(items[15]).length).to.equal(14)
                        expect(items[15].quantity).to.equal(28);
                        expect(items[15].colour_name).to.equal('Khaki');
                        expect(items[15].bead_id).to.equal(20);
                        expect(items[15].r).to.equal(54);
                        expect(items[15].b).to.equal(56);
                        expect(items[15].g).to.equal(63);
                        expect(items[15].hex).to.equal('363F38');
                        expect(items[15].size).to.equal('Medium');
                        expect(items[15].brand).to.equal('Hama');
                        expect(items[15].source_url).to.equal('https://www.hamabeads.com/shop-midi/midi-beads');
                    });
            });
        });
        describe('PUT /api/inventory/:inventory_id', () => {
            it('increments the bead quantity by requested amount', () => {
                let currQuantity;
                let inv_id;
                const increment = 6;
                return request.get('/api/inventory')
                    .then(({ body: items }) => {
                        inv_id = items[1].id;
                        currQuantity = items[1].quantity;
                        return request.put(`/api/inventory/${inv_id}?amount=${increment}&decrement=false`).expect(201);
                    })
                    .then(({ body: item }) => {
                        expect(item.quantity).to.equal(currQuantity + increment);
                    });
            });
            it('decrements the bead quantity by requested amount', () => {
                let currQuantity;
                let inv_id;
                const decrement = 8;
                return request.get('/api/inventory')
                    .then(({ body: items }) => {
                        inv_id = items[0].id;
                        currQuantity = items[0].quantity;
                        return request.put(`/api/inventory/${inv_id}?amount=${decrement}&decrement=true`).expect(201);
                    })
                    .then(({ body: item }) => {
                        expect(item.quantity).to.equal(currQuantity - decrement);
                    });
            });
        });
        describe('POST /api/inventory', () => {
            it('returns an identical inventory object to the one passed to it', () => {
                const inv_object = {
                    users_id: 1,
                    bead_id: 30,
                    quantity: 5
                }
                return request.post('/api/inventory')
                    .send(inv_object)
                    .expect(201)
                    .then(({ body: item }) => {
                        expect(item.id).to.equal(54);
                        expect(item.users_id).to.equal(inv_object.users_id);
                        expect(item.bead_id).to.equal(inv_object.bead_id);
                        expect(item.quantity).to.equal(inv_object.quantity);
                    });
            });
        });
    });
    describe('ROUTE /api/solutions', () => {
        describe('GET /api/solutions', () => {
            it('returns expected array of solutions', () => {
                return request.get('/api/solutions')
                    .expect(200)
                    .then(({ body: solutions }) => {
                        expect(solutions).to.be.an('array');
                        expect(solutions.length).to.equal(3);
                        expect(Object.keys(solutions[0]).length).to.equal(12);
                        expect(solutions[0].id).to.equal(1);
                        expect(solutions[0].title).to.equal('Snorlax');
                        expect(solutions[0].users_id).to.equal(1);
                        expect(solutions[0].image_url).to.equal('https://pokemonrevolution.net/img/feature/snorlax.png');
                        expect(solutions[0].votes).to.equal(2);
                        expect(solutions[0].is_public).to.equal(true);
                        expect(solutions[0].tags).to.equal('#snorlax#pokemon#sleepy');
                        expect(solutions[0].brand).to.equal('Hama');
                        expect(solutions[0].width_px).to.equal(60);
                        expect(solutions[0].height_px).to.equal(60);
                        expect(solutions[0].favourited).to.equal(3);
                        expect(solutions[0].created_at).to.not.equal(null);
                    });
            });
        });
        describe('GET /api/solutions/:solution_id', () => {
            it('returns expected solution', () => {
                return request.get('/api/solutions/2')
                    .expect(200)
                    .then(({ body: solution }) => {
                        expect(Object.keys(solution).length).to.equal(12);
                        expect(solution.id).to.equal(2);
                        expect(solution.title).to.equal('Aubergine Emoji');
                        expect(solution.users_id).to.equal(1);
                        expect(solution.image_url).to.equal('http://www.emoji.co.uk/files/emoji-one/food-drink-emoji-one/1613-aubergine.png');
                        expect(solution.votes).to.equal(1);
                        expect(solution.is_public).to.equal(true);
                        expect(solution.tags).to.equal('#aubergine#emoji#purple#vegetable');
                        expect(solution.brand).to.equal('Hama');
                        expect(solution.width_px).to.equal(60);
                        expect(solution.height_px).to.equal(60);
                        expect(solution.favourited).to.equal(0);
                        expect(solution.created_at).to.not.equal(null);
                    })
            });
        });
        describe('GET /api/solutions/user/:user_id', () => {
            it('returns the solutions that belong to requested user', () => {
                const myId = 1;
                return request.get(`/api/solutions/user/${myId}`)
                    .expect(200)
                    .then(({ body: solutions }) => {
                        expect(solutions.every(s => s.users_id === myId)).to.equal(true);
                        expect(Object.keys(solutions[2]).length).to.equal(12);
                        expect(solutions[1].id).to.equal(2);
                        expect(solutions[1].title).to.equal('Aubergine Emoji');
                        expect(solutions[1].image_url).to.equal('http://www.emoji.co.uk/files/emoji-one/food-drink-emoji-one/1613-aubergine.png');
                        expect(solutions[1].votes).to.equal(1);
                        expect(solutions[1].is_public).to.equal(true);
                        expect(solutions[1].tags).to.equal('#aubergine#emoji#purple#vegetable');
                        expect(solutions[1].brand).to.equal('Hama');
                        expect(solutions[1].width_px).to.equal(60);
                        expect(solutions[1].height_px).to.equal(60);
                        expect(solutions[1].favourited).to.equal(0);
                        expect(solutions[1].created_at).to.not.equal(null);
                    });
            });
            it('returns an empty array when user has no solutions', () => {
                const myId = 2;
                return request.get(`/api/solutions/user/${myId}`)
                    .expect(200)
                    .then(({ body: solutions }) => {
                        expect(solutions).to.be.an('array');
                        expect(solutions.length).to.equal(0);
                    });
            });
        });
        describe('POST /api/solutions/', () => {
            const solution_obj = {
                title: "Bob the Minion",
                users_id: 2,
                image_url: "https://i.pinimg.com/564x/0c/9c/a0/0c9ca06c106749d7ad564b95ba525ad6.jpg",
                is_public: true,
                tags: "#minions#bob#yellow#cartoon",
                brand: "Hama",
                width_px: 60,
                height_px: 60
            }
            it('returns the solution object back to confirm posting', () => {
                return request.post('/api/solutions')
                    .send(solution_obj)
                    .expect(201)
                    .then(({ body: solution }) => {
                        expect(solution.id).to.not.equal(null)
                        expect(solution.title).to.equal(solution_obj.title);
                        expect(solution.users_id).to.equal(solution_obj.users_id);
                        expect(solution.image_url).to.equal(solution_obj.image_url);
                        expect(solution.is_public).to.equal(solution_obj.is_public);
                        expect(solution.brand).to.equal(solution_obj.brand);
                        expect(solution.width_px).to.equal(solution_obj.width_px);
                        expect(solution.height_px).to.equal(solution_obj.height_px);
                    });
            }); 
        });
        describe('PUT /api/solutions/:solution_id/votes', () => {
            it('increments votes by one', () => {
                let original_votes;
                const sol_id = 3;
                return request.get(`/api/solutions/${sol_id}`)
                .then(({body: solution}) => {
                    original_votes = solution.votes;
                    return request.put(`/api/solutions/${sol_id}/votes`).expect(201)
                })
                .then(({body: solution}) => {
                    expect(solution.votes).to.equal(original_votes + 1);
                })
            });
            it('decrements votes by one', () => {
                let original_votes;
                const sol_id = 2;
                return request.get(`/api/solutions/${sol_id}`)
                .then(({body: solution}) => {
                    original_votes = solution.votes;
                    return request.put(`/api/solutions/${sol_id}/votes?decrement=true`).expect(201)
                })
                .then(({body: solution}) => {
                    expect(solution.votes).to.equal(original_votes - 1);
                })
            });
            it('does not decrement votes lower than zero', () => {
                let original_votes;
                const sol_id = 2;
                return request.get(`/api/solutions/${sol_id}`)
                .then(({body: solution}) => {
                    original_votes = solution.votes;
                    return request.put(`/api/solutions/${sol_id}/votes?decrement=true`).expect(201)
                })
                .then(({body: solution}) => {
                    expect(solution.votes).to.equal(original_votes);
                })
            });
        });
        describe('PUT api/solutions/:solution_id/favourited', () => {
            it('increments favourited by one', () => {
                let orig_faves;
                const sol_id = 3;
                return request.get(`/api/solutions/${sol_id}`)
                .then(({body: solution}) => {
                    orig_faves = solution.favourited;
                    return request.put(`/api/solutions/${sol_id}/favourited`).expect(201)
                })
                .then(({body: solution}) => {
                    expect(solution.favourited).to.equal(orig_faves + 1);
                })
            });
            it('decrements favourited by one', () => {
                let orig_faves;
                const sol_id = 3;
                return request.get(`/api/solutions/${sol_id}`)
                .then(({body: solution}) => {
                    orig_faves = solution.favourited;
                    return request.put(`/api/solutions/${sol_id}/favourited?decrement=true`).expect(201)
                })
                .then(({body: solution}) => {
                    expect(solution.favourited).to.equal(orig_faves - 1);
                })
            });
            it('does not decrement favourited lower than zero', () => {
                let orig_faves;
                const sol_id = 2;
                return request.get(`/api/solutions/${sol_id}`)
                .then(({body: solution}) => {
                    orig_faves = solution.favourited;
                    return request.put(`/api/solutions/${sol_id}/favourited?decrement=true`).expect(201)
                })
                .then(({body: solution}) => {
                    expect(solution.favourited).to.equal(orig_faves);
                })
            });
        })
    });
});