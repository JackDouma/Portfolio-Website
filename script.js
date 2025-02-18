// Jackson Douma
// Portfolio Website JS
// February 17, 2025

let shootingStarInterval;

document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById("toggle");
    const savedTheme = localStorage.getItem("theme");
    const menuToggle = document.getElementById("menuToggle");
    const navRight = document.querySelector(".navRight");

    // get saved theme and apply
    if (savedTheme) 
    {
        if (savedTheme === "space") 
        {
            applySpaceTheme();
        } 
        else 
        {
            applyDarkTheme();
        }
    }

    // background listener 
    toggle.addEventListener("change", function() {
        if (toggle.checked) 
        {
            applySpaceTheme();
        } 
        else 
        {
            applyDarkTheme();
        }
    });

    // letter listener
    document.querySelectorAll('.letter').forEach(span => {
        span.addEventListener('mouseenter', applyHackerEffect);
    });

    // menu listener for phones
    menuToggle.addEventListener("click", function () {
        navRight.classList.toggle("active");
    });

    // click outside hamburger listener
    document.addEventListener("click", function (event) {
        if (!navRight.contains(event.target) && !menuToggle.contains(event.target)) 
        {
            navRight.classList.remove("active");
        }
    });
});

function applyDarkTheme()
{
    const info = document.querySelector(".info");
    const toggle = document.getElementById("toggle");

    toggle.checked = false;
    document.body.style.background = "linear-gradient(to right, #12100E, #263752)";
    info.textContent = "Space Theme";
    localStorage.setItem("theme", "dark");
    removeBackgroundStars();
    stopShootingStars();
}

function applySpaceTheme()
{
    const info = document.querySelector(".info");
    const toggle = document.getElementById("toggle");

    toggle.checked = true;
    document.body.style.background = "linear-gradient(to right, #09162a, #0d284d, #113b72, #194f99)";
    info.textContent = "Dark Theme";
    localStorage.setItem("theme", "space");
    createBackgroundStars();
    startShootingStars();
}

// create shooting stars at random intervals
function startShootingStars() 
{
    // 25% chance every 3 seconds
    shootingStarInterval = setInterval(() => {
        if (Math.random() > 0.75) 
        {
            createShootingStar();
        }
    }, 3000); 
}

// applies hacker effect to a letter
function applyHackerEffect(event) 
{
    const letter = event.target;
    const originalText = letter.textContent;

    // change letter fast
    let interval = setInterval(() => {
        letter.textContent = getRandomLetter();
        console.log("test");
    }, 50);

    // when the mouse leaves hover, go back to original letter
    letter.addEventListener('mouseleave', () => {
        clearInterval(interval);
        letter.textContent = originalText;
    });
}

// gets random letter from list
function getRandomLetter() 
{
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
}

// create and place stars randomly for background
function createBackgroundStars() 
{
    const totalStars = 200;

    for (let i = 0; i < totalStars; i++) 
    {
        let star = document.createElement('div');
        star.classList.add('backgroundStar');

        // Randomize position
        let x = Math.random() * window.innerWidth - 20;
        let y = Math.random() * document.documentElement.scrollHeight - 20;

        star.style.left = x + 'px';
        star.style.top = y + 'px';

        // randomize animation delay for twinkling effect
        star.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(star);
    }
}

// remove stars
function removeBackgroundStars() 
{
    const stars = document.querySelectorAll('.backgroundStar');

    stars.forEach(star => {
        document.body.removeChild(star);
    });
}

function createShootingStar() 
{
    // create a shooting star
    let shootingStar = document.createElement('div');
    shootingStar.classList.add('shootingStar');

    // randomize start position
    let x, y
    if (Math.random() > 0.5)
    {
        x = window.innerWidth - 100;
    }
    else
    {
        x = 100;
    }
    y = Math.random() * document.documentElement.scrollHeight / 2;

    shootingStar.style.left = x + 'px';
    shootingStar.style.top = y + 'px';

    // determine direction based on star position
    if (x > window.innerWidth / 2) 
    {
        // down left
        shootingStar.style.animation = 'shootingLeft 1.5s linear forwards';
        shootingStar.classList.add('left');
    } 
    else 
    {
        // down right
        shootingStar.style.animation = 'shootingRight 1.5s linear forwards';
        shootingStar.classList.add('right');
    }

    document.body.appendChild(shootingStar);

    // remove shooting star after animation is done
    shootingStar.addEventListener('animationend', () => {
        document.body.removeChild(shootingStar);
    });
}

function stopShootingStars() 
{
    // stop any future shooting stars from creating
    clearInterval(shootingStarInterval);

    // remove any current shooting stars in animation
    const shootingStars = document.querySelectorAll('.shootingStar');
    shootingStars.forEach(star => {
        star.style.animation = 'none';
        document.body.removeChild(star);
    });
}