// Dynamically add the navigation menu
document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
      <nav class="nav-desk">
        <center>
          <div class="nav-logo">
            <a href="index.html"><img id="logo" src="assets/img/map.png" alt="Logo" /></a>
          </div>
          <div class="nav-items">
            <ul>
              <li>
                <span><a href="about.html">About</a></span>
              </li>
              <li>
                <span><a href="work.html">Work</a></span>
              </li>
              <li>
                <span><a href="index.html">Timeline</a></span>
              </li>
              <li>
                <span><a href="contact.html">Contact</a></span>
              </li>
            </ul>
          </div>
        </center>
      </nav>
    `;

  // Inject the navigation menu into an element with id 'nav-placeholder'
  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) {
    navPlaceholder.innerHTML = navHTML;
  }
});
