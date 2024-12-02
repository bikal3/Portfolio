document.addEventListener("DOMContentLoaded", () => {
  // Function to create a timeline item
  const createTimelineItem = (item, isExperience = false) => {
    return `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-date">${item.dates}</div>
            <h3>${isExperience ? item.post : item.degree}</h3>
            <p>${isExperience ? item.company : item.Univeristy}</p>
            ${item.description ? `<p>${item.description}</p>` : ""}
            ${item.stack ? `<p><strong>Technologies:</strong> ${item.stack}</p>` : ""}
          </div>
        </div>
      `;
  };

  // Populate Education Timeline
  const educationTimeline = document.getElementById("education-timeline");
  data.education.forEach((edu) => {
    educationTimeline.innerHTML += createTimelineItem(edu);
  });

  // Populate Experience Timeline
  const experienceTimeline = document.getElementById("experience-timeline");
  data.experience.forEach((exp) => {
    experienceTimeline.innerHTML += createTimelineItem(exp, true);
  });
});
