document.addEventListener('DOMContentLoaded', () => {

  /* =======================
     AUTH + MODAL
  ======================== */

  const authBtn = document.querySelector('.button-auth');
  const cartBtn = document.getElementById('cart-button');

  const modalAuth = document.querySelector('.modal-auth');
  const closeAuth = document.querySelector('.close-auth');
  const loginForm = document.getElementById('logInForm');

  const loginInput = document.getElementById('login');
  const passwordInput = document.getElementById('password');

  const cardsContainer = document.querySelector('.cards-restaurants');
  const menuContainer = document.querySelector('.cards-menu');

  function openAuthModal() {
    modalAuth.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeAuthModal() {
    modalAuth.style.display = 'none';
    clearErrors();
    document.body.style.overflow = '';
  }

  function setError(input) {
    input.style.border = '2px solid red';
  }

  function clearError(input) {
    input.style.border = '';
  }

  function clearErrors() {
    clearError(loginInput);
    clearError(passwordInput);
  }

  const savedLogin = localStorage.getItem('login');
  if (savedLogin && authBtn) {
    authBtn.querySelector('.button-text').textContent = savedLogin;
  }

  if (authBtn) {
    authBtn.addEventListener('click', () => {
      const isLogged = localStorage.getItem('login');

      if (!isLogged) {
        openAuthModal();
      } else {
        localStorage.removeItem('login');
        authBtn.querySelector('.button-text').textContent = 'Війти';
      }
    });
  }

  if (closeAuth) {
    closeAuth.addEventListener('click', closeAuthModal);
  }

  modalAuth.addEventListener('click', (e) => {
    if (e.target === modalAuth) {
      closeAuthModal();
    }
  });

  loginInput.addEventListener('input', () => clearError(loginInput));
  passwordInput.addEventListener('input', () => clearError(passwordInput));

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    let hasError = false;

    if (!login) {
      setError(loginInput);
      hasError = true;
    }

    if (!password) {
      setError(passwordInput);
      hasError = true;
    }

    if (hasError) return;

    localStorage.setItem('login', login);
    authBtn.querySelector('.button-text').textContent = login;

    loginInput.value = '';
    passwordInput.value = '';
    closeAuthModal();
  });

  /* =======================
     PROMO SLIDER ✅
  ======================== */

  const promoSlides = document.querySelectorAll('.promo-slide');
  let currentSlide = 0;

  function showSlide(index) {
    promoSlides.forEach(slide => slide.classList.remove('active'));
    promoSlides[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide++;
    if (currentSlide >= promoSlides.length) {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  }

  if (promoSlides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, 4000);
  }

  /* =======================
     RESTAURANTS
  ======================== */

  const restaurants = [
    {
      name: 'Піца плюс',
      time: '50 хвилин',
      rating: '4.5',
      price: 'від 200 ₴',
      category: 'Піца',
      image: 'img/pizza-plus/preview.jpg'
    },
    {
      name: 'Танукі',
      time: '60 хвилин',
      rating: '4.5',
      price: 'від 1200 ₴',
      category: 'Суші',
      image: 'img/tanuki/preview.jpg'
    },
    {
      name: 'FoodBand',
      time: '40 хвилин',
      rating: '4.5',
      price: 'від 150 ₴',
      category: 'Піца',
      image: 'img/food-band/preview.jpg'
    }
  ];

  function renderCards() {
    if (!cardsContainer) return;

    cardsContainer.innerHTML = '';

    restaurants.forEach(item => {
      const card = document.createElement('a');
      card.href = 'restaurant.html';
      card.className = 'card card-restaurant';

      card.innerHTML = `
        <img src="${item.image}" class="card-image">
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title">${item.name}</h3>
            <span class="card-tag tag">${item.time}</span>
          </div>
          <div class="card-info">
            <div class="rating">${item.rating}</div>
            <div class="price">${item.price}</div>
            <div class="category">${item.category}</div>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!localStorage.getItem('login')) {
          e.preventDefault();
          openAuthModal();
        }
      });

      cardsContainer.appendChild(card);
    });
  }

  renderCards();

  /* =======================
     MENU
  ======================== */

  const menuItems = [
    {
      title: 'Піца Везувій',
      ingredients: 'Соус томатний, сир Моцарелла, шинка, пепероні',
      price: '545 ₴',
      image: 'img/pizza-plus/pizza-vesuvius.jpg'
    },
    {
      title: 'Піца BBQ',
      ingredients: 'Соус томатний, гриби, цибуля, кукурудза',
      price: '150 ₴',
      image: 'img/pizza-plus/pizza-girls.jpg'
    },
    {
      title: 'Піца Оле-Оле',
      ingredients: 'Соус томатний, сир, маслини, черрі',
      price: '440 ₴',
      image: 'img/pizza-plus/pizza-oleole.jpg'
    }
  ];

  function renderMenu() {
    if (!menuContainer) return;

    menuContainer.innerHTML = '';

    menuItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${item.image}" class="card-image">
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${item.title}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${item.ingredients}</div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">У кошик</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${item.price}</strong>
          </div>
        </div>
      `;

      card.querySelector('.button-add-cart').addEventListener('click', () => {
        if (!localStorage.getItem('login')) {
          openAuthModal();
        } else {
          alert('Товар додано у кошик');
        }
      });

      menuContainer.appendChild(card);
    });
  }

  renderMenu();

});
