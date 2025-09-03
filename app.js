const sections = document.querySelectorAll(".section");
const secBtns = document.querySelectorAll(".controls");
const secBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

/**
 * Initializes interactive page transitions:
 * - Handles navigation button active state.
 * - Handles section show/hide based on navigation clicks.
 * - Handles theme toggle (light/dark mode).
 * 
 * No parameters.
 * No return value.
 */

function PageTransitions() {
  //Button click active class
  for (let i = 0; i < secBtn.length; i++) {
    secBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].className = currentBtn[0].className.replace("active-btn", "");
      this.className += " active-btn";
    });
  }

  //Sections Active Class
  allSections.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      //Remove Selected from the other buttons
      secBtns.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");
      //Hide Other Sections
      sections.forEach((section) => {
        section.classList.remove('active')
      })
      const element = document.getElementById(id);
      element.classList.add('active');
    }
  });

  //Toggle Theme
  const themeBtn = document.querySelector('.theme-btn');
  themeBtn.addEventListener('click', () => {
    let element = document.body;
    element.classList.toggle('light-mode')
  })
}

/**
 * Handles the Send Email button click event:
 * Validates required form fields (name, email, message) and shows an alert
 * specifying missing fields if any. If all required fields are filled,
 * sends the email via EmailJS and alerts the result.
 * 
 * No parameters.
 * No return value.
 */

document.getElementById("sendEmailBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Gather missing fields
  const missingFields = [];
  if (!name) missingFields.push("Name");
  if (!email) missingFields.push("Email");
  if (!message) missingFields.push("Message");

  if (missingFields.length > 0) {
    alert("Please fill the following field(s): " + missingFields.join(", "));
    return;
  }

  // All required fields present, send email
  const templateParams = { name, email, subject, message };
  emailjs.send("service_3q9gyu5", "template_icsl03m", templateParams)
    .then(() => alert("Message Sent to Naga"))
    .catch(() => alert("Email not sent!"));
});

PageTransitions();