
var slideIndex = 1;

var slideGroups = [
  {
    title: 'Project 1',
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
    title: 'Project 2',
    images: [
      'images/IMG_2460.JPG',
      'images/IMG_2462.JPG',
      'images/IMG_2471.JPG'
    ]
  },
  {
    title: 'Project 3',
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
    title: 'Project 4',
    images: [
      'images/11-12-14 3 Brewers 019.jpg',
    ]
  }
]

// Next/previous controls
function plusSlides(n) {
  slideIndex = (slideIndex + n)%document.querySelectorAll(".mySlides").length;
  var shift = slideIndex
  showSlides(shift);
  showGallery(shift);
}

// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  shift = slideIndex;
  showSlides(shift);
}

/*Load new active image*/
function showSlides(n) {
  var slides = document.querySelectorAll(".mySlides");
  //var dots = document.querySelectorAll(".dot");

  if (n > slides.length) { slideIndex = 1 } //snap to beginning of slideshow

  if (n < 1) { slideIndex = slides.length } //fell off the end, show final slide

  slides.forEach((slide) => {
    slide.style.display = "none";
  })
   
  slides[slideIndex - 1].style.display = "block";
}

function showGallery(n) {
  slides = [].slice.call(document.querySelectorAll(".myThumbnails")); 
  thumbnails = [];
  var index = n;

  slides.forEach((slide) => { slide.style.display = "none"});

  console.log("gallery:", {n})
  //1. get array of 5 images
  if ((n-3) < 0) { 
    console.log("A");
    thumbnails = slides.slice(n-3).concat(slides.slice(0, n+2));
    thumbnails.forEach(t => { console.log(t.innerHTML)});
    check(thumbnails);
  }
  else if ((n + 2) > slides.length) { //FIX ME!!
    thumbnails = slides.slice((n-3, (slides.length - 1))).concat(slides.slice(0, ((n+2)-slides.length)));

    console.log("B");
    console.log("first half:", slides.slice(n-3, (slides.length - 1)).length, "second half:", slides.slice((n+2)-slides.length).length);
    thumbnails.forEach(t => { console.log(t.innerHTML)});
    check(thumbnails);
  }
  else { 
    console.log("C");
    thumbnails = slides.slice((n-3), (n+2));
    thumbnails.forEach(t => { console.log(t.innerHTML)});
    check(thumbnails);
  }

  index = 0;
  order = ["one", "two", "three", "four", "five"];

  thumbnails.forEach((thumbnail) => {
    //console.log(thumbnail.innerHTML);
    thumbnail.setAttribute("id", `${order[index]}`);
    thumbnail.style.display = "block";
    index++;
  })
}

function check(array) {
  if (array.length != 5) {
    console.log("ALERT", {slideIndex});
  }
}

/* Tabs */
function showTabs(data) {
  var tabs = document.getElementById("tabs");
  var tabsHTML = document.createElement("div");
  var index = 0;

  data.forEach((tab) => {
    const t = document.createElement("div");
    t.classList.add("tab");
    t.setAttribute("data-show", index);
    t.innerHTML = tab.title;

    tabsHTML.append(t); //<div class="tab" data-show="$index">tab.title</div>

    index++;
  });

  tabsHTML.firstChild.classList.add("active");
  tabs.innerHTML = tabsHTML.innerHTML; //adds newly created html tabs into the same parent div

}
showTabs(slideGroups);

/*Load image gallery */
function loadGallery(i) {
  var thumbnails = slideGroups[i].images;
  var galleryHTML = document.createElement('ul');
  index = 0;

  thumbnails.forEach((thumbnail) => {
    var t = document.createElement('li');
    t.classList.add('myThumbnails');
    t.classList.add('fade');
    t.setAttribute("onclick", `currentSlide(${index})`);

    var img = document.createElement('img');
    img.style.width = "100%";
    img.src = thumbnail;
    t.append(img);
    galleryHTML.append(t);

    index++;
  })

  document.getElementById('thumbnails-list').innerHTML = galleryHTML.innerHTML;
  
  showGallery(slideIndex);
};

/* Load slides */
function loadSlides(i) {    // i = desired project tab 
  var slides = slideGroups[i].images;
  var slideHTML = document.createElement('div');
  var thumbHTML = document.createElement('div');

  slides.forEach((slide) => {
    var s = document.createElement("div");
    s.classList.add('mySlides');    //sets images to active, used in showSlides
    s.classList.add('fade');      //used later for css

    var img = document.createElement("img");
    img.style.width = "100%";
    img.src = slide;
    s.append(img);
    slideHTML.append(s); //<div class="mySlides fade">$img</div>
  });

  document.getElementById("slides").innerHTML = slideHTML.innerHTML;
  showSlides(slideIndex);
}

/*    Build the Slideshow    */
var tabs = document.querySelectorAll('.tab');
tabs.forEach((tab) => {
  tab.addEventListener("click", (el) => {
    var element = el.target;
    var show = element.dataset.show; // Which show to show

    // Remove previous active class
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Update the slideshow
    slideIndex  = 1;
    loadSlides(show);
    loadGallery(show);

    // Add the active class
    element.classList.add('active');
  })
});

loadSlides(0);
loadGallery(0);