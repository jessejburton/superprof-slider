const slides = [
    'images/StrangemorePHOTO-8299.jpg',
    'images/StrangemorePHOTO-8304.jpg',
    'images/StrangemorePHOTO-8306.jpg',
    'images/StrangemorePHOTO-8340.jpg',
    'images/StrangemorePHOTO-8155.jpg',
    'images/StrangemorePHOTO-8151.jpg',
    'images/StrangemorePHOTO-8120.jpg'
]

const gallery = document.querySelector('.thumbnails-list');
const thumbnail = document.querySelector('.thumbnail.active');
console.log(thumbnail);
console.log(thumbnail.offsetWidth);


function moveRight(){
    var mv = gallery.style.right  + thumbnail.offsetWidth;
    gallery.style.right = `${mv}px`;
}