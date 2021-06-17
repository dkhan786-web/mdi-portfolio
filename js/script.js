
// Home Portfolio Popup
document.addEventListener("click", (e) =>{
	if(e.target.classList.contains("view-project-btn")){
		togglePortfolioPopup();
		document.querySelector(".portfolio-popup").scrollTo(0,0);
		portfolioItemDetails(e.target.parentElement);
	}
})
function togglePortfolioPopup(){
	document.querySelector(".portfolio-popup").classList.toggle("open");
	document.body.classList.toggle("hide-scrolling");
	document.querySelector(".main-container").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// Hide popup when clicking outside of it
document.addEventListener("click", (e) =>{
	if(e.target.classList.contains("pp-inner")){
		togglePortfolioPopup();
	}
});

function portfolioItemDetails(portfolioItem){
	document.querySelector(".pp-thumbnail img").src =
	portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

	document.querySelector(".pp-header h3").innerHTML =
	portfolioItem.querySelector(".portfolio-item-title").innerHTML;

	document.querySelector(".pp-body").innerHTML =
	portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}
// Home Portfolio Popup end

// Preloader

window.addEventListener("load", function () {
	document.querySelector(".preloader").classList.add("opacity-0");
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000)
})

// Portfolio Item Filter
const filterContainer = document.querySelector(".portfolio-filter"),
	filterBtns = filterContainer.children,
	totalFilterBtn = filterBtns.length,
	portfolioItems = document.querySelectorAll(".portfolio-item"),
	totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
	filterBtns[i].addEventListener("click", function () {
		filterContainer.querySelector(".active").classList.remove("active");
		this.classList.add("active");

		const filterValue = this.getAttribute("data-filter");
		for (let k = 0; k < totalPortfolioItem; k++) {
			if (filterValue === portfolioItems[k].getAttribute("data-category")) {
				portfolioItems[k].classList.remove("hide");
				portfolioItems[k].classList.add("show");
			}
			else {
				portfolioItems[k].classList.remove("show");
				portfolioItems[k].classList.add("hide");
			}
			if (filterValue === "all") {
				portfolioItems[k].classList.remove("hide");
				portfolioItems[k].classList.add("show");
			}
		}

	})
}



// Portfolio lightbox
const lightbox = document.querySelector(".lightbox"),
	lightboxImg = lightbox.querySelector(".lightbox-img"),
	lightboxClose = lightbox.querySelector(".lightbox-close"),
	lightboxText = lightbox.querySelector(".caption-text"),
	lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalPortfolioItem; i++) {
	portfolioItems[i].addEventListener("click", function () {
		itemIndex = i;
		changeItem();
		toggleLightbox();
	})
}
function nextItem() {
	if (itemIndex === totalPortfolioItem - 1) {
		itemIndex = 0;
	}
	else {
		itemIndex++
	}
	changeItem();
}

function prevItem() {
	if (itemIndex === 0) {
		itemIndex = totalPortfolioItem - 1;
	}
	else {
		itemIndex--
	}
	changeItem();
}

function toggleLightbox() {
	lightbox.classList.toggle("open");
}

function changeItem() {
	imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
	lightboxImg.src = imgSrc;
	lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
	lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItem;
}

// close lightbox
lightbox.addEventListener("click", function (event) {
	if (event.target === lightboxClose || event.target === lightbox) {
		toggleLightbox();
	}
})


// Aside navbar
const nav = document.querySelector(".nav-item"),
	navList = nav.querySelectorAll("li"),
	totalNavList = navList.length,
	allSection = document.querySelectorAll(".section"),
	totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
	const a = navList[i].querySelector("a");
	a.addEventListener("click", function () {
		// remove back section class
		removeBackSectionClass();

		for (let i = 0; i < totalSection; i++) {
			allSection[i].classList.remove("back-section");
		}

		for (let j = 0; j < totalNavList; j++) {
			if (navList[j].querySelector("a").classList.contains("active")) {
				// add back section class
				addBackSectionClass(j)
			}
			navList[j].querySelector("a").classList.remove("active");
		}

		this.classList.add("active");
		showSection(this);

		if (window.innerWidth < 1200) {
			asideSectionTogglerBtn();
		}
	})
}

function removeBackSectionClass() {
	for (let i = 0; i < totalSection; i++) {
		allSection[i].classList.remove("back-section");
	}
}
function addBackSectionClass(num) {
	allSection[num].classList.add("back-section");
}

function showSection(element) {
	for (let i = 0; i < totalSection; i++) {
		allSection[i].classList.remove("active");
	}
	const target = element.getAttribute("href").split("#")[1];
	document.querySelector("#" + target).classList.add("active")

}

function updateNav(element) {
	for (let i = 0; i < totalNavList; i++) {
		navList[i].querySelector("a").classList.remove("active");
		const target = element.getAttribute("href").split("#")[1];
		if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
			navList[i].querySelector("a").classList.add("active");
		}
	}
}

document.querySelector(".hire-me").addEventListener("click", function () {
	const sectionIndex = this.getAttribute("data-section-index");
	showSection(this);
	updateNav(this);
	removeBackSectionClass();
	addBackSectionClass(sectionIndex);
})



const navTogglerBtn = document.querySelector(".nav-toggler"),
	aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", asideSectionTogglerBtn)

function asideSectionTogglerBtn() {
	aside.classList.toggle("open");
	navTogglerBtn.classList.toggle("open");
	for (let i = 0; i < totalSection; i++) {
		allSection[i].classList.toggle("open");
	}
}