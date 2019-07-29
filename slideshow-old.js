/* CONSTANTS */

// References
const GALLERY = document.querySelector('.gallery-container');
const THUMBNAILS_LIST = document.querySelector('.thumbnails-list');

// For thumbnail gallery calculations
const GALLERY_CENTER = getCenter(GALLERY);
const IMAGE_WIDTH = 150;
const LEFT_SCROLL_POSITION = (GALLERY_CENTER - (IMAGE_WIDTH / 2)); // position to move selected thumbnail to
const SCROLL_SPEED = .1;

// const NUMBER_SLIDES = 5;
const SLIDE_DATA = [
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
var currentSlide = 0;

/* INIT */
const init = () => {
  loadTabs(SLIDE_DATA);
  // loadSlides(0);
  loadGallery(SLIDE_DATA[currentSlide]);
};
init();

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

/* GALLERY */
function loadGallery(data) {
  const thumbnails = data.images;
  const galleryUl = document.createElement('ul');
  var index = 0;

  thumbnails.forEach((thumbnail) => {
    var t = document.createElement('li');
    t.classList.add('thumbnail');
    t.classList.add('fade');
    t.setAttribute("data-index", index);
    t.setAttribute("data-src", thumbnail);

    // Place the image in the right location
    //t.style.left = `${(IMAGE_WIDTH * index)}px`;
    t.setAttribute("onClick", "selectImage(this)");

    const img = document.createElement('img');
    img.classList.add('thumbnail-image');
    img.src = thumbnail;

    t.append(img);
    galleryUl.append(t);



    if (index == 2) t.classList.add('active'); /* !!! Make this dynamic */

    index++;
  })

  document.getElementById('thumbnails-list').innerHTML = galleryUl.innerHTML;
  showSlide(data.images[0]); // Show the first slide in the gallery
};

function selectImage(thumbnail) {
  // Remove active class
  const ACTIVE = document.querySelector(".thumbnail.active");
  ACTIVE.classList.remove("active");

  // Add the class to the selected thumbnail
  thumbnail.classList.add("active");

  // Show the image
  showSlide(thumbnail.dataset.src);

  const LEFT = thumbnail.offsetLeft;
  const MOVE = LEFT_SCROLL_POSITION - LEFT;
}

function scrollGallery(direction) {
  const MOVE = IMAGE_WIDTH * direction;
  const POS = THUMBNAILS_LIST.offsetLeft;
  THUMBNAILS_LIST.style.left = `${MOVE + POS}px`;

  if (POS < 0) {
    THUMBNAILS_LIST.appendChild(THUMBNAILS_LIST.firstChild);
  }
}



/*
  Determine where the starting image needs to be
  based on the middle image being in the center
*/

/* HELPERS */

function getCenter(div) {
  return div.offsetWidth / 2;
}

// Return an array of images
function getGalleryImages(index) {
  return SLIDE_DATA[index].images;
}

// Show the selected image
function showSlide(src) {
  const slide = document.getElementById('slide');
  const img = document.createElement('img');
  img.src = src;

  slide.innerHTML = img.outerHTML;
}





/* SLIDES
function showSlides(n) {
  const slides = document.querySelectorAll(".slide");
  console.log(slides);

  if (n > slides.length) { currentSlide = 1 } // snap to beginning of slideshow

  if (n < 1) { currentSlide = slides.length } // fell off the end, show final slide

  slides.forEach((slide) => {
    slide.style.display = "none";
  })

  slides[currentSlide].style.display = "block";
}

* Notes
* This is good, the way this loops works great and the way you set things works well
* I would suggest rather then setting the styles here in Javascript it might work better
* to add and remove classes, that way you can change the style, add animation etc. in the css
* without having to touch the Javascript. This would allow the design to be seperated from the
* function which I have found is often helpful especially as projects grow.
*
* SUGGESTION
* Variable names - make meaningful whenever possible, only exception I personally use is in a loop
*                  (var i =0; i>=7; i++) anything else I just give a name. Since in production you
*                  will want to minify your .js anyways and one of the things minification does to
*                  save space is rename all variables to simple letters a, b, c etc.
*
* Check out this CodePen to see how I might do this
* https://codepen.io/jessejburton/pen/GVrJMM

*/


/*
function loadGallery(n) {

  //slides.forEach(s => {console.log (s.innerHTML)});

  var slides = [].slice.call(document.querySelectorAll(".myThumbnails"));
  var len = slides.length;
  var thumbnails = [];
  var index = n;

  slides.forEach((slide) => { slide.style.display = "none" });

  console.log("gallery:", { n }) //PRINT OUT

  //1. get array of 5 images
  if ((n - 3) < 0) {
    console.log("a");
    thumbnails = slides.slice(n - 3).concat(slides.slice(0, n + 2));
  }
  else if ((n + 2) > len) {
    console.log("b");
    thumbnails = slides.slice(n - 3).concat(slides.slice(0, ((n + 1) - (len - 1))));
  }
  else {
    console.log("b");
    thumbnails = slides.slice((n - 3), (n + 2));
  }

  index = 0;
  order = ["one", "two", "three", "four", "five"];

  thumbnails.forEach((thumbnail) => {
    thumbnail.setAttribute("id", `${order[index]}`);
    thumbnail.style.display = "block";
    index++;
  })
}

* Notes
* So to confirm, this function is getting all of the thumbnails and then setting
* id's on 5 of them based on the number that is passed in?
*
* I would also suggest using classes instead of setting properties in this case so
* you can more easily change multiple properties and animate.
*
* Another option to using an ID is to use the data- attribute, this way you can create
* your own meaningful attributes. data- attributes must be lowercase, so in this case
* you could use something like data-index="one" and then to access it you would use
* element.dataset.index. Besides having a more meaningful name it also helps prevent
* possible issues if the id needs to be used for something else. That being said, the
* approach you took with using the id's is perfectly valid and will work just fine.
*
* The math definitely gets a little confusing in here, I think a simpler approach
* might be to rearrange the array by shifting it and then re-populating the div with
* the content.
*
* Check out this CodePen to see how I might do this
* https://codepen.io/jessejburton/pen/QedZYJ
*
* I hadn't seen this method for converting a NodeList to an array, very cool!
* var slides = [].slice.call(document.querySelectorAll(".myThumbnails"));
*


*/











/* CONTROLS */

/* TAB CONTROLS
const tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener("click", (el) => {
    var element = el.target;
    var show = element.dataset.show; // Which show to show

    // Remove previous active class
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Update the slideshow
    currentSlide = 0;
    loadSlides(show);
    loadGallery(show);

    // Add the active class
    element.classList.add('active');
  })
});


// Next/previous controls
function plusSlides(n) {
  currentSlide = (currentSlide + n) % document.querySelectorAll(".mySlides").length;
  var shift = currentSlide
  showSlides(shift);
  loadGallery(shift);
}

// Thumbnail image controls
function currentSlide(n) {
  currentSlide = n;
  shift = currentSlide;
  showSlides(shift);
}

function scrollL() {
  var shift = currentSlide - 4;
  console.log({ shift }, { currentSlide });
  if (shift < 0) {
    shift += document.querySelectorAll(".mySlides").length
  }
  console.log({ shift }, { currentSlide });
  loadGallery(currentSlide = shift);
}

function scrollR() {
  var shift = currentSlide + 4;
  var len = document.querySelectorAll(".mySlides").length;

  if (shift > len) {
    shift -= len;
  }

  loadGallery(currentSlide = shift);
}*/