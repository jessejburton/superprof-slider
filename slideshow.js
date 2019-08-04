const GALLERY_CONTAINER = document.querySelector(".gallery-container");
const THUMBNAIL_CONTAINER = document.querySelector(".thumbnail-container");
const NUMBER_OF_IMAGES = 5;
const SCROLL_SPEED = 3;
const IMAGE_FOLDER = VARIABLES.templateUrl + '/slider/' || '/';

alert(IMAGE_FOLDER);


const SLIDE_DATA = [
  {
    title: 'Numbers',
    images: [
      'images/1.png',
      'images/2.png',
      'images/3.png',
      'images/4.jpg',
      'images/5.jpg',
      'images/6.png',
      'images/7.png',
      'images/8.jpg',
      'images/9.png',
      'images/10.jpg',
    ]
  },
  {
    title: 'Restaurants',
    images: [
      'images/restaurants/brewers_dining_tv.jpg',
      'images/restaurants/brewers_entrance_indoor.jpg',
      'images/restaurants/brewers_entrance_view.jpg',
      'images/restaurants/mariott_bar.jpg',
      'images/restaurants/brewers_entrance_outdoor.jpg',
      'images/restaurants/generic.jpg',
      'images/restaurants/generic.jpg',
      'images/restaurants/generic.jpg',
      'images/restaurants/generic.jpg',
      'images/restaurants/generic.jpg'
    ]
  },
  {
    title: 'Hotels',
    images: [
      'images/StrangemorePHOTO-8299.jpg',
      'images/StrangemorePHOTO-8304.jpg',
      'images/StrangemorePHOTO-8306.jpg',
      'images/StrangemorePHOTO-8340.jpg',
      'images/StrangemorePHOTO-8155.jpg',
      'images/StrangemorePHOTO-8151.jpg',
      'images/StrangemorePHOTO-8120.jpg'
    ]
  },
  {
    title: 'Renovations',
    images: [
      'images/IMG_2460.JPG',
      'images/IMG_2462.JPG',
      'images/IMG_2471.JPG'
    ]
  },
  {
    title: 'Additions',
    images: [
      'images/11-12-14 3 Brewers 019.jpg',
      'images/11-12-14 3 Brewers 034.jpg',
      'images/11-12-14 3 Brewers 043.jpg',
      'images/11-12-14 3 Brewers 093.jpg',
      'images/11-12-14 3 Brewers 097.jpg',
      'images/11-12-14 3 Brewers 101.jpg'
    ]
  },
  {
    title: 'Office',
    images: [
      'images/11-12-14 3 Brewers 019.jpg',
    ]
  },
  {
    title: 'Fit-Outs',
    images: [
      'images/11-12-14 3 Brewers 019.jpg',
    ]
  },
  {
    title: 'Design Build',
    images: [
      'images/11-12-14 3 Brewers 019.jpg',
    ]
  }
];

let galleryWidth, thumbnailWidth;  // These get recalculated on resize so they need to be variable
let activeImage = 3;               // This will change when a thumbnail is clicked;

/**
  * @desc Main initializing function
*/
function init() {
  loadTabs(SLIDE_DATA);
  loadThumbnails(SLIDE_DATA[1].images);
  selectThumbnail(activeImage);
}
init();

/* EVENT LISTENERS */
document.querySelector(".gallery-container .prev").addEventListener("click", scrollLeft);
document.querySelector(".gallery-container .next").addEventListener("click", scrollRight);

/* LOADERS */

/**
  * @desc Load the thumbnails for a specific gallery
  * @param string images - an array of image paths
*/
function loadThumbnails(images) {
  // images must be the path (not html)
  updateWidths();
  clearThumbnails();

  images.forEach((image) => {
    THUMBNAIL_CONTAINER.append(createThumbnail(image, thumbnailWidth)); //createThumbnail returns html div object
  });

  // Start with one image off screen
  THUMBNAIL_CONTAINER.style.left = `-${thumbnailWidth}px`;
}

/**
  * @desc Clear the contents of .thumbnail-container
*/
function clearThumbnails() {
  //TODO - Go ahead and write this function! Should br pretty simple :)
  document.querySelector(".thumbnail-container").innerHTML = "";
}

/* TABS */

/**
  * @desc Creates the tabs that allow switching between different galleryies
  * @param array data - An array of objects, each object has a title and an array of images.
*/
function loadTabs(data) { //tab position never changes, called only on load
  const tabs = document.getElementById("tabs");
  var index = 0;

  // Loop through each tab and add the data
  data.forEach((tab) => {
    const t = document.createElement("div");
    t.classList.add("tab");
    t.setAttribute("data-show", index);
    t.innerHTML = tab.title;

    tabs.append(t); // <div class="tab" data-show="$index">tab.title</div>

    index++;
  });

  addClickToTabs(); // Add the click handlers to the tabs
  tabs.firstChild.classList.add("active"); // Make the first tab active
}

