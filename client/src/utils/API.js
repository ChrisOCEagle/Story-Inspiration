import axios from 'axios';

export default {
    signup: function(username, password) {
        return axios.post('/api/signup', {
            username: username,
            password: password
        });
    },

    usernameCheck: function(username) {
        return axios.post('/api/user', {
            username: username
        });
    },

    scrape: function() {
        return axios.get('/scrape');
    },

    prompts: function() {
        return axios.get('/api/prompts');
    },

    prompt: function(id) {
        return axios.get('/api/prompt/' + id);
    },

    stories: function() {
        return axios.get('/api/stories/');
    },

    story: function(UserId, PromptId) {
        return axios.get('/api/story/' + UserId + '/' + PromptId);
    },

    storyPrompt: function(PromptId) {
        return axios.get('/api/story-prompt/' + PromptId);
    },

    save: function(data) {
        return axios.post('/api/story', data);
    },

    share: function(data) {
        return axios.put('/api/story', data);
    },

};
