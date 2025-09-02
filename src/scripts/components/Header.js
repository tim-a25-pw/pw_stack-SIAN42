export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      threshold: 0.1,
      alwaysShow: false,
    };
    this.html = document.documentElement;

    this.lastScrollPosition = 0;
    this.scrollPosition = 0;

    this.init();
    this.initNavMobile();
  }

  init() {
    this.setOptions();
  }

  setOptions() {
    //Vérifier les différents attributs data sur la composante
    const thresholdAttribut = this.element.getAttribute('data-threshold');
    if (thresholdAttribut !== null) {
      const thresholdValue = parseFloat(thresholdAttribut);
      this.options.threshold = thresholdValue;
    }
    this.options.alwaysShow = this.element.hasAttribute('data-always-show');

    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;
    //console.log(this.scrollPosition);

    this.setHeaderState();
    this.setDirection();
  }

  setHeaderState() {
    if (this.options.alwaysShow) {
      this.html.classList.remove('header-is-hidden');
      return;
    }

    if (
      this.scrollPosition >
      document.scrollingElement.scrollHeight * this.options.threshold
    ) {
      this.html.classList.add('header-is-hidden');
    } else if (this.scrollPosition < this.lastScrollPosition) {
      this.html.classList.remove('header-is-hidden');
    }
  }

  setDirection() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      //scroll vers le bas
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      //scroll vers le haut
      this.html.classList.add('is-scrolling-up');
      this.html.classList.remove('is-scrolling-down');
    }
  }

  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    console.log(toggle);
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
