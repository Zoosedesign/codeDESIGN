$(document).ready(function () {
    // animazione logo
    $(window).ready(function () {
        $('#logo').addClass('rotateOut');
        $('#o').addClass('boxIn');
        $('#vanish').fadeIn(1000).removeClass('d-none');
    });
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('#arrow-down').addClass('d-none');
        } else {
            $('#arrow-down').removeClass('d-none');
        }
        if ($(this).scrollTop() > 400) {
            $('header').fadeOut();
        } else {
            $('header').fadeIn();
        }
    });
    // whatsapp
    $('#wpp').click(function () {
        $('#wpp-container').fadeToggle().toggleClass('d-none')
    });
    $('#x').click(function () {
        $('#wpp-container').fadeOut().addClass('d-none')
    });
    // sroll down arrow
    $('#arrow-down').click(function () {
        $('html,body').animate({
                scrollTop: $('#B').offset().top
            },
            'slow');
    });
    // sroll approfondisci
    $('.scopri').click(function () {
        $('html,body').animate({
                scrollTop: $('#comparison').offset().top
            },
            'slow');
    });
    // scroll menu
    (function () {
        function throttle(fn, delay, scope) {
            // Default delay
            delay = delay || 0;
            var last, defer;
            return function () {
                var context = scope || this,
                    now = +new Date(),
                    args = arguments;
                if (last && now < last + delay) {
                    clearTimeout(defer);
                    defer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, delay);
                } else {
                    last = now;
                    fn.apply(context, args);
                }
            }
        }

        function extend(destination, source) {
            for (var k in source) {
                if (source.hasOwnProperty(k)) {
                    destination[k] = source[k];
                }
            }
            return destination;
        }
        var ScrollManager = (function () {

            var defaults = {

                    steps: null,
                    navigationContainer: null,
                    links: null,
                    scrollToTopBtn: null,

                    navigationElementClass: 'quick-nav',
                    currentStepClass: 'current',
                    smoothScrollEnabled: true,
                    stepsCheckEnabled: true,

                    // Callbacks
                    onScroll: null,

                    onStepChange: function (step) {
                        var self = this;
                        var relativeLink = [].filter.call(options.links, function (link) {
                            link.classList.remove(self.currentStepClass);
                            return link.hash === '#' + step.id;
                        });
                        relativeLink[0].classList.add(self.currentStepClass);
                    },

                    // Provide a default scroll animation
                    smoothScrollAnimation: function (target) {
                        $('html, body').animate({
                            scrollTop: target
                        }, 'slow');
                    }
                },

                options = {};

            // Privates
            var _animation = null,
                currentStep = null,
                throttledGetScrollPosition = null;

            return {

                scrollPosition: 0,

                init: function (opts) {

                    options = extend(defaults, opts);

                    if (options.steps === null) {
                        console.warn('Smooth scrolling require some sections or steps to scroll to :)');
                        return false;
                    }

                    // Allow to customize the animation engine ( jQuery / GSAP / velocity / ... )
                    _animation = function (target) {
                        target = typeof target === 'number' ? target : $(target).offset().top;
                        return options.smoothScrollAnimation(target);
                    };

                    // Activate smooth scrolling
                    if (options.smoothScrollEnabled) this.smoothScroll();

                    // Scroll to top handling
                    if (options.scrollToTopBtn) {
                        options.scrollToTopBtn.addEventListener('click', function () {
                            options.smoothScrollAnimation(0);
                        });
                    }

                    // Throttle for performances gain
                    throttledGetScrollPosition = throttle(this.getScrollPosition).bind(this);
                    window.addEventListener('scroll', throttledGetScrollPosition);
                    window.addEventListener('resize', throttledGetScrollPosition);

                    this.getScrollPosition();
                },

                getScrollPosition: function () {
                    this.scrollPosition = window.pageYOffset || window.scrollY;
                    if (options.stepsCheckEnabled) this.checkActiveStep();
                    if (typeof options.onScroll === 'function') options.onScroll(this.scrollPosition);
                },

                scrollPercentage: function () {
                    var body = document.body,
                        html = document.documentElement,
                        documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
                            html.clientHeight, html.scrollHeight, html.offsetHeight);

                    var percentage = Math.round(this.scrollPosition / (documentHeight - window.innerHeight) * 100);
                    if (percentage < 0) percentage = 0;
                    if (percentage > 100) percentage = 100;
                    return percentage;
                },

                doSmoothScroll: function (e) {
                    if (e.target.nodeName === 'A') {
                        e.preventDefault();
                        if (location.pathname.replace(/^\//, '') === e.target.pathname.replace(/^\//, '') && location.hostname === e.target.hostname) {
                            var targetStep = document.querySelector(e.target.hash);
                            targetStep ? _animation(targetStep) : console.warn('Hi! You should give an animation callback function to the Scroller module! :)');
                        }
                    }
                },

                smoothScroll: function () {
                    if (options.navigationContainer !== null) options.navigationContainer.addEventListener('click', this.doSmoothScroll);
                },

                checkActiveStep: function () {
                    var scrollPosition = this.scrollPosition;

                [].forEach.call(options.steps, function (step) {
                        var bBox = step.getBoundingClientRect(),
                            position = step.offsetTop,
                            height = position + bBox.height;

                        if (scrollPosition >= position && scrollPosition < height && currentStep !== step) {
                            currentStep = step;
                            step.classList.add(self.currentStepClass);
                            if (typeof options.onStepChange === 'function') options.onStepChange(step);
                        }
                        step.classList.remove(options.currentStepClass);
                    });
                },

                destroy: function () {
                    window.removeEventListener('scroll', throttledGetScrollPosition);
                    window.removeEventListener('resize', throttledGetScrollPosition);
                    options.navigationContainer.removeEventListener('click', this.doSmoothScroll);
                }
            }
        })();
        var scrollToTopBtn = document.querySelector('.scroll-top'),
            steps = document.querySelectorAll('.scroll-step'),
            navigationContainer = document.querySelector('.quick-nav'),
            links = navigationContainer.querySelectorAll('a');

        ScrollManager.init({
            steps: steps,
            scrollToTopBtn: scrollToTopBtn,
            navigationContainer: navigationContainer,
            links: links,

            // Customize onScroll behavior
            onScroll: function () {
                var percentage = ScrollManager.scrollPercentage();
                percentage >= 100 ? scrollToTopBtn.classList.add('visible') : scrollToTopBtn.classList.remove('visible');
            },
        });
    })();
    //horizontal scroll card
    var x, newX, left, down;

    $("#swipe, #swipe2").mousedown(function (e) {
        down = true;
        x = e.pageX;
        left = $(this).scrollLeft();
    });

    $("#swipe, #swipe2").mousemove(function (e) {
        e.preventDefault();
        if (down) {
            newX = e.pageX;
            $(this).scrollLeft(left + x - newX);
        }
    });

    $("body").mouseup(function (e) {
        down = false;
    });
    $("body").keydown(function (e) {
        left = $("div").scrollLeft();
        var articleWidth = $('article').width();
        var margin = 2 * parseInt($('#swipe, #swipe2').css("marginLeft"));
        if (e.keyCode == 39)
            $("div").scrollLeft(left + articleWidth + margin);
        if (e.keyCode == 37)
            $("div").scrollLeft(left - articleWidth - margin);
    });
    //swipe mobile
    var slideDiv = document.querySelector('#swipe');
    slideDiv.addEventListener('touchstart', function () {
        var touches = event.changedTouches;
        down = true;
        x = touches[0].pageX;
        left = $('#swipe').scrollLeft();
    });

    slideDiv.addEventListener('touchmove', function (event) {
        event.stopPropagation();
        var touches = event.changedTouches;
        if (down) {
            var newX = touches[0].pageX;
            $('#swipe').scrollLeft(left + x - newX);
        }
    });

    slideDiv.addEventListener('touchend', function () {
        down = false;
    });
    //swipe2 mobile
    var slideDiv = document.querySelector('#swipe2');
    slideDiv.addEventListener('touchstart', function () {
        var touches = event.changedTouches;
        down = true;
        x = touches[0].pageX;
        left = $('#swipe2').scrollLeft();
    });

    slideDiv.addEventListener('touchmove', function (event) {
        event.stopPropagation();
        var touches = event.changedTouches;
        if (down) {
            var newX = touches[0].pageX;
            $('#swipe2').scrollLeft(left + x - newX);
        }
    });

    slideDiv.addEventListener('touchend', function () {
        down = false;
    });
});
//comparison (tenere divisa)
var divisor = document.getElementById("divisor"),
    slider = document.getElementById("slider");

function moveDivisor() {
    divisor.style.width = slider.value + "%";
}