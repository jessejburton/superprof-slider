const GALLERY_CONTAINER = document.querySelector(".gallery-container");
const THUMBNAIL_CONTAINER = document.querySelector(".thumbnail-container");
const NUMBER_OF_IMAGES = 5;
const SCROLL_SPEED = 3;
const SELECTED_IMAGE = 3;

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
      'slideshow/restaurants/brewers_dining_tv.jpg',
      'slideshow/restaurants/brewers_entrance_indoor.jpg',
      'slideshow/restaurants/brewers_entrance_view.jpg',
      'slideshow/restaurants/mariott_bar.jpg',
      'slideshow/restaurants/brewers_entrance_outdoor.jpg',
      'slideshow/restaurants/generic.jpg',
      'slideshow/restaurants/generic.jpg',
      'slideshow/restaurants/generic.jpg',
      'slideshow/restaurants/generic.jpg',
      'slideshow/restaurants/generic.jpg'
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


/* INIT */
function init() {
  loadTabs(SLIDE_DATA);
  loadThumbnails(SLIDE_DATA[1].images);
  selectThumbnail(SELECTED_IMAGE);
}
init();

/* EVENT LISTENERS */
document.querySelector(".gallery-container .prev").addEventListener("click", scrollLeft);
document.querySelector(".gallery-container .next").addEventListener("click", scrollRight);

/* LOADERS */
function loadThumbnails(images) {
  updateWidths();

  images.forEach((image) => {
    THUMBNAIL_CONTAINER.append(createThumbnail(image, thumbnailWidth));
  });

  // Start with one image off screen
  THUMBNAIL_CONTAINER.style.left = `-${thumbnailWidth}px`;
}

/* TABS */
function loadTabs(data) {
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

/* SCROLLING */
function scrollLeft() {
  updateWidths();
  clearActiveThumbnail();
  THUMBNAIL_CONTAINER.append(document.querySelector(".thumbnail"));

  var pos = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos >= thumbnailWidth) {
      clearInterval(id);
      setActiveThumbnail();
    } else {
      pos += SCROLL_SPEED;
      THUMBNAIL_CONTAINER.style.left = `-${pos}px`;
    }
  }
}

function scrollRight() {
  updateWidths();
  clearActiveThumbnail();
  THUMBNAIL_CONTAINER.prepend(document.querySelector(".thumbnail:last-child"));

  var pos = -thumbnailWidth * 2;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos >= -thumbnailWidth) {
      clearInterval(id);
      setActiveThumbnail();
    } else {
      pos += SCROLL_SPEED;
      THUMBNAIL_CONTAINER.style.left = `${pos}px`;
    }
  }
}

function clearActiveThumbnail() {
  const ACTIVE = document.querySelector(".thumbnail.active")
  if (ACTIVE !== null) ACTIVE.classList.remove("active");
}

function selectThumbnail(num) {
  clearActiveThumbnail();
  document.querySelector(`.thumbnail:nth-child(${num + 1})`).classList.add("active");
}

/* SELECTING */
function thumbnailClickHandler(thumbnail) {
  selectThumbnail(getPosition(thumbnail));
  showSlide(thumbnail.dataset.src);
}

// Show the selected image
function showSlide(src) {
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

function createThumbnail(src, width) {
  const THUMBNAIL = document.createElement("div");
  THUMBNAIL.classList.add('thumbnail');
  THUMBNAIL.style.width = `${width}px`;
  THUMBNAIL.setAttribute("data-src", src);
  THUMBNAIL.setAttribute("onClick", 'thumbnailClickHandler(this)');

  const IMG = document.createElement("img");
  IMG.src = src;

  THUMBNAIL.innerHTML = IMG.outerHTML;
  return THUMBNAIL;
}

function setThumbnailSize() {
  const THUMBNAILS = document.querySelectorAll(".thumbnail");

  updateWidths();
  THUMBNAILS.forEach((thumbnail) => {
    thumbnail.style.width = `${thumbnailWidth}px`;
  });
  THUMBNAIL_CONTAINER.style.left = `-${thumbnailWidth}px`;
}

function getPosition(element) {
  var i = 0;
  while ((element = element.previousSibling) != null)
    i++;

  return i;
}

window.onresize = setThumbnailSize;
