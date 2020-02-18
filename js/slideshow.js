window.onload = () => {
  let currSlide = 0; // set the currently active slide
  let iHandle;
  //get the slideshow container
  let container = document.getElementById("slideshow");
  let slideEls = document.createElement("div");
  container.appendChild(slideEls);

  container.addEventListener("mouseover", () => {
    clearInterval(iHandle);
  });

  container.addEventListener("mouseout", () => {
    startShow();
  });

  slideEls.addEventListener("click", () => {
    window.open("img/" + slides[currSlide].image);
  });

  let nav = document.createElement("nav");
  container.appendChild(nav);

  let btnPrev = document.createElement("button");
  let btnNext = document.createElement("button");

  btnPrev.innerHTML = "◀";
  btnNext.innerHTML = "▶";

  btnPrev.id = "previous";
  btnNext.id = "next";

  btnNext.addEventListener("click", () => {
    currSlide = (currSlide + 1) % slides.length;
    showSlide(currSlide);
  });

  btnPrev.addEventListener("click", () => {
    if (--currSlide < 0) {
      currSlide = slides.length - 1;
    }
    showSlide(currSlide);
  });

  container.appendChild(btnPrev);
  container.appendChild(btnNext);

  // go through each slide in slides and create a div, with
  // properties and style, add the element back to slide obj
  console.log(slides);
  slides.forEach((slide, i) => {
    let chrome = document.createElement("div");
    chrome.classList.add("slide");
    chrome.style.backgroundImage = "url(img/" + slide.image + ")";
    chrome.style.backgroundSize = slide.size;
    chrome.style.width = "100%";
    chrome.style.height = "100%";
    //--------
    let inner = document.createElement("div");
    inner.innerHTML = slide.caption;
    inner.classList.add("caption");
    chrome.appendChild(inner);
    // --------
    slideEls.appendChild(chrome);
    slide.element = chrome;

    let thumb = document.createElement("div");
    thumb.style.backgroundImage = "url(img/" + slide.image + ")";
    thumb.addEventListener("click", () => {
      showSlide(i);
    });
    slide.thumb = thumb;

    nav.appendChild(thumb); // attach to navigation bar
  });

  // make the first slide opaque
  slides[0].element.style.opacity = "1";

  let showSlide = num => {
    currSlide = num;
    for (let i = 0; i < slides.length; i++) {
      if (i === currSlide) {
        slides[i].element.style.opacity = "1";
        slides[i].thumb.style.transform = "scale(1.2)";
        slides[i].thumb.style.borderColor = "white";
      } else {
        slides[i].element.style.opacity = "0";
        slides[i].thumb.style.transform = "scale(0.8)";
        slides[i].thumb.style.borderColor = "black";
      }
    }
  };
  let startShow = () => {
    iHandle = setInterval(() => {
      // currSlide++;
      // if (currSlide >= slides.length) {
      //   currSlide = 0;
      // }
      currSlide = (currSlide + 1) % slides.length;
      showSlide(currSlide);
    }, 1200);
  };

  startShow();
};

let slides = [
  {
    caption: "A warm desert",
    image: "desert1.jpg",
    size: "cover"
  },
  {
    caption: "A cartoony desert",
    image: "desert2.jpg",
    size: "cover"
  },
  {
    caption: "A yummy dessert",
    image: "dessert1.webp",
    size: "cover"
  },
  {
    caption: "A berry dessert",
    image: "dessert2.jpg",
    size: "cover"
  },
  {
    caption: "Looks dry!",
    image: "desert3.jpg",
    size: "cover"
  }
];
