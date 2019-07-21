
var slideIndex = 1;

var slideGroups = [
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
      'images/10.jpg'
    ]
  },
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

function scrollL(){
  var shift = slideIndex - 4;
  console.log({shift},{slideIndex});
  if (shift < 0){
    shift += document.querySelectorAll(".mySlides").length 
  }
  console.log({shift},{slideIndex});
  showGallery(slideIndex=shift);
}

function scrollR(){
  var shift = slideIndex + 4;
  var len = document.querySelectorAll(".mySlides").length;

  if (shift > len){
    shift -= len;
  }

  showGallery(slideIndex=shift);
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

  // slides.forEach(s => {console.log (s.innerHTML)}); 

  var slides = [].slice.call(document.querySelectorAll(".myThumbnails"));
  var len = slides.length; 
  var thumbnails = [];
  var index = n;

  slides.forEach((slide) => { slide.style.display = "none"});

  console.log("gallery:", {n}) //PRINT OUT

  //1. get array of 5 images
  if ((n-3) < 0) {
    console.log("a"); 
    thumbnails = slides.slice(n-3).concat(slides.slice(0, n+2));
  }
  else if ((n+2) > len) {
    console.log("b");
    thumbnails = slides.slice(n-3).concat(slides.slice(0, ((n+1) - (len-1))));
  }
  else { 
    console.log("b");
    thumbnails = slides.slice((n-3), (n+2));
  }

  index = 0;
  order = ["one", "two", "three", "four", "five"];

  thumbnails.forEach((thumbnail) => {
    thumbnail.setAttribute("id", `${order[index]}`);
    thumbnail.style.display = "block";
    index++;
  })
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
    t.setAttribute("onclick", `currentSlide(${index+1})`);

    var img = document.createElement('img');
    img.style.width = "100%"
    img.style.objectFit = "fill";
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