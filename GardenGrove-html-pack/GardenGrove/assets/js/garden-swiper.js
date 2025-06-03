$(document).ready(function () {
  // Initialize Swiper
  var gardenSwiper = new Swiper(".garden-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".garden-swiper .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".garden-swiper .swiper-button-next",
      prevEl: ".garden-swiper .swiper-button-prev",
    },
    breakpoints: {
      576: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });

  // Pause autoplay on hover
  $(".garden-gallery-slider").hover(
    function () {
      gardenSwiper.autoplay.stop();
    },
    function () {
      gardenSwiper.autoplay.start();
    }
  );

  // Lightbox functionality
  $(".garden-view-icon").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    var imgSrc = $(this).data("img");
    // If image doesn't exist, use the placeholder
    var img = new Image();
    img.onload = function () {
      $("#gardenLightboxImg").attr("src", imgSrc);
      $("#gardenLightbox").addClass("active");
    };
    img.onerror = function () {
      $("#gardenLightboxImg").attr(
        "src",
        "/placeholder.svg?height=800&width=1200"
      );
      $("#gardenLightbox").addClass("active");
    };
    img.src = imgSrc;

    // Also try to get the image from the card if data-img is not available
    if (!imgSrc) {
      imgSrc = $(this).closest(".garden-gallery-card").find("img").attr("src");
      $("#gardenLightboxImg").attr("src", imgSrc);
      $("#gardenLightbox").addClass("active");
    }
  });

  // Close lightbox
  $("#gardenLightboxClose, #gardenLightbox").click(function () {
    $("#gardenLightbox").removeClass("active");
  });

  // Prevent lightbox from closing when clicking on the image
  $(".garden-lightbox-content").click(function (e) {
    e.stopPropagation();
  });

  // Close lightbox with escape key
  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $("#gardenLightbox").removeClass("active");
    }
  });
});
