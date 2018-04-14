Language Interpretation and Recognition Interface

All retrieved data is displayed in the console and stored in `log.txt`

## Accepted Commands
<dl>
    <dt>`my-tweets`</dt>
    <dd>displays most recent 20 tweets posted to @bootcamp_marce account</dd>
    <dt>`spotify-this-song [song name]`</dt>
    <dd>displays Spotify information about `[song name]`</dd>
    <dt>`movie-this [movie name]`</dt>
    <dd>displays OMDB information about `[movie name]`</dd>
    <dt>`do-what-it-says`</dt>
    <dd>performs the command specified in `random.txt`</dd>
</dl>

## Tech Stack
- Node.js

## Dependencies
```js
{
    "dotenv": "^5.0.1",
    "moment": "^2.22.0",
    "node-spotify-api": "^1.0.7",
    "request": "^2.85.0",
    "twitter": "^1.7.1",
    "word-wrap": "^1.2.3"
}
```
