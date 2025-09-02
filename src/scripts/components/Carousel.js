import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;

    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };
    this.init();
  }

  setOptions() {
    // Data-Split
    console.log(this.element.dataset);
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        768: {
          slidesPerView: 2.5,
        },
      };
    }

    // Data-Autoplay
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }

    // Data-Loop
    if ('loop' in this.element.dataset) {
      this.options.loop = true;
    }

    // Data-Slides
    if ('slides' in this.element.dataset) {
      this.options.slidesPerView =
        parseFloat(this.element.dataset.slides) || this.options.slidesPerView;
    }
  }

  init() {
    this.setOptions();
    const swiper = new Swiper(this.element, this.options);
  }
}
