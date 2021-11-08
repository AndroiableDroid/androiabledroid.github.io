let slider = document.querySelector(".tracker")
let playbtn = document.querySelector(".play")
let pausebtn = document.querySelector(".pause");
let prevbtn = document.querySelector(".previous");
let nextbtn = document.querySelector(".next");
let menu = document.getElementById('menu');
let audio = document.getElementById('audio');
let progressfor = document.querySelector('.progressfor');
let progress = document.querySelector('.progressbar');
let album = document.querySelector('.album');
let duration = document.querySelector('.tmright');
let currentTime = document.querySelector('.tmleft');
let mediacontainer = document.querySelector('.media-container');
let container = document.querySelector('.container');
let songContainer = document.querySelector('.song-name');
let head = document.head.getElementsByTagName('title')[0];

let rotate = [0, false];
let totalcnt = 0;
let currentTrack = 0;
let dur_length = "";
$(document).ready(function () {
    $.getJSON("tracks/tracks.json", function (result) {
        $.each(result, function (field) {
            totalcnt++;
            var song_name;
            var album_name;
            var artist;
            var cover;
            var srcNode = document.createElement('source');
            srcNode.src = result[field]['file'];
            cover = 'url(' + result[field]['cover'] + ')';
            song_name = result[field]['song'];
            artist = result[field]['artist'];
            srcNode.innerText = artist;
            album_name = result[field]['album'];
            var Node = document.createElement('div');
            Node.classList.add('track');
            var Node2 = document.createElement('div');
            Node.id = 'track' + field;
            Node2.classList.add('cover');
            Node.appendChild(Node2);
            var SongNode = document.createElement('div');
            SongNode.classList.add('song');
            var SongnameNode = document.createElement('div');
            var mar1 = document.createElement('marquee');
            mar1.innerHTML = song_name;
            var AlbumnameNode = document.createElement('div');
            var mar2 = document.createElement('marquee');
            mar2.innerHTML = album_name;
            AlbumnameNode.appendChild(mar2);
            SongnameNode.appendChild(mar1);
            SongNode.appendChild(SongnameNode);
            SongNode.appendChild(AlbumnameNode);
            Node.appendChild(SongNode);
            Node.appendChild(srcNode);
            Node.addEventListener('click', (e) => {
                audio.src = result[field]['file'];
                currentTrack = field;
                changePlaystate(e);
            });
            slider.appendChild(Node);
            document.querySelector('#track' + field).children[0].style.backgroundImage = cover;
            if (field == 0)
                audio.src = srcNode.src;
            audio.load();
        });
    });
});

let mShowing = false;
menu.addEventListener('click', () => {
    if (!mShowing) {
        slider.classList.add("translate");
        menu.classList.add('open');
        if (screen.width <= 720)
        mediacontainer.style.transform = "translateX(200px)";
    }
    else {
        slider.classList.remove("translate");
        menu.classList.remove('open');
        mediacontainer.style.transform = "translateX(0px)";
    }
    mShowing = !mShowing;
});

audio.addEventListener('loadeddata', () => {

    // if (playbtn.className.search('pause') == -1) return;
    var tmp = audio.duration;
    var min = tmp / 60 | 0;
    if (min < 10) min = "0" + min;
    var sec = tmp % 60 | 0;
    if (sec < 10) sec = "0" + sec;
    dur_length = min + ":" + sec;
});

navigator.mediaSession.setActionHandler("play", _ => {
    changePlaystate(true);
});
navigator.mediaSession.setActionHandler("pause", _ => {
    changePlaystate(false);
});
// navigator.mediaSession.setActionHandler("previoustrack", _ => { audio.src = /* som/e URL */; });
// navigator.mediaSession.setActionHandler("nexttrack", _ => { audio.src = /* some URL */; });
navigator.mediaSession.setActionHandler("stop", _ => { audio.src = ''; });
navigator.mediaSession.setActionHandler("seekto", (e) => { audio.currentTime = e.seekTime; });

function playstate(e) {
    if (e === true) return true;
    if (album.className.search('play-state') == -1) return true
    if (e.target.className.search('next') != -1) return true
    if (e.target.className.search('prev') != -1) return true
    if (e.type == 'keydown' && (e.code == 'KeyN' || e.code == 'KeyP')) return true
    try {
        if (e.target.parentElement.parentElement.className.search('tracker') != -1) return true
        if (e.target.parentElement.parentElement.className.search('song') != -1) return true
    }
    catch (e) { return false; }
    if (e.target.tagName == 'AUDIO') return true
    return false
}

