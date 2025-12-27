(function () {
  async function inject(id, url) {
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
    } catch (error) {
      console.warn('[Includes]', error);
    }
  }

  function boot() {
    inject('site-nav', 'nav.html');
    inject('site-footer', 'footer.html');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once: true});
  } else {
    boot();
  }
})();
