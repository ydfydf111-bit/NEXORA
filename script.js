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


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();


function createParticles() {

    particles = [];

    const amount =
        window.innerWidth < 600
            ? 45
            : 90;


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
                2 +
                0.5,

            speed:
                Math.random() *
                0.4 +
                0.1,

            opacity:
                Math.random() *
                0.7 +
                0.2,

            drift:
                (Math.random() - 0.5) *
                0.2

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

            particle.x +=
                particle.drift;


            if (
                particle.y <
                -10
            ) {

                particle.y =
                    height + 10;

                particle.x =
                    Math.random() *
                    width;

            }


            if (
                particle.x <
                -10
            ) {

                particle.x =
                    width + 10;

            }


            if (
                particle.x >
                width + 10
            ) {

                particle.x =
                    -10;

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
                    160,
                    220,
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
   LOADER
========================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "loader"
                    );

                loader.classList.add(
                    "hidden"
                );

            },
            1000
        );

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
            0.12
        );

        setTimeout(
            () => {

                playSound(
                    660,
                    0.12
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
   EXPLORE
========================================= */

const exploreButton =
    document.getElementById(
        "exploreButton"
    );


exploreButton.addEventListener(
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
            0.08
        );

    }
);



/* =========================================
   CORE 3D MOUSE EFFECT
========================================= */

const core =
    document.getElementById(
        "core"
    );


window.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth <
            900
        ) {

            return;

        }


        const x =
            (
                event.clientX /
                window.innerWidth -
                0.5
            ) * 20;


        const y =
            (
                event.clientY /
                window.innerHeight -
                0.5
            ) * 20;


        core.style.transform =
            `
            rotateY(${x}deg)
            rotateX(${-y}deg)
            `;

    }
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
            audioContext.createOscillator();


        const gain =
            audioContext.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.value =
            frequency;


        gain.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.04,
            audioContext.currentTime +
            0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
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
            "Audio not available"
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
                0.1
            );

        }

    }
);



/* =========================================
   COUNTER
========================================= */

const counter =
    document.getElementById(
        "counter"
    );


let current =
    0;


const target =
    12847;


function updateCounter() {

    if (
        current >= target
    ) {

        counter.textContent =
            target.toLocaleString();

        return;

    }


    current +=
        Math.ceil(
            target / 100
        );


    if (
        current > target
    ) {

        current =
            target;

    }


    counter.textContent =
        current.toLocaleString();


    requestAnimationFrame(
        updateCounter
    );

}


setTimeout(
    updateCounter,
    1200
);



/* =========================================
   BUTTON HOVER SOUND
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
                        0.04
                    );

                }
            );

        }
    );
