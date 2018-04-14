require('dotenv').config()

// modules
const Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    util = require('util'),
    moment = require('moment')

// init
var keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)

// user input
var command = process.argv[2],
    parameter = process.argv.slice(3).join(" ")

// consts
const TWITTER_DATE_FORMAT = 'ddd MMM DD HH:mm:ss ZZ YYYY',
    OUTPUT_DATE_FORMAT = 'dddd, MMMM Do YYYY [at] h:mm A',
    DEFAULT_SONG = 'Ace of Base The Sign',
    TRACK_FORMAT = '"%s" by %s on the album "%s"'

/* TODO Commands
movie-this

do-what-it-says
*/

switch (command) {
    case 'my-tweets':
        displayTweets()
        break
    case 'spotify-this-song':
        spotifySong(parameter || DEFAULT_SONG)
        break
    default:
        console.log('Unsupported command', command)
}

function displayTweets() {
    client.get('statuses/user_timeline', { screen_name: 'bootcamp_marce', count: 20 },
        function (error, tweets, response) {
            if (!error) {
                tweets.forEach(tweet => {
                    console.log('**********')
                    console.log(tweet.text)

                    //date in the format of Thu Apr 12 22:29:39 +0000 2018
                    console.log('Tweeted on', moment(tweet.created_at, TWITTER_DATE_FORMAT).format(OUTPUT_DATE_FORMAT))
                });
                console.log('**********')
            }
        }
    )
}

function spotifySong(songName) {
    spotify.search({ type: 'track', query: songName, limit: 1 },
        function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            let track = data.tracks.items[0]

            console.log('**********')
            console.log(util.format(TRACK_FORMAT, track.name, track.artists.map(artist => artist.name).join(', '), track.album.name))
            console.log(track.external_urls.preview_url || ('No preview available; song URL: ' + track.external_urls.spotify))
            console.log('**********')
        }
    );
}