// require passport for checking authentication
const passport = require('../config/passport');
const db = require('../models');
// require jsonwebtoken to create a token to send to local storage for the client to access
const jwt = require('jsonwebtoken');
// require the authentication middleware for restricting routes
const isAuthenticated = require('../config/middleware/isAuthenticated');
// require the scraper
const scraper = require('../scraper/scraper.js');

module.exports = function(app) {
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        db.User.findOne({ 
            where: { username: req.body.username }
        }).then(dbUser => res.json(createToken(dbUser.username, dbUser.id)));
    });

    function createToken(username, id) {
        let token = jwt.sign(
            {
                username: username,
                id: id
            },
            'Eagle',
            { expiresIn: 329600 }
        );
        return {
            success: true,
            err: null,
            token
        };
    };

    app.post('/api/signup', (req, res) => {
        const { username, password } = req.body;
        db.User.create({
            username: username,
            password: password
        })
        .then(() => res.send('Successfully created a user!') )
        .catch(err => res.json(err));
    });

    app.get('/members', isAuthenticated, (req, res) => {
        console.log('You are authenticated!');
        res.send('you are authenticated');
    });

    app.get('/scrape', (req, res) => {
        scraper();
        res.send('Scrape Complete!');
    });

    app.get('/api/prompts', (req, res) => {
        db.Prompts
        .findAll({})
        .then(result => res.json(result))
        .catch(err => console.log(err));
    });

    app.get('/api/prompt/:id', (req, res) => {
        db.Prompts.findOne({ where: { id: req.params.id } })
        .then(result => res.json(result))
        .catch(err => console.log(err));
    });

    app.get('/api/story/:user_id/:prompt_id', (req, res) => {
        const { user_id, prompt_id } = req.params;
        db.Stories.findOne({ where: { UserId: user_id, PromptId: prompt_id } })
        .then(dbStory => res.json(dbStory))
        .catch(err => console.log(err));
    });

    app.get('/api/story-prompt/:user_id/:prompt_id', (req, res) => {
        const { user_id, prompt_id } = req.params;
        db.Stories.findOne({ where: { UserId: user_id, id: prompt_id } })
        .then(dbStory => res.json(dbStory))
        .catch(err => console.log(err));
    });

    app.get('/api/stories/:prompt_id', (req, res) => {
        const { prompt_id } = req.params;
        db.Stories
        .findAll({ where: { PromptId: prompt_id, share: true } })
        .then(dbStory => res.json(dbStory))
        .catch(err => console.log(err));
    });

    app.post('/api/story', (req, res) => {
        const { story, share, UserId, PromptId } = req.body;
        db.Stories.create({
            title: story.title,
            story: story.body,
            share: share,
            UserId: UserId,
            PromptId: PromptId,
        }).then(dbStory => res.json(dbStory))
        .catch(err => res.json(err));
    });

    app.put('/api/story', (req, res) => {
        const { share, UserId, PromptId } = req.body;
        db.Stories
        .update({ share: share }, { where: { UserId: UserId, PromptId: PromptId } })
        .then(share => {
            db.Stories
            .findOne({ where: { UserId: UserId, PromptId: PromptId, share: share } })
            .then(dbStory => res.json(dbStory))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    });
};