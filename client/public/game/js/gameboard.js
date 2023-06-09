// Get Canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = new Image();
backgroundImage.src = './images/MapProjectZoomedPng1.png';
canvas.width = 1024;
canvas.height = 576;
window.interactionObject = []
window.WASDenabled = true;

const movementSpeedMultiplier = 10


let colArrMap = []
for (let i = 0; i < colArr.length; i += 60) {
    colArrMap.push(colArr.slice(i, 60 + i)) //slicing the main collisions array into rows of 60(amount of tiles per row)
}
const boundaries = []
const offsetBoundary = {  //offsetting boundary to match where map is positioned
    x: -150,
    y: -600
}
colArrMap.forEach((row, j) => {
    row.forEach((symbol, k) => {
        if (symbol === 4750)
            boundaries.push(
                new Boundary({
                    position: {
                        value: this.symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                }))
    })
});
const interactionZoneMap = []
for (let i = 0; i < interactionArrData.length; i += 60) {
    interactionZoneMap
        .push(interactionArrData.slice(i, 60 + i))
}
//made an array of 60 arrays containing the interactions tiles

const interactions = [];
interactionZoneMap.forEach((row, j) => {
    row.forEach((symbol, k) => {
        if (symbol === 4750) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        } else if (symbol === 2020) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        } else if (symbol === 1010) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        }
        else if (symbol === 5050) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        } else if (symbol === 6060) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        }
        else if (symbol === 3030) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        }
        else if (symbol === 9090) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        }
        else if (symbol === 8080) {
            interactions.push(
                new Boundary({
                    position: {
                        value: symbol,
                        x: k * Boundary.width + offsetBoundary.x,
                        y: j * Boundary.height + offsetBoundary.y
                    }
                })
            );
        }
    });
});

console.log('interactions are working');

//orients the canvas to size
ctx.fillRect(0, 0, canvas.width, canvas.height);
//import zoomed map, must be zoomed to 400% to look to scale 
//importing sprite. i will have to take whatever the choose and make custom sprite sheets
const spriteGuy = new Image()


//wait for sprite to load 

const spriteGuyUP = new Image()
spriteGuyUP.src = "./images/barfUp.png"
const spriteGuyDOWN = new Image()
spriteGuyDOWN.src = "./images/barfDown.png"
const spriteGuyLEFT = new Image()
spriteGuyLEFT.src = "./images/barfLeft.png"
const spriteGuyRIGHT = new Image()
spriteGuyRIGHT.src = "./images/barfRight.png"
// backgroundImage.onload = () => {
//     //might need to change x and y to position where the screen starts

// }
//classes for images.
const newDude = new Sprite({
    position: {
        x: canvas.width / 2 - 256 / 4 / 2, // these two should perfectly center this.image on canvas if he is 256/64,
        y: canvas.height / 2 - 64 / 2,
    },
    image: spriteGuyDOWN,
    frames: {
        max: 4
    },
    sprites: {
        up: spriteGuyUP,
        down: spriteGuyDOWN,
        left: spriteGuyLEFT,
        right: spriteGuyRIGHT,
    }
})

const background = new Sprite({
    position: {
        x: offsetBoundary.x,
        y: offsetBoundary.y
    },
    image: backgroundImage
})
//adding foreground layers. will set to render last so they appear above the NewGuy 
const foregroundImg = new Image()
foregroundImg.src = "./images/gameLayers/MainForeground1.png"
const foreground = new Sprite({
    position: {
        x: offsetBoundary.x,
        y: offsetBoundary.y
    },
    image: foregroundImg
})
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}
//make a test boundary to see if it works
const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})
const moveables = [background, ...boundaries, foreground, ...interactions]
//below function replaced my giant if statement that covered how the collision was narrowed down to the collision array objects positions on the map
function boxCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x && rectangle1.position.x <= rectangle2.position.x + rectangle2.width && rectangle1.position.y <= rectangle2.position.y + rectangle2.height && rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}
let characterX=0;
let characterY=0;