function rotateActive(track, rotate) {
    track.style.animation = rotate ? "rotateCover 3s linear infinite running" : "none";
}


function changePlaystate(e) {
    setTimeout(function () {
        duration.innerHTML = dur_length;
        track = document.querySelector('#track' + currentTrack);
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.children[1].children[0].children[0].innerText,
            album: track.children[1].children[1].children[0].innerText,
            artist: track.children[2].innerText
        });
        let play = playstate(e);
        if (rotate[1] == true)
            rotateActive(document.querySelector('#track' + rotate[0]).children[0], false);
        if (play === true) {
            playbtn.classList.remove('play');
            playbtn.classList.add('pause');
            // album.classList.add('animate');

            album.classList.add('play-state');
            audio.play();

            songContainer.children[0].innerHTML = track.children[1].children[0].children[0].innerHTML;
            songContainer.children[1].innerHTML = track.children[2].innerText;
            if (songContainer.children[1].innerHTML == "Unknown")
                songContainer.children[1].innerHTML = ""
            rotateActive(track.children[0], true);
            rotate[0] = currentTrack;
            rotate[1] = true;
            head.innerHTML = songContainer.children[0].innerHTML;
            // document.querySelector('#track' + currentTrack).children[0].style.animation = "rotateCover 3s linear infinite running";

        } else {
            playbtn.classList.remove('pause');
            playbtn.classList.add('play');
            // album.classList.remove('animate');
            album.classList.remove('play-state');
            // document.querySelector('#track' + currentTrack).children[0].style.animation = "none";
            audio.pause();
            rotateActive(track.children[0], false);
        }
    }, 100);
}

function next(e) {
    track = document.querySelector('#track' + currentTrack);
    rotateActive(track.children[0], false);
    currentTrack += 1;
    if (currentTrack >= totalcnt)
        currentTrack = 0;
    var name = document.querySelector('#track' + currentTrack).children[2].src;
    audio.src = '/tracks/' + name.substring(name.lastIndexOf('/') + 1);
    audio.load();
    changePlaystate(e);
}

function prev(e) {
    track = document.querySelector('#track' + currentTrack);
    rotateActive(track.children[0], false);
    currentTrack -= 1;
    if (currentTrack < 0)
        currentTrack = totalcnt - 1;
    var name = document.querySelector('#track' + currentTrack).children[2].src;
    audio.src = '/tracks/' + name.substring(name.lastIndexOf('/') + 1);
    audio.load();
    changePlaystate(e);
}

window.addEventListener('keydown', (e) => {
    if (e.code == "Space") {
        e.preventDefault();
        changePlaystate(e);
    }
    if (e.code == "KeyN") {
        e.preventDefault();
        next(e);
    }
    if (e.code == "KeyP") {
        e.preventDefault();
        prev(e);
    }
})
playbtn.addEventListener('click', changePlaystate)

nextbtn.addEventListener('click', next);

prevbtn.addEventListener('click', prev);

progress.addEventListener('click', (e) => {
    if (playbtn.className.search('pause') != -1) {
        var _x = e.offsetX;
        var dur = audio.duration;
        audio.currentTime = (_x / progress.clientWidth) * dur;
    }
})

audio.addEventListener('timeupdate', (e) => {
    var tmp = audio.currentTime;
    var dur = audio.duration
    var min = tmp / 60 | 0;
    if (min < 10) min = "0" + min
    var sec = tmp % 60 | 0;
    if (sec < 10) sec = "0" + sec;
    currentTime.innerHTML = min + ":" + sec;
    var _progress = (tmp / dur) * 100;
    progressfor.style.width = _progress + "%";
    if (tmp == dur) {
        currentTime.innerHTML = "00:00";
        progressfor.style.width = "0%"
        next(e);
    }
});

container.addEventListener("mousemove", (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    mediacontainer.style.transition = "all 0.5s linear ease";
    mediacontainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
container.addEventListener("mouseleave", (e) => {
    mediacontainer.style.transition = "all 0.5s linear ease-out";
    mediacontainer.style.transform = "rotateY(0deg) rotateX(0deg)";
});
