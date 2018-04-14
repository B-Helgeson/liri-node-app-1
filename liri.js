require('dotenv').config()

// consts
const TWITTER_DATE_FORMAT = 'ddd MMM DD HH:mm:ss ZZ YYYY', // date provided in the format of Thu Apr 12 22:29:39 +0000 2018
    OUTPUT_DATE_FORMAT = 'dddd, MMMM Do YYYY [at] h:mm A', // date displayed in the format of Thursday, April 12th 2018 at 6:29 PM
    TWEET_PARAMS = { screen_name: 'bootcamp_marce', count: 20 },
    DEFAULT_SONG = 'Ace of Base The Sign',
    TRACK_FORMAT = '"%s" by %s on the album "%s"\n\n%s',
    MOVIE_QUERY_FORMAT = 'http://www.omdbapi.com/?t=%s&y=&plot=short&apikey=trilogy',
    DEFAULT_MOVIE = 'Mr. Nobody',
    MOVIE_FORMAT = '"%s" (%s)\nIMDB Rating: %s\nTomatometer: %s\nCountry: %s\nLanguage: %s\n\n%s\n\nStarring: %s',
    SEPARATOR = '**********'

// modules
const Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    util = require('util'),
    request = require('request'),
    moment = require('moment'),
    fs = require('fs')

// init
var keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)

// user input
var userCommand = process.argv[2],
    userParameter = process.argv.slice(3).join(" ")

/**
 * Process command with optional parameter
 * @param {string} command (required) Supported commands: my-tweets, spotify-this-song, movie-this, do-what-it-says
 * @param {string} parameter (optional) 
 */
function processCommand(command, parameter) {
    log(util.format('Processing %s command', command))
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
        case 'do-what-it-says':
            performTaskFromFile()
            break
        default:
            log('Unsupported command', command)
    }
}

/**
 * Displays the most recent 20 tweets
 */
function displayTweets() {
    client.get('statuses/user_timeline', TWEET_PARAMS,
        function (error, tweets, response) {
            if (!error) {
                tweets.forEach(tweet => {
                    log(SEPARATOR)
                    log(tweet.text)
                    log('Tweeted on', moment(tweet.created_at, TWITTER_DATE_FORMAT).format(OUTPUT_DATE_FORMAT))
                })
                log(SEPARATOR)
            }
        }
    )
}

/**
 * Pull information on a Spotify track specified by songName
 * @param {string} songName 
 */
function spotifySong(songName) {
    spotify.search({ type: 'track', query: songName, limit: 1 },
        function (error, data) {
            if (error) {
                return log('Error occurred: ' + error)
            }

            let track = data.tracks.items[0]

            log(SEPARATOR)
            log(util.format(TRACK_FORMAT,
                track.name,
                track.artists.map(artist => artist.name).join(', '),
                track.album.name,
                track.external_urls.preview_url || ('No preview available. Full track URL: ' + track.external_urls.spotify))
            )
            log(SEPARATOR)
        }
    )
}

/**
 * Pull information on a movie specified by movieName
 * @param {string} movieName 
 */
function omdbMovie(movieName) {
    request(util.format(MOVIE_QUERY_FORMAT, movieName.replace(' ', '+')),
        function (error, response, data) {
            if (!error && response.statusCode === 200) {
                let movie = JSON.parse(data)

                log(SEPARATOR)
                log(util.format(MOVIE_FORMAT,
                    movie.Title,
                    movie.Year,
                    movie.Ratings.find(rating => { return rating.Source === 'Internet Movie Database' }).Value,
                    movie.Ratings.find(rating => { return rating.Source === 'Rotten Tomatoes' }).Value,
                    movie.Country,
                    movie.Language,
                    movie.Plot,
                    movie.Actors)
                )
                log(SEPARATOR)
            }
        }
    )
}

/**
 * Perform whichever task is specified in the random.txt file
 */
function performTaskFromFile() {
    let fileCommand, fileParameter
    [fileCommand, fileParameter] = fs.readFileSync('random.txt', 'utf8').split(',')
    processCommand(fileCommand, fileParameter)
}

/**
 * Log to console and to file
 */
function log(...rest) {
    console.log.apply(null, rest)

    fs.appendFileSync('log.txt', rest.join(' ')+'\n')
}

// process command specified by user input
processCommand(userCommand, userParameter)