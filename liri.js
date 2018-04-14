require('dotenv').config()

// modules
const Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    util = require('util'),
    request = require('request'),
    moment = require('moment')

// init
var keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)

// user input
var command = process.argv[2],
    parameter = process.argv.slice(3).join(" ")

// consts
const TWITTER_DATE_FORMAT = 'ddd MMM DD HH:mm:ss ZZ YYYY', //date provided in the format of Thu Apr 12 22:29:39 +0000 2018
    OUTPUT_DATE_FORMAT = 'dddd, MMMM Do YYYY [at] h:mm A',
    DEFAULT_SONG = 'Ace of Base The Sign',
    TRACK_FORMAT = '"%s" by %s on the album "%s"',
    MOVIE_QUERY_FORMAT = 'http://www.omdbapi.com/?t=%s&y=&plot=short&apikey=trilogy',
    DEFAULT_MOVIE = 'Mr. Nobody',
    MOVIE_FORMAT = '"%s" (%s)\nIMDB Rating: %s\nTomatometer: %s\nCountry: %s\nLanguage: %s\n\n%s\n\nStarring: %s',
    SEPARATOR = '**********'

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
    case 'movie-this':
        omdbMovie(parameter || DEFAULT_MOVIE)
        break
    default:
        console.log('Unsupported command', command)
}

function displayTweets() {
    client.get('statuses/user_timeline', { screen_name: 'bootcamp_marce', count: 20 },
        function (error, tweets, response) {
            if (!error) {
                tweets.forEach(tweet => {
                    console.log(SEPARATOR)
                    console.log(tweet.text)
                    console.log('Tweeted on', moment(tweet.created_at, TWITTER_DATE_FORMAT).format(OUTPUT_DATE_FORMAT))
                });
                console.log(SEPARATOR)
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

            console.log(SEPARATOR)
            console.log(util.format(TRACK_FORMAT, track.name, track.artists.map(artist => artist.name).join(', '), track.album.name))
            console.log(track.external_urls.preview_url || ('No preview available; song URL: ' + track.external_urls.spotify))
            console.log(SEPARATOR)
        }
    );
}

function omdbMovie(movieName) {
    request(util.format(MOVIE_QUERY_FORMAT, movieName.replace(' ', '+')),
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let movie = JSON.parse(body)

                console.log(SEPARATOR)
                console.log(util.format(MOVIE_FORMAT,
                    movie.Title,
                    movie.Year,
                    movie.Ratings.find(rating => { return rating.Source === 'Internet Movie Database' }).Value,
                    movie.Ratings.find(rating => { return rating.Source === 'Rotten Tomatoes' }).Value,
                    movie.Country,
                    movie.Language,
                    movie.Plot,
                    movie.Actors))
                console.log(SEPARATOR)
            }
        }
    )
}