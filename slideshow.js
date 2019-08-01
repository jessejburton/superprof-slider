const GALLERY_CONTAINER = document.querySelector(".gallery-container");
const THUMBNAIL_CONTAINER = document.querySelector(".thumbnail-container");
const NUMBER_OF_IMAGES = 5;
const SCROLL_SPEED = 3;

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

var galleryWidth, thumbnailWidth;  // These get recalculated on resize so they need to be variable
var activeImage = 3;               // This will change when a thumbnail is clicked;

/* INIT */
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
function loadThumbnails(images) {
  // images must be the path (not html)
  updateWidths();
  //clearThumbnails(); //TODO - remove contents of thumbnail-container 
  console.log(images);

  images.forEach((image) => {
    THUMBNAIL_CONTAINER.append(createThumbnail(image, thumbnailWidth)); //createThumbnail returns html div object
  });

  // Start with one image off screen
  THUMBNAIL_CONTAINER.style.left = `-${thumbnailWidth}px`;
}

/* TABS */
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

  tabs.firstChild.classList.add("active"); // Make the first tab active
}

const TABS = document.querySelectorAll('.tab');
TABS.forEach((tab) => { //add event listener to tabs, load new set of slides
  tab.addEventListener("click", (el) => {
    var element = el.target;
    var show = element.datasetTABS; // Which show to show
    console.log("what is: " + show);

    // Remove previous active class
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
  THUMBNAIL.classList.add('thumbnail');
  THUMBNAIL.style.width = `${width}px`;
  THUMBNAIL.setAttribute("data-src", src);
  THUMBNAIL.setAttribute("onClick", 'thumbnailClickHandler(this)');

  const IMG = document.createElement("img");
  IMG.src = src;

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
