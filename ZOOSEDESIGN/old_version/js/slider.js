// https://codepen.io/team/css-tricks/pen/vapjge
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

$(document).ready(function () {
    // animazione slide home
    (function ($) {
        $.fn.split = function (options) {
            if ($(this).hasClass('split')) {
                //Initial setup
                var $theSlider = $(this);
                $theSlider.addClass();

                var $allSlides = $theSlider.find('.slides');
                $allSlides.each(function () {
                    var $initSlide = $(this).find('.set').first();
                    $initSlide.addClass('init current');
                });

                //Set animation themes for one or multiple sliders
                if (options.theme !== 'false') {
                    if (options.theme.indexOf(',') > 0) {
                        var $counter = 0;
                        var theme = options.theme.split(',');
                        $theSlider.find('.slides').each(function () {
                            $(this).addClass("theme-" + theme[$counter++]);
                        });
                    } else {
                        $theSlider.find('.slides').addClass("theme-" + options.theme);
                    }
                }

                //Click navigation arrow event
                $theSlider.find('.nav-arrow').on("click", {
                    infinite: options.infinite
                }, splitArrows);
            }
        };

        function splitArrows(event) {
            event.preventDefault();
            $buttonClicked = $(this);
            $currentSlide = $(this).parents('.split').first().find('.slides');
            $currentNav = $(this).parents('.split').first().find('.nav-wrapper');

            if ($buttonClicked.hasClass('prev')) {
                $currentSlide.each(function () {
                    var $currentSlide = $(this);

                    $buttonClicked.siblings('.next').removeClass('disable prevent');
                    $currentSlide.find('.set.init').last().removeClass('current');
                    setTimeout(function () {
                        $currentSlide.find('.set.previous').last().addClass('current').removeClass('previous');
                        $currentSlide.find('.set.init').last().removeClass('init');
                        if ($currentSlide.find('.set.previous').last().length) {
                            $buttonClicked.removeClass('prevent');
                        }
                    }, event.data.delay);
                });
                if (event.data.infinite == 'true') {
                    $currentSlide.each(function () {
                        var $firstElement = $(this).find('.set').first();
                        var $lastElement = $(this).find('.set').last();
                        $lastElement.insertBefore($firstElement);
                        $lastElement.addClass('previous init');
                    });
                } else {
                    if (!$currentSlide.find('.set.previous').last().prev().length && $currentSlide.find('.set.previous').length) {
                        $buttonClicked.addClass('disable');
                    }
                }
            } else if ($buttonClicked.hasClass('next') && $currentSlide.find('.set.init').last().next().length) {
                $currentSlide.each(function () {
                    var $currentSlide = $(this);

                    $buttonClicked.siblings('.prev').removeClass('disable prevent');
                    $currentSlide.find('.set.init').last().removeClass('current');
                    setTimeout(function () {
                        $currentSlide.find('.set.init').last().addClass('previous');
                        $currentSlide.find('.set.previous').last().next().addClass('init current');
                        if ($currentSlide.find('.set.init').last().next().length) {
                            $buttonClicked.removeClass('prevent');
                        }
                    }, event.data.delay);
                });

                if (!$currentSlide.find('.set.init').last().next().next().length) {
                    if (event.data.infinite == 'true') {
                        $currentSlide.each(function () {
                            var $firstElement = $(this).find('.set').first();
                            var $lastElement = $(this).find('.set').last();
                            $firstElement.insertAfter($lastElement);
                            $firstElement.removeClass('previous init');
                        });
                    } else {
                        $buttonClicked.addClass('disable');
                    }
                }
            }
        };
    }(jQuery));

    $('.split').split({
        theme: 'swipes',
        infinite: 'true'
    });
});