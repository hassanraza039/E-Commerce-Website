// ================= CONTACT PAGE (contact.html) =================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in your name, email, and message.");
            return;
        }

        // Yahan aap apna backend/email service call kar sakte hain
        alert("Thank you, " + name + "! Your message has been sent. We'll get back to you soon.");
        contactForm.reset();
    });
}