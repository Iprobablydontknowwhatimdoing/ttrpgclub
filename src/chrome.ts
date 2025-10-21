// Web Components for shared site header and footer (no fetch, no server)

class SiteHeader extends HTMLElement {
    connectedCallback() {
        // Render into light DOM so existing CSS applies
        this.innerHTML = `
<header class="site-header">
  <div class="container">
    <div class="logo">
      <h1>🎲 <abbr title="Tabletop Role-Playing Game">TTRPG</abbr> Club</h1>
    </div>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu" aria-controls="mainNav" aria-expanded="false" type="button">
      <span>☰</span>
    </button>
    <nav class="main-nav" id="mainNav" aria-label="Main">
      <div class="mobile-nav-header">
        <span class="mobile-logo">🎲</span>
        <span class="mobile-club-name">TTRPG Club</span>
      </div>
      <button class="nav-close" id="navClose" aria-label="Close menu" type="button">&times;</button>
      <ul>
        <li><a href="/index.html">About</a></li>
        <li><a href="/games.html">Games</a></li>
        <li><a href="/events.html">Events</a></li>
        <li><a href="mailto:1eaunger@gmail.com">Contact</a></li>
        <li><a href="#register" class="nav-register">Register</a></li>
      </ul>
      <div class="nav-cta" id="navCta">
        <div class="nav-cta-inner">
          <a href="#register" class="btn cta-btn cta-register">Register</a>
          <a href="mailto:1eaunger@gmail.com" class="btn cta-btn cta-contact">Email</a>
        </div>
      </div>
    </nav>
    <div class="nav-overlay" id="navOverlay" aria-hidden="true"></div>
  </div>
  </header>`;
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
<footer id="contact" class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-section">
        <h3>TTRPG Club</h3>
        <p>Making a space for TTRPGs in Roosevelt High School.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/index.html">About</a></li>
          <li><a href="/games.html">Current Games</a></li>
          <li><a href="/events.html">Events</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Connect</h3>
        <ul>
          <li><a href="#">Discord Server</a></li>
          <li><a href="mailto:1eaunger@gmail.com">Email Us</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Meeting Info</h3>
        <p>Every Monday, 4:00 PM<br>Lower Commons</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 TTRPG Club. <span class="footer-subheading">May your rolls be high, and your stories Epic.</span></p>
    </div>
  </div>
</footer>`;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
