//* Search Song and fetch data
// const searchSong = async() => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    
//     const response = await fetch(url)
//     const data = response.json()
//     displaySongs(data.data)
// }


//* Search Song and Other Way fetch data
const searchSong = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displaySongs(data.data))
    .catch(error => disPlayError('Sorry!!! Some technical problem occur. Try is later...'))
}


// * Functional Work
const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class = "col-md-9">
                <h3 class = "lyrics-name"> ${song.title} </h3>
                <p class = "author lead"> Album by <span> ${song.artist.name} </span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div> 
            <div class = "col-md-3 text-md-right text-center">
                <button onclick= "getLyric( '${song.artist.name}', '${song.title}' )" class = "btn btn-success"> Get Lyrics </button> 
            </div>
        `;
        songContainer.appendChild(songDiv);
    });
}


//* Get Song Lyric
const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(error => disPlayError('Sorry !!! Song Lyrics can\'t found.'))
}


//* Display Song Lyric 
const displayLyrics = (lyric) => {
    const lyricsDiv = document.getElementById('song-lyrics'); 
    lyricsDiv.innerText = lyric;
}


//* Display Error Message
const disPlayError = (error) => {
    const errorBox = document.getElementById('show-error');
    errorBox.innerText = error;
}
