Language Interpretation and Recognition Interface

All retrieved data is displayed in the console and stored in `log.txt`

## Accepted Commands
<dl>
    <dt><code>my-tweets</code></dt>
    <dd>displays most recent 20 tweets posted to @bootcamp_marce account</dd>
    <dt><code>spotify-this-song [song name]</code></dt>
    <dd>displays Spotify information about <code>[song name]</code></dd>
    <dt><code>movie-this [movie name]</code></dt>
    <dd>displays OMDB information about <code>[movie name]</code></dd>
    <dt><code>do-what-it-says</code></dt>
    <dd>performs the command specified in <code>random.txt</code></dd>
</dl>

If no command is provided, Inquirer package is used to prompt the user.

## Tech Stack
- Node.js

## Dependencies
```js
{
    "dotenv": "^5.0.1",
    "colors": "^1.2.1",
    "inquirer": "^5.2.0",
    "moment": "^2.22.0",
    "node-spotify-api": "^1.0.7",
    "request": "^2.85.0",
    "twitter": "^1.7.1",
    "word-wrap": "^1.2.3"
}
```

## Demo
<script data-rows="20" src="https://asciinema.org/a/NbcTBW9W12ZDlVuJRExHx98WF.js" id="asciicast-NbcTBW9W12ZDlVuJRExHx98WF" async></script>
