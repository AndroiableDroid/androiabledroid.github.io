let slider = document.querySelector(".tracker")
let playbtn = document.querySelector(".play")
let pausebtn = document.querySelector(".pause");
let prevbtn = document.querySelector(".previous");
let nextbtn = document.querySelector(".next");
let menu = document.getElementById('menu');
let audio = document.getElementById('audio');
let progress = document.querySelector('.progressfor');
let album = document.querySelector('.album');
let duration = document.querySelector('.tmright');
let currentTime = document.querySelector('.tmleft');
audio.onloadedmetadata = function() {
    var tmp = audio.duration;
    var min = tmp/60 | 0;
    if (min < 10) min = "0" + min;
    var sec = tmp % 60 | 0;
    if (sec < 10) sec = "0" + sec;
    duration.innerHTML= min + ":" + sec;
    console.log(audio.duration)
  };
let mShowing = false;
menu.addEventListener('click', () => {
    if (!mShowing) {
        slider.classList.add("translate");
        menu.classList.add('open');
    }
    else
        {slider.classList.remove("translate");
    menu.classList.remove('open');}
    mShowing = !mShowing;
});

function changePlaystate() {
    var data = playbtn.className;
    if (data.search('pause') == -1)
    {
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

audio.addEventListener('timeupdate', (e) => {
    var tmp = audio.currentTime;
    var dur = audio.duration
    var min = tmp/60 | 0;
    if (min < 10) min = "0" + min
    var sec = tmp % 60 | 0;
    if (sec < 10) sec = "0" + sec;
    currentTime.innerHTML= min + ":" + sec;
    var _progress = (tmp / dur) * 100;
    progress.style.width = _progress + "%";
    if (tmp == dur) {
        currentTime.innerHTML= "00:00";
        progress.style.width = "0%"
        changePlaystate();
    }
});