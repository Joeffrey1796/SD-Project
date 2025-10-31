function showCustomAlert(status, message) {
  const alert = document.getElementById('customAlert');
  alert.querySelector('h2').textContent = status;
  alert.querySelector('p').textContent = message;
  alert.style.display = 'block';
}

function closeCustomAlert() {
  document.getElementById('customAlert').style.display = 'none';
}

(function() {
  emailjs.init({
    publicKey: "Fy4PHUSTQWhAj58Vq"
  });
})();

//? Process feedback
document.addEventListener("DOMContentLoaded", () => {
  const service_id = "service_j8iuz4h";
  const template_id = "template_9n6phcf";
  const form = document.getElementById("contact-form");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Disable button to prevent multiple sends
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(service_id, template_id, this)
      .then(() => {
        showCustomAlert('Feedback Received!', 'Your feedback is appreciated and will be reviewed!');
        form.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send message. Please try again.");
      })
      .finally(() => {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      });
  });
});
