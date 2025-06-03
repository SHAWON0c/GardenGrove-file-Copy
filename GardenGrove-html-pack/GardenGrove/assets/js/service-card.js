$(document).ready(function () {
  // Animate cards on scroll
  function animateCards() {
    $(".service-card").each(function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      if (elementBottom > viewportTop && elementTop < viewportBottom) {
        var delay = $(this).data("delay") || 0;
        var $this = $(this);

        setTimeout(function () {
          $this.addClass("animate");
        }, delay);
      }
    });
  }

  // Initial animation check
  animateCards();

  // Animation on scroll
  $(window).on("scroll", function () {
    animateCards();
  });

  // Enhanced hover effects
  $(".service-card").hover(
    function () {
      $(this).find(".service-icon").addClass("fa-bounce");
    },
    function () {
      $(this).find(".service-icon").removeClass("fa-bounce");
    }
  );

  // Click effect for read more buttons
  $(".read-more-btn").on("click", function (e) {
    e.preventDefault();

    // Add a ripple effect
    var $this = $(this);
    var $ripple = $('<span class="ripple"></span>');

    $this.append($ripple);

    setTimeout(function () {
      $ripple.remove();
    }, 600);

    // You can add your navigation logic here
    console.log(
      "Read more clicked for:",
      $this.closest(".service-card").find(".service-title").text()
    );
  });

  // Parallax effect for service icons
  $(window).on("scroll", function () {
    var scrolled = $(window).scrollTop();
    var parallax = scrolled * 0.1;

    $(".service-icon").css("transform", "translateY(" + parallax + "px)");
  });

  // Add stagger animation to cards
  $(".service-card").each(function (index) {
    $(this).css("animation-delay", index * 0.1 + "s");
  });
});

// Click effect for read more buttons
$(".read-more-btn").on("click", function (e) {
  e.preventDefault();

  // Add a ripple effect
  var $this = $(this);
  var $ripple = $('<span class="ripple"></span>');

  $this.append($ripple);

  setTimeout(function () {
    $ripple.remove();
  }, 100);

  // Navigate to service-details.html after ripple effect
  setTimeout(function () {
    window.location.href = "service-details.html";
  }, 100);
});

// Add ripple effect CSS dynamically
$("<style>")
  .prop("type", "text/css")
  .html(
    `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(76, 175, 80, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .fa-bounce {
                    animation: bounce 1s infinite;
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0) scale(1.2) rotate(10deg);
                    }
                    40% {
                        transform: translateY(-10px) scale(1.3) rotate(15deg);
                    }
                    60% {
                        transform: translateY(-5px) scale(1.25) rotate(12deg);
                    }
                }
            `
  )
  .appendTo("head");
