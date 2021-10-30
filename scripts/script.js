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
let list = 1;
$(document).ready(function(){
      $.getJSON("tracks/tracks.json", function(result){
        $.each(result, function(field){
            var song_name;
            var album_name;
            var artist;
            var cover;
            cover = 'url(' + result[field]['cover'] + ')';
            song_name = result[field]['song'];
            artist = result[field]['artist'];
            album_name = result[field]['album'];
            var Node = document.createElement('div');
            Node.classList.add('track');
            var Node2 = document.createElement('div');
            Node.id = Node2.id ='track'+field+1;
            Node2.classList.add('cover');
            Node.appendChild(Node2);
            var SongNode = document.createElement('div');
            SongNode.classList.add('song');
            var SongnameNode = document.createElement('div');
            var mar1 = document.createElement('marquee');
            mar1.innerHTML=song_name;
            var AlbumnameNode = document.createElement('div');
            var mar2 = document.createElement('marquee');
            mar2.innerHTML = album_name;
            AlbumnameNode.appendChild(mar2);
            SongnameNode.appendChild(mar1);
            SongNode.appendChild(SongnameNode);
            SongNode.appendChild(AlbumnameNode);
            Node.appendChild(SongNode);
            slider.appendChild(Node);
            document.querySelector('#track'+field+1).children.namedItem(['track'+field+1]).style.backgroundImage=cover;
          });
      });
  });
// let bg;

// async function loadTracks() {
//     var song_name;
//     var album_name;
//     var artist;
//     var cover;
//     for (let index = 0; index < list; index++) {
//         console.log(audio.src);
//         jsmediatags.read(audio.src, {
//             onSuccess: function (tag) {
//                 try {
//                     // Array buffer to base64
//                     const data = tag.tags.picture.data;
//                     const format = tag.tags.picture.format;
//                     let base64String = "";
//                     for (let i = 0; i < data.length; i++) {
//                         base64String += String.fromCharCode(data[i]);
//                     }
//                     cover = 'url(data:' + format + ';base64,' + window.btoa(base64String) + ')';
//                     console.log(cover);
//                     song_name = tag.tags.title;
//                     artist = tag.tags.artist;
//                     album_name = tag.tags.album;
//                 } catch (error) {
//                     console.log(error);
//                     // picture.style.backgroundImage = 'url(music.jpg)';
//                     song_name = audio.src.substring((audio.src).lastIndexOf('/') + 1);
//                     artist = 'Unknown';
//                     album_name = 'Unknown';
//                 }
//                 var Node = document.createElement('div');
//                 Node.classList.add('track');
//                 var Node2 = document.createElement('div');
//                 Node.id = Node2.id ='track'+index;
//                 Node2.classList.add('cover');
//                 Node.appendChild(Node2);
//                 var SongNode = document.createElement('div');
//                 SongNode.classList.add('song');
//                 var SongnameNode = document.createElement('div');
//                 var mar1 = document.createElement('marquee');
//                 mar1.innerHTML=song_name;
//                 var AlbumnameNode = document.createElement('div');
//                 var mar2 = document.createElement('marquee');
//                 mar2.innerHTML = album_name;
//                 AlbumnameNode.appendChild(mar2);
//                 SongnameNode.appendChild(mar1);
//                 SongNode.appendChild(SongnameNode);
//                 SongNode.appendChild(AlbumnameNode);
//                 Node.appendChild(SongNode);
//                 slider.appendChild(Node);
//                 document.querySelector('#track'+index).children.namedItem(['track'+index]).style.backgroundImage=cover;
//             }
//         });
//     }
// }

// window.onload = loadTracks();
// document.body.onload = async function() {
//     let response = await fetch('https://source.unsplash.com/user/mvds/1920x1080', {method: "GET", headers: {"Content-type": "application/json;charset=UTF-8"}}).then(data => {
//         return data.blob()
//     });
//     var reader = new FileReader();
//     reader.readAsDataURL(response);
//     reader.onloadend = async () => {
//         this.bg = reader.result;
//         document.body.style.backgroundImage = "url('"+this.bg+"')";
//         // console.log(bg);
//         image = new SimpleImage(this.bg);
//     }
//     console.log(bg);
// };

audio.onloadedmetadata = function () {
    var tmp = audio.duration;
    var min = tmp / 60 | 0;
    if (min < 10) min = "0" + min;
    var sec = tmp % 60 | 0;
    if (sec < 10) sec = "0" + sec;
    duration.innerHTML = min + ":" + sec;
    console.log(audio.duration)
};
let mShowing = false;
menu.addEventListener('click', () => {
    if (!mShowing) {
        slider.classList.add("translate");
        menu.classList.add('open');
    }
    else {
        slider.classList.remove("translate");
        menu.classList.remove('open');
    }
    mShowing = !mShowing;
});

function changePlaystate() {
    var data = playbtn.className;
    if (data.search('pause') == -1) {
        playbtn.classList.remove('play');
        playbtn.classList.add('pause');
        // album.classList.add('animate');

        album.classList.add('play-state')
        audio.play()

    } else {
        playbtn.classList.remove('pause');
        playbtn.classList.add('play');
        // album.classList.remove('animate');
        album.classList.remove('play-state');
        audio.pause()
    }
}
playbtn.addEventListener('click', changePlaystate)

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
        changePlaystate();
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
