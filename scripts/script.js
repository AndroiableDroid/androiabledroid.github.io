let slider = document.querySelector(".tracker")
console.log(slider)
let menu = document.getElementById('menu');
let mShowing = false;
menu.addEventListener('click', () => {
    if (!mShowing)
        slider.classList.add("translate");
    else
        slider.classList.remove("translate");
    mShowing = !mShowing;
});