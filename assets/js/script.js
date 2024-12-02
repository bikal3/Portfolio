document.addEventListener("DOMContentLoaded", () => {
  const projectContainer = document.getElementById("project-container");

  data.project.forEach((project, index) => {
    const isImageLeft = index % 2 === 0; // Alternate based on the index (even: image left, odd: image right)

    const projectHTML = `
        <div class="row" id="work-row">
          ${
            isImageLeft
              ? `
            <div class="col-md-6 col-sm-12">
              <center>
                <div class="work-hero">
                  <img class="work-hero-img" src="${project.image}" alt="${project.title}" />
                </div>
              </center>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="work-des">
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                <div class="technologies">
                  <h2>Technologies Used</h2>
                  ${project.techuse.map((tech) => `<span class="tech-stack">${tech}</span>`).join("")}
                </div>
              </div>
              <button class="contact-btn work-read" style="margin:0;">Read More</button>
            </div>
            `
              : `
            <div class="col-md-6 col-sm-12">
              <div class="work-des">
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                <div class="technologies">
                  <h2>Technologies Used</h2>
                  ${project.techuse.map((tech) => `<span class="tech-stack">${tech}</span>`).join("")}
                </div>
                <button class="contact-btn work-read" style="margin:0;">Read More</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <center>
                <div class="work-hero">
                  <img class="work-hero-img" src="${project.image}" alt="${project.title}" />
                </div>
                
              </center>
            </div>
            `
          }
        </div>
        <hr class="section-separator" />
      `;

    projectContainer.insertAdjacentHTML("beforeend", projectHTML);
  });
});
