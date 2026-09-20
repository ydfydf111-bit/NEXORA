/* =========================================
   NEXORA
   JAVASCRIPT
========================================= */


/* =========================================
   PARTICLES
========================================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");


let width = 0;

let height = 0;

let particles = [];


function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth;

    height =
        canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600
            ? 45
            : 100;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                width,

            y:
                Math.random() *
                height,

            size:
                Math.random() *
                1.8 +
                .4,

            speed:
                Math.random() *
                .35 +
                .05,

            opacity:
                Math.random() *
                .7 +
                .2

        });

    }

}


createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(
        particle => {

            particle.y -=
                particle.speed;


            if (
                particle.y < 0
            ) {

                particle.y =
                    height;

                particle.x =
                    Math.random() *
                    width;

            }


            ctx.beginPath();


            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    190,
                    225,
                    255,
                    ${particle.opacity}
                )`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =========================================
   CORE MOUSE MOVEMENT
========================================= */

const core =
    document.getElementById(
        "core"
    );


window.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 900
        ) {

            return;

        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                .5
            ) * 18;


        const y =
            (
                event.clientY /
                window.innerHeight -
                .5
            ) * 18;


        core.style.transform =
            `
            rotateY(${x}deg)
            rotateX(${-y}deg)
            `;

    }
);



/* =========================================
   PLANET PARALLAX
========================================= */

const earth =
    document.getElementById(
        "earth"
    );


const ringPlanet =
    document.getElementById(
        "ringPlanet"
    );


const redPlanet =
    document.getElementById(
        "redPlanet"
    );


window.addEventListener(
    "mousemove",
    event => {

        const mouseX =
            event.clientX /
            window.innerWidth -
            .5;


        const mouseY =
            event.clientY /
            window.innerHeight -
            .5;


        if (window.innerWidth > 600) {

            earth.style.marginLeft =
                `${mouseX * 18}px`;

            earth.style.marginTop =
                `${mouseY * 18}px`;


            ringPlanet.style.marginLeft =
                `${mouseX * -15}px`;

            ringPlanet.style.marginTop =
                `${mouseY * -15}px`;


            redPlanet.style.marginLeft =
                `${mouseX * 25}px`;

            redPlanet.style.marginTop =
                `${mouseY * 25}px`;

        }

    }
);



/* =========================================
   POPUP
========================================= */

const popup =
    document.getElementById(
        "popup"
    );


const enterButton =
    document.getElementById(
        "enterButton"
    );


const closePopup =
    document.getElementById(
        "closePopup"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


enterButton.addEventListener(
    "click",
    () => {

        popup.classList.add(
            "active"
        );


        playSound(
            440,
            .12
        );


        setTimeout(
            () => {

                playSound(
                    660,
                    .12
                );

            },
            130
        );

    }
);


closePopup.addEventListener(
    "click",
    () => {

        popup.classList.remove(
            "active"
        );

    }
);


popup.addEventListener(
    "click",
    event => {

        if (
            event.target === popup
        ) {

            popup.classList.remove(
                "active"
            );

        }

    }
);


startButton.addEventListener(
    "click",
    () => {

        popup.classList.remove(
            "active"
        );


        document
            .getElementById(
                "discover"
            )
            .scrollIntoView({

                behavior:
                    "smooth"

            });

    }
);



/* =========================================
   EXPLORE BUTTON
========================================= */

document
    .getElementById(
        "exploreButton"
    )
    .addEventListener(
        "click",
        () => {

            document
                .getElementById(
                    "discover"
                )
                .scrollIntoView({

                    behavior:
                        "smooth"

                });


            playSound(
                330,
                .08
            );

        }
    );



/* =========================================
   COUNTER
========================================= */

const counter =
    document.getElementById(
        "counter"
    );


let number = 0;

const target = 12847;


function counterAnimation() {

    if (
        number >= target
    ) {

        counter.textContent =
            target.toLocaleString();

        return;

    }


    number +=
        Math.ceil(
            target / 100
        );


    if (
        number > target
    ) {

        number =
            target;

    }


    counter.textContent =
        number.toLocaleString();


    requestAnimationFrame(
        counterAnimation
    );

}


setTimeout(
    counterAnimation,
    1000
);



/* =========================================
   SOUND
========================================= */

let soundEnabled = true;

let audioContext = null;


const soundButton =
    document.getElementById(
        "soundButton"
    );


function playSound(
    frequency,
    duration
) {

    if (
        !soundEnabled
    ) {

        return;

    }


    try {

        if (
            !audioContext
        ) {

            audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }


        const oscillator =
            audioContext
                .createOscillator();


        const gain =
            audioContext
                .createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            .0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            .04,
            audioContext.currentTime +
            .01
        );


        gain.gain.exponentialRampToValueAtTime(
            .0001,
            audioContext.currentTime +
            duration
        );


        oscillator.connect(
            gain
        );


        gain.connect(
            audioContext.destination
        );


        oscillator.start();


        oscillator.stop(
            audioContext.currentTime +
            duration
        );

    }

    catch (error) {

        console.log(
            "Audio unavailable"
        );

    }

}


soundButton.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;


        soundButton.textContent =
            soundEnabled
                ? "🔊"
                : "🔇";


        if (
            soundEnabled
        ) {

            playSound(
                520,
                .1
            );

        }

    }
);



/* =========================================
   BUTTON SOUNDS
========================================= */

document
    .querySelectorAll(
        "button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    playSound(
                        250,
                        .04
                    );

                }
            );

        }
    );
