(function () {
  async function inject(id, url, callback) {
    const mount = document.getElementById(id);
    if (!mount) {
      return;
    }

    try {
      const response = await fetch(url, {cache: 'no-cache'});
      if (!response.ok) {
        throw new Error('Failed to load ' + url);
      }
      mount.innerHTML = await response.text();
      if (typeof callback === 'function') {
        callback(mount);
      }
    } catch (error) {
      console.warn('[Includes]', error);
    }
  }

  function initMobileNav(mount) {
    const mobileNav = mount.querySelector('.nav_wrap.is-mobile');
    const menu = mount.querySelector('.nav_menu_wrap');
    const button = mount.querySelector('.nav_btn_wrap');
    if (!mobileNav || !menu || !button) {
      return;
    }

    const setOpen = (open) => {
      button.classList.toggle('w--open', open);
      mobileNav.classList.toggle('w--open', open);
      menu.classList.toggle('w--open', open);
      menu.style.display = open ? 'block' : 'none';
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    setOpen(false);

    button.addEventListener('click', (event) => {
      event.preventDefault();
      setOpen(!button.classList.contains('w--open'));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });
  }

  function boot() {
    inject('site-nav', 'nav.html', initMobileNav);
    inject('site-footer', 'footer.html');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once: true});
  } else {
    boot();
  }
})();
