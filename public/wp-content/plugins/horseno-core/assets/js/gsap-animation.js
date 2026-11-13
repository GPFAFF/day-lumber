(function ($) {

    /*---------- 15. Lenis Library Support ----------*/
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

    const lenis = new Lenis({
        lerp: 0.1,
        touchMultiplier: 0,
        smoothWheel: true,
        smoothTouch: false,
        mouseWheel: false,
        autoResize: true,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1200);
    });

    /*---------- 16. Split Text Animation With GSAP Plugins ----------*/
    gsap.config({
        nullTargetWarn: false,
        trialWarn: false,
    });

    function vsTitleAnimation() {
        const vsElements = document.querySelectorAll('.title-anime');
        if (!vsElements.length) return;

        vsElements.forEach((container) => {
            const quotes = container.querySelectorAll('.title-anime__title');

            quotes.forEach((quote) => {
                // Reset previous animation and revert SplitText if any
                if (quote.animation) {
                    quote.animation.kill();
                    quote.split.revert();
                }

                // Apply the 'capitalize' text-transform using vanilla JavaScript
                quote.style.textTransform = 'initial';

                // Identify animation style
                const animationClass = container.className.match(/animation-(style\d+)/);
                if (!animationClass || animationClass[1] === 'style4') return; // Skip style4

                // Apply SplitText to split content into lines, words, and chars
                quote.split = new SplitText(quote, {
                    type: 'lines,words,chars',
                    linesClass: 'split-line',
                });

                // Set perspective for 3D effects
                gsap.set(quote, { perspective: 1000 });

                // Define initial states based on animation style
                const chars = quote.split.chars;
                const style = animationClass[1];

                const initialStates = {
                    style1: { opacity: 0, y: '90%', rotateX: '-40deg' },
                    style2: { opacity: 0, x: '50' },
                    style3: { opacity: 0 },
                    style4: { opacity: 0, skewX: '-30deg', scale: 0.8 },
                    style5: { opacity: 0, scale: 0.5 },
                    style6: { opacity: 0, y: '-100%', rotate: '45deg' },
                };

                gsap.set(chars, initialStates[style]);

                // Animate the characters on scroll
                quote.animation = gsap.to(chars, {
                    x: '0',
                    y: '0',
                    rotateX: '0',
                    rotate: '0',
                    opacity: 1,
                    skewX: '0',
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.7)',
                    stagger: 0.02,
                    scrollTrigger: {
                        trigger: quote,
                        start: 'top 90%',
                        toggleActions: 'play none none none', // Prevent repeat on refresh
                    },
                });
            });
        });
    }

    // Refresh animations when ScrollTrigger refreshes
    ScrollTrigger.addEventListener('refreshInit', () => {
        document.querySelectorAll('.title-anime__title').forEach((quote) => {
            if (quote.split) quote.split.revert();
        });
    });

    ScrollTrigger.addEventListener('refresh', vsTitleAnimation);

    document.addEventListener('DOMContentLoaded', vsTitleAnimation);
})(jQuery);