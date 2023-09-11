//------------------ SLIDER CONTENT ------------------
const sliders = [
    {
        src: "./assets/img/slide_1.jpg",
        alt: "content design",
    },
    {
        src: "./assets/img/slide_2.jpg",
        alt: "graphic design",
    },
    {
        src: "./assets/img/slide_3.jpg",
        alt: "front end developer",
    },
    {
        src: "./assets/img/slide_4.jpg",
        alt: "photoshoot",
    }
];

//-------------- SLIDER MOBILE CONTAINER -------------
const sliderMobile = document.getElementById('slider-mobile');

//popolo il container per le dimensioni fino a 991px
sliders.forEach((slide, index) => {
    sliderMobile.innerHTML += `<img src="${slide.src}" alt="${slide.alt}" class="w-100 vh-100 position-absolute top-0 object-fit-cover" style="object-position: 65%; z-index: ${sliders.length - index}">`
});

//------------- SLIDER DESKTOP CONTAINER -------------
const sliderDesktop = document.getElementById('slider-desktop');

//popolo il container per le dimensioni fino a ≥992px
for (let i = 0; i < 5; i++) {
    sliderDesktop.innerHTML += `
        <figure class="d-flex w-20 vh-100" style="z-index: ${sliders.length + 1}">
            ${sliders.map((slide, index) => `
                <img src="${slide.src}" alt="${slide.alt}" class="position-absolute object-fit-cover"
                style="width: ${(100 - (20 * (i + 1))) + 20}%; height: 110vh; object-position: 100%; z-index: ${sliders.length - index}">
            `).join('')}
        </figure>`;
}

//----------------- SLIDER NAVIGATION ----------------
function previousButton() {
    //VARIABILI VERSIONE MOBILE
    const slidesM = sliderMobile.querySelectorAll('img');
    const firstSlide = slidesM[0];
    const lastSlide = slidesM[slidesM.length - 1];

    //chiamata dell'animazione 
    previousAnimation(slidesM, firstSlide, lastSlide, slidesM.length, sliderMobile, 0, slidesM.length, 500);

    //VARIABILI VERSIONE DESKTOP
    const slidesD = sliderDesktop.querySelectorAll('img');
    const slidesPart = sliderDesktop.querySelectorAll('figure');
    const slidesTotali = slidesD.length / slidesPart.length;

    //creo la chiamata all'animazione per ogni figure (colonna contenente slide)
    for (let i = 0; i < slidesPart.length; i++) {
        //gli diamo un timeout per farle partire in ritardo una con l'altra
        setTimeout(() => {
            const n = i * (slidesTotali);
            //chiamata dell'animazione per ogni colonna
            previousAnimation(slidesD, slidesD[n], slidesD[n + (slidesTotali - 1)], slidesTotali, slidesPart[i], n, n + slidesTotali, 200 * slidesTotali);
        }, i * 200);
    }
  
    hideArrow((slidesPart.length * 200) * 1.5);
}

function nextButton() {
    //VARIABILI VERSIONE MOBILE
    const slidesM = sliderMobile.querySelectorAll('img');
    const firstSlide = slidesM[0];
    const secondSlide = slidesM[1];

    //chiamata dell'animazione
    nextAnimation(slidesM, firstSlide, secondSlide, slidesM.length, sliderMobile, 0, slidesM.length, 500);

    //VARIABILI VERSIONE DESKTOP
    const slidesD = sliderDesktop.querySelectorAll('img');
    const slidesPart = sliderDesktop.querySelectorAll('figure');
    const slidesTotali = slidesD.length / slidesPart.length;

    //creo la chiamata all'animazione per ogni figure (colonna contenente slide)
    for (let i = 0; i < slidesPart.length; i++) {
        //gli diamo un timeout per farle partire in ritardo una con l'altra
        setTimeout(() => {
            const n = i * (slidesTotali);
            //chiamata dell'animazione per ogni colonna
            nextAnimation(slidesD, slidesD[n], slidesD[n + 1], slidesTotali, slidesPart[i], n, n + slidesTotali, 200 * slidesTotali);
        }, i * 200);
    }

    hideArrow((slidesPart.length * 200) * 1.5);
}

//----------------- SLIDER ANIMATION ----------------
function previousAnimation(slides, firstSlide, lastSlide, totalSlide, container, start, end, timing) {
    //cambio il suo z-index in modo che si veda l'effetto di entrata
    lastSlide.style.zIndex = `${totalSlide - 1}`;

    //aggiungo le classi di animazione
    firstSlide.classList.add('prev-out')
    lastSlide.classList.add('prev-in');

    //riordino le slide e modifico gli z-index
    lastSlide.style.zIndex = `${totalSlide + 1}`;
    lastSlide.parentNode.removeChild(lastSlide);

    container.insertBefore(lastSlide, container.firstChild);

    for (let i = start; i < end; i++) {
        const slide = slides[i];
        slide.style.zIndex = Number(slide.style.zIndex) - 1;
    }

    setTimeout(() => {
        //rimuove le classi di animazione
        firstSlide.classList.remove('prev-out');
        lastSlide.classList.remove('prev-in');
    }, timing)
}

function nextAnimation(slides, firstSlide, secondSlide, totalSlide, container, start, end, timing) {
    //aggiungo le classi di animazione
    firstSlide.classList.add('next-out');
    secondSlide.classList.add('next-in');

    //riordino le slide e modifico gli z-index
    firstSlide.style.zIndex = totalSlide - 2;
    firstSlide.parentNode.removeChild(firstSlide);

    container.appendChild(firstSlide);

    for (let i = start; i < end; i++) {
        const slide = slides[i];
        slide.style.zIndex = Number(slide.style.zIndex) + 1;
    }

    setTimeout(() => {
        firstSlide.style.zIndex = 1;
        //rimuove le classi di animazione
        firstSlide.classList.remove('next-out');
        secondSlide.classList.remove('next-in');
    }, timing)
}

//----------------- HIDE / VIEW ARROW ----------------

function hideArrow(timing) {
    const preButton = document.getElementById('pre');
    const nextButton = document.getElementById('next');

    const goLeft = [
        { transform: "translateX(0)" },
        { transform: "translateX(-200px)"},
        { transform: "translateX(0)" }
    ]

    const goRight = [
        { transform: "translateX(0)" },
        { transform: "translateX(200px)"},
        { transform: "translateX(0)" }
    ]

    const settings = {
        duration: timing,
        iteration: 1
    }

    preButton.animate(goLeft, settings);
    nextButton.animate(goRight, settings);
}