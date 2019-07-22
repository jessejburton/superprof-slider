const arr = [
  'images/StrangemorePHOTO-8299.jpg',
  'images/StrangemorePHOTO-8304.jpg',
  'images/StrangemorePHOTO-8306.jpg',
  'images/StrangemorePHOTO-8120.jpg',
  'images/StrangemorePHOTO-8151.jpg',
  'images/StrangemorePHOTO-8155.jpg',
  'images/StrangemorePHOTO-8340.jpg'
]

var dir = "left";

const shiftRight = () => {
  const x = arr.shift();
  arr.push(x);
  dir = "right";
  populateImages(arr);
}

const shiftLeft = () => {
  const x = arr.pop();
  arr.unshift(x);
  dir = "left";
  populateImages(arr);
}

const populateImages = (images) => {

  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail, index) => {
    thumbnail.innerHTML = "";
    thumbnail.append(createImage(images[index], dir));
  })

}

const createImage = (src, className) => {

  const img = document.createElement("img");
  img.classList.add(className);
  img.src = src;
  return img;

}

populateImages(arr);

