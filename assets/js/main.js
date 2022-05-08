(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with offset on page load with hash links in the url if reloading
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Filter option toggle
   */
  on('click', '.filter-box .filter-text', function(e) {
    let optionBox = this.parentNode.querySelector('.option-box')
    if(optionBox){
      optionBox.classList.toggle('hidden-box')
    }
  },true)
  on('click', '.option-box button:last-child', function(e) {
    let optionBox = this.parentNode.parentNode
    if(optionBox.classList.contains('option-box')){
      optionBox.classList.add('hidden-box')
    }    
  },true);

  /**
   * Tab
   */
  let tabButton = select('.tab-button', true);
  let tabContent = select('.tab-content', true);
  on('click', '.tab-button', function(e) {
    e.preventDefault();  
    let href = this.querySelector('a').getAttribute('href');
    let target = select(href);

    tabContent.forEach(function(ele){
      ele.style.display = 'none';
      ele.classList.remove('active');
    });
    target.style.display = "block";
    target.classList.add('active');

    tabButton.forEach(function(ele){
      ele.classList.remove('active');
    });    
    this.classList.add('active');
  },true);
  /**
   * ID Search Button
   */
   let sections = select('section.disable', true);
   let initialPanel = select('#initial-panel');
   let errorMessage = select('.error-message');

   on('click', '#id-search-btn', function(e) {
    e.preventDefault();  
    let personID = select('#person-id').value;

    if(personID == "A123456789"){
    errorMessage.classList.add('hidden-message');
    initialPanel.classList.add('disable');
    sections.forEach(function(ele){
      ele.classList.remove('disable');
    });
    } else{
    errorMessage.classList.remove('hidden-message');
    initialPanel.classList.remove('disable');
    sections.forEach(function(ele){
      ele.classList.add('disable');
    });
    }
   }, true);
  /**
   * Tab Button
   */
   let buttons = select('#medical-certificate .tab-btns .btn', true);
   on('click', '#medical-certificate .tab-btns .btn', function(e) {
    buttons.forEach(function(ele){
      ele.classList.remove('active');
    });    
    this.classList.add('active');
   }, true);
  /**
   * Test
   */
  on('click', '#unlock-btn', function(e) {
    alert('解鎖成功!');
  },true);
  on('click', '#download-btn', function(e) {
    alert('開始下載!');
  },true)
})()
$(function(){
  $('#birthday').datepicker({
    format: 'yyyy/mm/dd',
  });
  $('#medical-date').datepicker({
    format: 'yyyy/mm/dd',
    startDate: '-181d'
  });
});