require('dotenv').config()

var Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    moment = require('moment')

var keys = require('./keys.js'),
    spotify = new Spotify(keys.spotify),
    client = new Twitter(keys.twitter)

const TWITTER_DATE_FORMAT = "ddd MMM DD HH:mm:ss ZZ YYYY",
    OUTPUT_DATE_FORMAT = "dddd, MMMM Do YYYY [at] h:mm A"

/* Commands
my-tweets

spotify-this-song

movie-this

do-what-it-says
*/

// my-tweets
var params = { screen_name: 'bootcamp_marce', count: 20 };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        tweets.forEach(tweet => {
            console.log("**********")
            console.log(tweet.text)

            //date in the format of Thu Apr 12 22:29:39 +0000 2018
            console.log("Tweeted on", moment(tweet.created_at, TWITTER_DATE_FORMAT).format(OUTPUT_DATE_FORMAT))
        });
        console.log("**********")
    }
})