/*
  There isn't an easy way to add event listeners to dynamically created elements (addEventListener doesn't work, pretty annoying actually!) one approach that I have used is with setAttribute('onclick', function(){});

  This will also need to get called AFTER the elements have been created so you can either put all of this code in a function and call it at the end of the loadTabs function, or you can call it on each tab as it is created in the loadTabs function. Both options are totally valid.
*/
function addClickToTabs() {
  const TABS = document.querySelectorAll('.tab');

  TABS.forEach((tab) => { //add event listener to tabs, load new set of slides

    const show = tab.dataset.show; // Which show to show

    tab.setAttribute("onClick", `clickTab(this)`);

  });

  /* PREVIOUS CODE - FOR REVIEW
  const TABS = document.querySelectorAll('.tab');
  TABS.forEach((tab) => { //add event listener to tabs, load new set of slides
    tab.addEventListener("click", (el) => {
      var element = el.target;
      var show = element.datasetTABS; // Which show to show
      console.log("what is: " + show);

      // Remove previous active class
      //!!! Since there is only one active at a time you can actually select and remove the class just from it. Less Looping.
      TABS.forEach((tab) => {
        tab.classList.remove('active');
      });

      // Update the slideshow - these funtions no longer exist
      currentSlide = 0;
      //loadSlides(show); //does not exist
      //loadGallery(show); //does not exist

      //TODO - correct $show must be array of img paths
      loadThumbnails(show); // err show not correct input type

      // Add the active class
      element.classList.add('active');
    })
  });
  */

}

function clickTab(tab) {
  // Remove existing active class
  document.querySelector('.tab.active').classList.remove('active');

  // Add the active class
  tab.classList.add("active");

  // Load the thumbnails
  const IMAGES = SLIDE_DATA[tab.dataset.show].images

  loadThumbnails(IMAGES);
  // Select the active thumbnail (lowest between the activeImage or the number of images).
  selectThumbnail(Math.min(activeImage, IMAGES.length - 1));
}

/* SCROLLING */
function scrollLeft() { //onclick function for left gallery button
  updateWidths();
  clearActiveThumbnail();
  THUMBNAIL_CONTAINER.append(document.querySelector(".thumbnail")); //querySelector returns first result, so first thumbnail in list moves to end

  var pos = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos >= thumbnailWidth) {
      clearInterval(id);
      selectThumbnail(activeImage);
    } else {
      pos += SCROLL_SPEED;
      THUMBNAIL_CONTAINER.style.left = `-${pos}px`;
    }
  }
}

function scrollRight() { //onclick funtion  for right gallery button
  updateWidths();
  clearActiveThumbnail();
  THUMBNAIL_CONTAINER.prepend(document.querySelector(".thumbnail:last-child")); //moves last html div in list to first position - ready to be the next leftmost image

  var pos = -thumbnailWidth * 2;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos >= -thumbnailWidth) {
      clearInterval(id);
      selectThumbnail(activeImage);
    } else {
      pos += SCROLL_SPEED;
      THUMBNAIL_CONTAINER.style.left = `${pos}px`;
    }
  }
}

function clearActiveThumbnail() { //removes html class "active"
  const ACTIVE = document.querySelector(".thumbnail.active")
  if (ACTIVE !== null) ACTIVE.classList.remove("active");
}

function selectThumbnail(num) { //sets global var activeImage, changes slide and thumbnail position with helper functions
  activeImage = num;
  clearActiveThumbnail();
  setActiveThumbnail();
}

function setActiveThumbnail() { //adds html class active to thumbnail matching activeImage index
  const THUMBNAIL = document.querySelector(`.thumbnail:nth-child(${activeImage + 1})`)
  THUMBNAIL.classList.add("active");
  showSlide(THUMBNAIL.dataset.src);
}

/* SELECTING */
function thumbnailClickHandler(thumbnail) { //onclick function attached to each thumbnail html div. helper funcs changes slide/gallery position
  selectThumbnail(getPosition(thumbnail));
  showSlide(thumbnail.dataset.src);
}

// Show the selected image
function showSlide(src) { //called when the image is changed
  const slide = document.getElementById('slide');
  const img = document.createElement('img');
  img.src = src;

  slide.innerHTML = img.outerHTML;
}

/* HELPERS */
function updateWidths() {
  galleryWidth = getElementWidth('.gallery-container');
  thumbnailWidth = galleryWidth / NUMBER_OF_IMAGES;
}

function getElementWidth(selector) {
  return document.querySelector(selector).offsetWidth;
}

function createThumbnail(src, width) { //loop each img - should be called on load, and each time project tab is changed
  const THUMBNAIL = document.createElement("div");
  const SRC = `${IMAGE_FOLDER}/${src}`;

  THUMBNAIL.classList.add('thumbnail');
  THUMBNAIL.style.width = `${width}px`;
  THUMBNAIL.setAttribute("data-src", SRC);
  THUMBNAIL.setAttribute("onClick", 'thumbnailClickHandler(this)');

  const IMG = document.createElement("img");
  IMG.src = SRC;

  THUMBNAIL.innerHTML = IMG.outerHTML;
  return THUMBNAIL; //returns html div
}

function setThumbnailSize() { //runs on resize
  const THUMBNAILS = document.querySelectorAll(".thumbnail");

  updateWidths();
  THUMBNAILS.forEach((thumbnail) => {
    thumbnail.style.width = `${thumbnailWidth}px`;
  });
  THUMBNAIL_CONTAINER.style.left = `-${thumbnailWidth}px`;
}

function getPosition(element) { //of thumbnail
  var i = 0;
  while ((element = element.previousSibling) != null) // false only if there is no element before
    i++; // i = position where 0 is first image

  return i;
}

window.onresize = setThumbnailSize;