//animation loop
function animate() {
    const gameanimation = window.requestAnimationFrame(animate) //infinite loop for the animation 
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    interactions.forEach(interaction => {
        interaction.draw();
    });

    newDude.draw()
    foreground.draw()
    // if(spriteGuy.position.x + spriteGuy.width)
    //if statement for key actions to follow. !!!!! somewhere in movement there is a glitch that freezes right side obstacle interaction  



    //key to triggering interaction 
    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < interactions.length; i++) {
            const interaction = interactions[i];
            if (
                boxCollision({
                    rectangle1: newDude,
                    rectangle2: interaction
                })
            ) {
                if (interaction.position.value === 4750) {


                    console.log("Interacting with zara");
                    window.interactionObject = "zara"
                } else if (interaction.position.value === 6060) {
                    console.log("Interacting with hydra");
                    window.interactionObject = "hydra"
                } else if (interaction.position.value === 3030) {
                    console.log("Interacting with abe");
                    window.interactionObject = "abe"
                } else if (interaction.position.value === 2020) {
                    console.log("Interacting with shady");
                    window.interactionObject = "shady"
                } else if (interaction.position.value === 1010) {
                    console.log("Interacting with taylor");
                    window.interactionObject = "taylor"
                } else if (interaction.position.value === 5050) {
                    console.log("Interacting with violet");
                    window.interactionObject = "violet"
                } else if (interaction.position.value === 9090) {
                    console.log("interacting with spaceship");
                    window.interactionObject = "spaceship"
                    //if barf has item(s) in inventory and spacebar is pressed then function EndGame()
                }  else if (interaction.position.value === 8080) {
                    console.log("interacting with the shaman");
                    window.interactionObject = "shaman"
                }
                
                break;
            } else{   //this is important to the interactions // 
                window.interactionObject = ''   
               
            }
        }
    }


    let moving = false
    newDude.moving = false
    if (keys.w.pressed && lastkey === 'w') {
        moving = true
        newDude.moving = true
        newDude.image = newDude.sprites.up
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                boxCollision({
                    rectangle1: newDude,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + movementSpeedMultiplier //'predicting' that a boundary is about to get hit by using a 3pixel buffer
                        }
                    }
                })
            ) {
                console.log('collision')
                moving = false   //making a break and movement stop so the map quits moving and js quits detecting for other boundaries because it keeps giving a false reading 
                break
            }
        }
        if (moving)
            moveables.forEach(moveable => {
                moveable.position.y += movementSpeedMultiplier
            })
    } else if (keys.a.pressed && lastkey === 'a') {
        moving = true
        newDude.moving = true
        newDude.image = newDude.sprites.left
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                boxCollision({
                    rectangle1: newDude,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + movementSpeedMultiplier,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log('collision')
                moving = false
                break
            }
        } if (moving)
            moveables.forEach(moveable => { moveable.position.x += movementSpeedMultiplier })
    } else if (keys.s.pressed && lastkey === 's') {
        moving = true
        newDude.moving = true
        newDude.image = newDude.sprites.down
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                boxCollision({
                    rectangle1: newDude,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - movementSpeedMultiplier
                        }
                    }
                })
            ) {
                console.log('collision')
                moving = false
                break
            }
        } if (moving)
            moveables.forEach(moveable => { moveable.position.y -= movementSpeedMultiplier })
    } else if (keys.d.pressed && lastkey === 'd') {
        moving = true
        newDude.moving = true
        newDude.image = newDude.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                boxCollision({
                    rectangle1: newDude,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - movementSpeedMultiplier,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log('collision')
                moving = false
                break
            }
        } if (moving)
            moveables.forEach(moveable => { moveable.position.x -= movementSpeedMultiplier })
    }
    characterX = newDude.position.x;
  characterY = newDude.position.y;
}

