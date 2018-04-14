# LIRI
Language Interpretation and Recognition Interface

All retrieved data is displayed in the console and stored in `log.txt`

## Accepted Commands
- `my-tweets`
    - displays most recent 20 tweets posted to @bootcamp_marce account
- `spotify-this-song [song name]`
    - displays Spotify information about `[song name]`
- `movie-this [movie name]`
    - displays OMDB information about `[movie name]`
- `do-what-it-says`
    - performs the command specified in `random.txt`

## Tech Stack
- Node.js

## Dependencies
```
"dotenv": "^5.0.1",
"moment": "^2.22.0",
"node-spotify-api": "^1.0.7",
"request": "^2.85.0",
"twitter": "^1.7.1",
"word-wrap": "^1.2.3"
```
