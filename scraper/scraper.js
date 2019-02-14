const htmlRequest = require('./htmlRequest.js');

module.exports = () => {
    return new Promise((resolve, reject) => {
        // first tell the console what the server is doing
        console.log('\n***********************************\n' +
            'Grabbing every thread name and link\n' +
            'from Reddit\'s writing prompt boards' +
            '\n***********************************\n');

        // defining the url to use for the axios request
        const writingPrompts = 'https://www.reddit.com/r/WritingPrompts/';
        const hqWritingPrompts = 'https://www.reddit.com/r/QualityWritingPrompts/';
        const writingPrompt = 'https://www.reddit.com/r/writingprompt/';
        const dailyWritingPrompt = 'https://www.reddit.com/r/promptoftheday/';

        htmlRequest(writingPrompts);
        htmlRequest(hqWritingPrompts);
        htmlRequest(writingPrompt);
        htmlRequest(dailyWritingPrompt);

        resolve("All done");
    });
};