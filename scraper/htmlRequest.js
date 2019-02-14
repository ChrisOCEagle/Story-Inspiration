// require axios to make an HTML request to a webpage
const axios = require('axios');
const htmlParser = require('./htmlParser.js');

module.exports = function(url) {
    return new Promise((resolve, reject) => {
        // making a request via axios to an url
        // the page's HTML is passed as the callback's third argument
        axios.get(url).then(response => {

            var tag;

            // if url is https://www.reddit.com/r/WritingPrompts/, then the tag is a div that contains a span
            // if url is https://www.reddit.com/r/QualityWritingPrompts, then the tag is a div that contains a span
            // if url is https://www.reddit.com/r/writingprompt/, then the tag is a div that contains a span
            // if url is https://www.reddit.com/r/promptoftheday/, then the tag is a div that contains an img
            switch (url) {
                case 'https://www.reddit.com/r/WritingPrompts/':
                case 'https://www.reddit.com/r/QualityWritingPrompts':
                case 'https://www.reddit.com/r/writingprompt/':
                    tag = 'span';
                    break;
                case 'https://www.reddit.com/r/promptoftheday/':
                    tag = 'div a'; // div._2MkcR85HDnYngvlVW2gMMa that contains an a tag
                    break;
                default:
                    tag = null;
            }

            htmlParser(response, tag);
            resolve('axios complete!');
        });
    })
};