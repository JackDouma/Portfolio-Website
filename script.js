let currentIndex = 0;
let lastStar = 0;
let lastGlow = 0;

// run on page load
document.addEventListener('DOMContentLoaded', function() {
    //////////////////////////
    // create space effects //
    //////////////////////////
    createBackgroundStars();
    randomShootingStars();

    //////////////////////////
    // create hacker effect //
    //////////////////////////
    const skills = document.querySelectorAll('.skill');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&?";
    const changeSpeed = 100;
    const revealDelay = 500;


    const applyHackerEffect = (skill) => {
        // make text green
        skill.classList.add('hacker-effect');

        // get original text length or set to 10 if on smaller device
        const originalTextLength = window.innerWidth <=  768 ? 10 : skill.dataset.originalText.length;

        // repeat function that makes the text random over and over again
        let interval = setInterval(() => {
            skill.innerText = Array.from({ length: originalTextLength },
                () => letters[Math.floor(Math.random() * letters.length)]).join('');
        }, changeSpeed);

        return interval;
    };

    // save original text
    skills.forEach(skill => {
        skill.dataset.originalText = skill.innerText;
    });

    // give all text the hacker effect
    let intervals = [];
    skills.forEach(skill => {
        intervals.push(applyHackerEffect(skill));
    });

    // reveal original words 1 by 1
    let currentIndex = 0;
    const revealNextWord = () => {
        if (currentIndex < skills.length) 
        {
            clearInterval(intervals[currentIndex]);
            skills[currentIndex].innerText = skills[currentIndex].dataset.originalText;
            skills[currentIndex].classList.remove('hacker-effect');

            currentIndex++;
            setTimeout(revealNextWord, revealDelay);
        }
    };

    setTimeout(revealNextWord, revealDelay);
});

function changeSlide(direction) 
{
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    currentIndex += direction;

    if (currentIndex < 0) 
    {
        currentIndex = totalSlides - 1;
    } 
    else if (currentIndex >= totalSlides) 
    {
        currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('.next').addEventListener('click', () => changeSlide(1));

// pick random colour
function RandomColour(colours)
{
    const random = Math.floor(Math.random() * colours.length);
    return colours[random];
}

// this function is called when the mouse moves
function MouseEffects(e)
{
    StarEffect(e);
    GlowEffect(e);
}

// creates a fancy star effect
function StarEffect(e) 
{
    // make sure stars do not appear to close together
    let time = new Date().getTime();

    if (time - lastStar < 100)
    {
        return;
    }

    lastStar = time;
    
    // do not make stars while hovering over clickable
    let target = e.target;
    while (target) 
    {
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || (target.tagName === 'INPUT' && (target.type === 'button' || target.type === 'submit') || target.classList.contains('projectCard') || target.classList.contains('card')))
        {
            return; 
        }

        target = target.parentElement;
    }


    // get coords
    let x = e.clientX + window.scrollX;
    let y = e.clientY + window.scrollY;
    
    // create star using https://fontawesome.com/icons/star?f=classic&s=solid
    let star = document.createElement('i');
    star.classList.add('star', 'fas', 'fa-star');

    // randomize star colour
    const starColours = ["#fde68a", "#f0abfc", "#f9a8d4"]
    star.style.color = RandomColour(starColours);

    // place star
    star.style.left = x + 'px';  
    star.style.top = y + 'px';  
    document.body.appendChild(star);

    // delete star once animation is down
    star.addEventListener('animationend', () => {
        document.body.removeChild(star);
    });
}
function GlowEffect(e)
{
    // make sure the glow do not appear to close together
    let time = new Date().getTime();
    if (time - lastGlow < 5) 
    {
        return;
    }
    lastGlow = time;

    // get coords
    let x = e.clientX + window.scrollX;
    let y = e.clientY + window.scrollY;

    let glow = document.createElement("div");
    glow.classList.add('glow');
    
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    document.body.appendChild(glow);

    // delete glow once animation is done
    glow.addEventListener('animationend', () => {
        document.body.removeChild(glow);
    });
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

// create shooting stars at random intervals
function randomShootingStars() 
{
    // 50% chance every 3 seconds
    setInterval(() => {
        if (Math.random() > 0.5) 
        {
            createShootingStar();
        }
    }, 3000); 
}

document.querySelector('.skill')










