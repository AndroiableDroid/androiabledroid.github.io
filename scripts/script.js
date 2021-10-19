let slider = document.querySelector(".tracker")
let playbtn = document.querySelector(".play")
let pausebtn = document.querySelector(".pause");
let prevbtn = document.querySelector(".previous");
let nextbtn = document.querySelector(".next");
let menu = document.getElementById('menu');
let audio = document.getElementById('audio')
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

playbtn.addEventListener('click', () => {
    var data = playbtn.className;
    if (data.search('pause') == -1)
    {
        playbtn.classList.remove('play')
        playbtn.classList.add('pause')
        audio.play()
    } else {
        playbtn.classList.remove('pause')
        playbtn.classList.add('play')
        audio.pause()
    }
})