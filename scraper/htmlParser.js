// require cheerio to parse HTML and find elements
const cheerio = require('cheerio');
// require the db for data scraping
//const db = require('../models');

module.exports = function(html, tag) {
    return new Promise((resolve, reject) => {
        // load the HTML into cheerio and save it to a variable
        var $ = cheerio.load(html.data);

        // use cheerio to find a specific tag from the HTML
        $(tag).each(function (i, element) {
            // create an empty object to save the data to be scraped
            var prompts = {};

            var text = $(this).children('a').children('h2').text(),
                link = {
                    src: '',
                    alt: '',
                };
            
            // ensuring that I grab the correct src and alts
            if ($(this).children('div').attr('aria-label') != undefined) {
                link.src = $(this).children('div').attr('style');
                link.src = link.src.replace('background-image:url(', '');
                link.src = link.src.replace(');border-color:#0079D3', '');
                link.alt = $(this).children('div').attr('aria-label');
                if (link.src != undefined) {
                    if (link.alt != undefined) {
                        prompts.link = link;
                        prompts.title = link.alt;
                        prompts.text = '';
                    }
                }
            } else {
                link.src = $(this).children('div').children('div').children('img').attr('src');
                link.alt = $(this).attr('href');
                if (link.src != undefined) {
                    if (link.alt != undefined) {
                        //prompts.link = link;
                    }
                }
            }

            // stripping the text of the excess fluff
            if (text != '') {
                if (text.indexOf('[WP]') === 0) {
                    text = text.replace('[WP] ', '');
                    if (text.indexOf('[WP]:') === 0) {
                        text = text.replace('[WP]: ', '');
                    } else if (text.indexOf('(WP)') === 0) {
                        text = text.replace('(WP)', '');
                    }
                    prompts.text = text;
                    prompts.link = {
                        src: '',
                        alt: ''
                    };
                } else if (text.indexOf('[') === 0) {
                    text = text.replace(text, '');
                } else {
                    prompts.text = text;
                    prompts.link = {
                        src: '',
                        alt: ''
                    };
                }
            }
            // filter the text for each prompt and create a title
            if (prompts.text) {
                if (prompts.text.indexOf('god') != -1 || prompts.text.indexOf('dragon') != -1 || prompts.text.indexOf('demon') != -1) {
                    // if (prompts.title.indexOf('old god') != -1) {
                    //     prompts.title = 'The Old Gods...';
                    // } else if (prompts.text.indexOf('war') != -1) {
                    //     prompts.title = 'Unlikely Friends';
                    //}
                    if (prompts.text.indexOf('circle') != -1) {
                        prompts.title = 'Demon Summoning Circle';
                    }
                } else if (prompts.text.indexOf('electronic') != -1 || prompts.text.indexOf('video game') != -1 || prompts.text.indexOf('futuristic') != -1 || prompts.text.indexOf('future') != -1) {
                    if (prompts.text.indexOf('looped back') != -1) {
                        prompts.title = 'The Time Loop'
                    } else if (prompts.text.indexOf('all electronics in the world cease to function') != -1) {
                        prompts.title = 'Electronic Night';
                    }
                } else if (prompts.text.indexOf('love') != -1) {
                    if (prompts.text.indexOf('vampire') != -1) {
                        prompts.title = 'Vampirical Love';
                    }
                } else if (prompts.text.indexOf('chef') != -1 || prompts.text.indexOf('chefs') != -1 || prompts.text.indexOf('food') != -1) {
                    if (prompts.text.indexOf('hell') != -1) {
                        prompts.title = 'The \'Bowels\' of Hell';
                    } else if (prompts.text.indexOf('Gordon Ramsey') != -1) {
                        prompts.text = prompts.text.replace('Gordon Ramsey', '');
                        prompts.title = 'The Cursed Meals';
                    }
                } else if (prompts.text.indexOf('casting') != -1) {
                    prompts.title = 'The Bumbling Actor';
                } else if (prompts.text.indexOf('penguin') != -1) {
                    prompts.title = 'The Penguin';
                } else if (prompts.text.indexOf('Cave of Youth') != -1) {
                    prompts.title = 'Cave of Youth';
                } else if (prompts.text.indexOf('Spawning phone booths') != -1) {
                    prompts.title = 'Phone Booth Man';
                } else if (prompts.text.indexOf('see ghosts') != -1) {
                    prompts.title = 'Ghosts!';
                } else if (prompts.text.indexOf('trapped on an island by yourself') != -1) {
                    prompts.title = 'Lonely Island';
                } else if (prompts.text.indexOf('angel of heartbreak') != -1) {
                    prompts.title = 'The Angel of Heartbreak';
                } else if (prompts.text.indexOf('first multi-celled organism') != -1) {
                    prompts.title = 'Multi Celled Ancestor';
                } else if (prompts.text.indexOf('find a rose on it despite the fact that you live alone') != -1) {
                    prompts.title = 'The Lonely Rose';
                }
            }

            if (prompts.title) {
                if (prompts.text === '') {
                    db.Prompts.create({
                        src: prompts.link.src,
                        alt: prompts.link.alt,
                        title: prompts.title
                    });
                } else {
                    db.Prompts.create({
                       text: prompts.text,
                       title: prompts.title
                    });
                }
            }
        });
        resolve('cheerio complete!');
    });
};