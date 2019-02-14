import axios from 'axios';

export default {
    signup: function(username, password) {
        return axios.post('/api/signup', {
            username: username,
            password: password
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

    stories: function(promptId) {
        return axios.get('/api/stories/' + promptId);
    },

    story: function(UserId, PromptId) {
        return axios.get('/api/story/' + UserId + '/' + PromptId);
    },

    storyPrompt: function(UserId, PromptId) {
        return axios.get('/api/story-prompt/' + UserId + '/' + PromptId);
    },

    save: function(data) {
        return axios.post('/api/story', data);
    },

    share: function(data) {
        return axios.put('/api/story', data);
    },

};
