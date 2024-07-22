//background star animation

/*function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * -10}vh`;
    star.style.animationDuration = `${Math.random() * 5 + 5}s`;

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 10000);
}

setInterval(createStar, 100);*/

//scroll down animation

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetClass = this.getAttribute('href').substring(1); // '#' karakterini çıkarır
        const targetElement = document.querySelector('.' + targetClass);

        if (targetElement) {
            const targetPosition = targetElement.offsetTop - 0;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

//back up button

document.querySelector('.button').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//see more button
const seeMoreBtn = document.getElementById('seeMoreBtn');
const undoBtn = document.getElementById('undoBtn');
const hiddenItems = document.querySelectorAll('.hidden');

seeMoreBtn.addEventListener('click', function () {
    hiddenItems.forEach(item => {
        item.classList.remove('hidden');
    });
    this.classList.add('hidden');
    undoBtn.classList.remove('hidden');
});

undoBtn.addEventListener('click', function () {
    hiddenItems.forEach(item => {
        item.classList.add('hidden');
    });
    seeMoreBtn.classList.remove('hidden');
    this.classList.add('hidden');
});

//tessimional

const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const slide = document.querySelector('.slide');

let currentIndex = 0;

leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slide.childElementCount - 2;
    }
    updateSlidePosition();
});

rightBtn.addEventListener('click', () => {
    if (currentIndex < slide.childElementCount - 2) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlidePosition();
});

function updateSlidePosition() {
    const slideWidth = document.querySelector('.card').clientWidth;
    slide.style.transform = `translateX(-${currentIndex * (slideWidth + 120)}px)`;
}


// open option 

function openPanel() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function closePanel() {
    document.getElementById("overlay").style.display = "none";
  }
  
  function redirectTo(option) {
    if (option === 'login') {
      window.location.href = 'login.html'; // Login
    } else if (option === 'signup') {
      window.location.href = 'singup.html'; // Signup
    } else if (option === 'google') {
        window.location.href = 'signup.html'; // google singup/login
      }
  }

// login

document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const createAccountButton = document.querySelector('.ca');

    if (userEmail) {
        document.getElementById('userEmail').textContent = `Logged in as: ${userEmail}`;
        document.getElementById('logOut').style.display = 'inline-flex';
        createAccountButton.style.display = 'none';
    }
});

function logOut() {
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

function createAccount() {
    window.location.href = 'singup.html';
}