//listen for the keydown 
let lastkey = ''
window.addEventListener('keydown', (e) => {
    if (!window.WASDenabled) return
    // console.log('e.key') //logging the keydown event
    switch (e.key) {  //switch case for keydown 
        case 'w':
            keys.w.pressed = true
            lastkey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastkey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastkey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastkey = 'd'
            break
    }
})
animate()
window.addEventListener('keyup', (e) => {
    //logging the keyup event
    switch (e.key) {  //switch case for keyup 
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})


// window.addEventListener('keydown', function (event) {
//     if (event.key === 'e' || event.key === 'e') {
//     let inventoryContainer = document.getElementById('inventoryContainer');
//     if (inventoryContainer.style.display === 'none') {
//         inventoryContainer.style.display = 'block';
//     } else {
//         inventoryContainer.style.display = 'none';
//     }
// }
// });




function animateTheIntroZoom1() {
    var tl = gsap.to("#handheldNintendoContainer", {
        duration: 3,
        scale: 3,
        opacity: .3,
        onComplete: function () {
            window.location.href = "/game";
        }
    });

}
//i know this looks like a mess but i spent at least an hour trying to get this to run every other way.  


const images = document.querySelectorAll('.image-container');
const numImages = images.length;


gsap.set(images, { opacity: 0 });

function preloadImages() {
    let loadedImages = 0;

    for (let i = 0; i < numImages; i++) {
        const img = new Image();
        img.onload = function () {
           
         loadedImages++;
            if (loadedImages === numImages) {

            }
        };
        img.src = images[i].querySelector('img').src;
    }
}
preloadImages()
function showNextImage() {
    const currentImage = images[0];
    const nextImage = images[1];

    gsap.set(currentImage, { opacity: 0 });
    gsap.set(nextImage, { opacity: 1 });

    images[0] = nextImage;
    images[1] = currentImage;

    startSlideshow();
}
function startSlideshow() {
    gsap.set('#gameCanvas', { opacity: 1});
    gsap.to('#gameCanvas', { duration: 1, Opacity: 0 })
    gsap.set(images[0], { opacity: 0 });
    gsap.to(images[0], { duration: 1.5, opacity: 1, delay: 1.8, onComplete: fadeOutFirstImage });
  }
  
  function fadeOutFirstImage() {
    gsap.to(images[0], { duration: 1.5, opacity: 0, delay: 2, onComplete: fadeInSecondImage });
  }
  
  function fadeInSecondImage() {
    gsap.set(images[1], { opacity: 0 });
    gsap.to(images[1], { duration: 1.5, opacity: 1 });
  }
function endGame() {
    startSlideshow();
}
//endGame()
const introImages = document.querySelectorAll('.image-container1');
const introNumImages = introImages.length;

// gsap.set(introImages, { opacity: 0 });

// function hideCanvas() {
//   const canvas = document.querySelector('#gameCanvas');
//   canvas.style.display = 'none';
// }

// function startSlideshow1() {
//   gsap.set(introImages[0], { opacity: 1 });
//   gsap.to(introImages[0], { duration: 1.5, opacity: 0, delay: 3, onComplete: fadeInSecondImage });
// }

// function fadeInSecondImage() {
//   gsap.set(introImages[1], { opacity: 0 });
//   gsap.to(introImages[1], { duration: 1.5, opacity: 1, delay: 1, onComplete: fadeOutSecondImage });
// }

// function fadeOutSecondImage() {
//   gsap.to(introImages[1], { duration: 1.5, opacity: 0, delay: 3, onComplete: fadeInThirdImage });
// }

// function fadeInThirdImage() {
//   gsap.set(introImages[2], { opacity: 0 });
//   gsap.to(introImages[2], { duration: 1.5, opacity: 1, delay: 1, onComplete: fadeOutThirdImage });
// }

// function fadeOutThirdImage() {
//   gsap.to(introImages[2], { duration: 1.5, opacity: 0, delay: 3, onComplete: fadeInFinalImage });
// }

// function fadeInFinalImage() {
//   gsap.set(introImages[3], { opacity: 0 });
//   gsap.to(introImages[3], { duration: 1.5, opacity: 1, delay: 1, onComplete: fadeOutFinalImage });
// }

// function fadeOutFinalImage() {
//   gsap.to(introImages[3], { duration: 1.5, opacity: 0, delay: 3, onComplete: showCanvas });
// }

// function showCanvas() {
//   const canvas = document.querySelector('#gameCanvas');
//   canvas.style.display = 'block';
// }



// hideCanvas(); // Hide the canvas initially

// //need to make a function that renders dialog box png and then animates the p tag across the image based on z index 
// gsap.set("#dialogue-container2", { opacity: 0 });

// window.onload = function() {
//   startSlideshow1();
//   setTimeout(startAnimation,20000); // Delay of 28 seconds (28000 milliseconds)
// };

// function startAnimation() {
//   gsap.to("#dialogue-container2", {
//     duration: 1,
//     opacity: 1,
//     onStart: typeText
//   });
// }

// function typeText() {
//   const text = document.getElementById("text");
//   const textContent = text.innerHTML.trim();
//   text.innerHTML = "";

//   let charIndex = 0;
//   const typing = setInterval(function() {
//     text.innerHTML += textContent[charIndex];
//     charIndex++;

//     if (charIndex >= textContent.length) {
//       clearInterval(typing);
//       setTimeout(fadeOut, 60000); // Delay of 1 minute (60000 milliseconds)
//     }
//   }, 100); // Typing speed: 100 milliseconds per character
// }

// function fadeOut() {
//   gsap.to("#dialogue-container2", {
//     duration: 1,
//     opacity: 0,
//     onComplete: removeDialogueContainer
//   });
// }

// function removeDialogueContainer() {
//   document.getElementById("dialogue-container2").style.display = "none";
// }
console.log(`Character position: x = ${characterX}, y = ${characterY}`)




