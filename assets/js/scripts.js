    
    new WOW().init();

    /**----- Preolader -----**/

    $(window).on('load',function() {
		$('.preloader-wrap').fadeOut(); 
		$('.loader').delay(150).fadeOut('slow');
		$('body').delay(150).css({'overflow':'visible'})
	});

	/**----- Scrollspy Navbar -----**/

    const hamburger   = document.querySelector('.header .nav-bar .nav-list .hamburger');
    const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
    const menu_item   = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
    const header      = document.querySelector('.header.hero');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobile_menu.classList.toggle('active');
    });

    document.addEventListener('scroll', () => {
        var scroll_position = window.scrollY;
        if (scroll_position > 250) {
            header.style.backgroundColor = '#000000';
            header.style.color = "#ffffff";
        } else {
            header.style.backgroundColor = 'transparent';
        }
    });

    menu_item.forEach((item) => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobile_menu.classList.toggle('active');
        });
    });

    /**----------- Back Top ------------**/

    $(window).scroll(function(){
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    /**----- Typing Strings -----**/
    
    var typed = new Typed(".typing", {
        strings: ["Web Developer", "Developer FullStack", "Designer Digital"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-about", {
        strings: ["Web Developer", "Developer FullStack", "Designer Digital"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    /**----- About TabContent -----**/

    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            tabsContainer.querySelector(".active").classList.remove("active");
            event.target.classList.add("active");
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    });

    /**----- Scrolling Toggle -----**/

    function bodyScrollingToggle() {
        document.body.classList.toggle("stop-scrolling");
    }

    /**----- Portfolio Filter And Popup -----**/

    const portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems          = document.querySelectorAll(".portfolio-item"),
    popup                   = document.querySelector(".portfolio-popup"),
    prevBtn                 = popup.querySelector(".popup-prev"),
    nextBtn                 = popup.querySelector(".popup-next"),
    closeBtn                = popup.querySelector(".popup-close"),
    projectDetailsConatiner = popup.querySelector(".popup-details"),
    projectDetailsBtn       = popup.querySelector(".popup-details-btn");

    let itemIndex, slideIndex, screenshots;

    // MixiTup Navigation
    $(window).on('load', function () {
        $('.portfolio-filter li').on('click', function () {
            $('.portfolio-filter li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.portfolio-items').length > 0) {
            var containerEl = document.querySelector('.portfolio-items');
            var mixer = mixitup(containerEl);
        }
    });

    // Portfolio Img
    portfolioItemsContainer.addEventListener("click", (event) => {
        if(event.target.closest(".portfolio-item")) {
            const portfolioItem = event.target.closest(".portfolio-item").parentElement;
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(",");
            if (screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    });

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if (projectDetailsConatiner.classList.contains("active")) {
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".popup-img");
        popup.querySelector(".popup-loader").classList.add("active");
        popupImg.src=imgSrc;
        popupImg.onload = () => {
            popup.querySelector(".popup-loader").classList.remove("active");
        }
        popup.querySelector(".popup-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }

    // Next Slider
    nextBtn.addEventListener("click", () => {
        if (slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
         popupSlideshow();
    });

    // Prev Slider
    prevBtn.addEventListener("click", () => {
        if (slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        } else {
            slideIndex--;
        }
        popupSlideshow();
    });

    function popupDetails() {
        if (!portfolioItems[itemIndex].querySelector(".portfolio-details")) {
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        const details = portfolioItems[itemIndex].querySelector(".portfolio-details").innerHTML;
        popup.querySelector(".project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-overlay").innerHTML;
        popup.querySelector(".popup-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".popup-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    });
    
    function popupDetailsToggle() {
        if (projectDetailsConatiner.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsConatiner.classList.remove("active");
            projectDetailsConatiner.style.maxHeight = 0 + "px";
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsConatiner.classList.add("active");
            projectDetailsConatiner.style.maxHeight = projectDetailsConatiner.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsConatiner.offsetTop);
        }
    }

    /**----- Theme Light and Dark -----**/

    const dayNight = document.querySelector(".day-night");

    dayNight.addEventListener("click", () => {
        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");
        document.body.classList.toggle("dark");
    });

    window.addEventListener("load", () => {
        if (document.body.classList.contains("dark")) {
            dayNight.querySelector("i").classList.add("fa-sun");
        } else {
            dayNight.querySelector("i").classList.add("fa-moon");
        }
    });


    /**----- Initialize Swiper -----**/

    var swiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    });