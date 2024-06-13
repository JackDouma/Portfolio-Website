let currentIndex = 0;
let lastStar = 0;
let lastGlow = 0;

// run on page load
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundStars();
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
    const totalStars = 100;

    for (let i = 0; i < totalStars; i++) 
    {
        let star = document.createElement('i');
        star.classList.add('backgroundStar', 'fas', 'fa-star');

        // Randomize position
        let x = Math.random() * document.documentElement.scrollWidth;
        let y = Math.random() * document.documentElement.scrollHeight;

        star.style.left = x + 'px';
        star.style.top = y + 'px';

        // randomize rotation between -20 and +20 degrees
        let tilt = (Math.random() - 0.5) * 40;
        star.style.transform = `rotate(${tilt}deg)`;

        // randomize animation delay for twinkling effect
        star.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(star);
    }
}
