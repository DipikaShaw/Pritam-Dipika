// ==========================================
// PRITAM WEDS DIPIKA
// Wedding Invitation
// 25 November 2026 | 7:00 PM
// ==========================================


// ==========================================
// OPEN INVITATION
// ==========================================

const openingScreen = document.getElementById("openingScreen");
const openInvitation = document.getElementById("openInvitation");
const mainContent = document.getElementById("mainContent");

if (openInvitation) {
  openInvitation.addEventListener("click", () => {

    openingScreen.classList.add("hide");

    // Start the hero video after opening
    const heroVideo = document.querySelector(".hero-video");

    if (heroVideo) {
      heroVideo.play().catch(() => {});
    }

    // Allow normal scrolling
    document.body.style.overflow = "auto";
  });
}


// ==========================================
// WEDDING COUNTDOWN
// ==========================================

const weddingDate = new Date(
  "2026-11-25T19:00:00+05:30"
).getTime();


function updateCountdown() {

  const now = new Date().getTime();

  const distance = weddingDate - now;


  if (distance <= 0) {

    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    return;
  }


  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );


  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );


  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );


  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );


  document.getElementById("days").textContent =
    String(days).padStart(3, "0");


  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");


  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");


  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

}


// Start countdown immediately
updateCountdown();


// Update every second
setInterval(
  updateCountdown,
  1000
);


// ==========================================
// PHOTO LIGHTBOX
// ==========================================

const galleryItems =
  document.querySelectorAll(".gallery-item");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const closeLightbox =
  document.getElementById("closeLightbox");


galleryItems.forEach((item) => {

  item.addEventListener("click", () => {

    const image =
      item.querySelector("img");

    if (!image) return;

    lightboxImage.src =
      image.src;

    lightboxImage.alt =
      image.alt;

    lightbox.classList.add("show");

  });

});


if (closeLightbox) {

  closeLightbox.addEventListener(
    "click",
    () => {

      lightbox.classList.remove("show");

    }
  );

}


if (lightbox) {

  lightbox.addEventListener(
    "click",
    (event) => {

      if (event.target === lightbox) {

        lightbox.classList.remove("show");

      }

    }
  );

}


// ==========================================
// ESC KEY CLOSES PHOTO
// ==========================================

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      lightbox.classList.remove("show");

    }

  }
);


// ==========================================
// RSVP → WHATSAPP
// ==========================================

const rsvpForm =
  document.getElementById("rsvpForm");


if (rsvpForm) {

  rsvpForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const name =
        document.getElementById("guestName").value.trim();


      const guests =
        document.getElementById("guestCount").value;


      const attendance =
        document.getElementById("attendance").value;


      const message =
        document.getElementById("guestMessage").value.trim();


      const whatsappText =

`❤️ Pritam Weds Dipika — RSVP ❤️

Name: ${name}

Number of guests: ${guests}

Attendance: ${attendance}

Message:
${message || "No message"}

Wedding:
25 November 2026
7:00 PM
Railway Officers Club (B. C. Roy Institute)
Kolkata`;


      const whatsappURL =
        "https://wa.me/?text=" +
        encodeURIComponent(
          whatsappText
        );


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}


// ==========================================
// SHARE INVITATION
// ==========================================

const shareButton =
  document.getElementById("shareButton");


if (shareButton) {

  shareButton.addEventListener(
    "click",
    async () => {

      const shareData = {

        title:
          "Pritam Weds Dipika ❤️",

        text:
          "You are invited to celebrate the wedding of Pritam & Dipika ❤️",

        url:
          window.location.href

      };


      // Mobile native share
      if (navigator.share) {

        try {

          await navigator.share(
            shareData
          );

        } catch (error) {

          // User cancelled sharing.
          console.log(
            "Share cancelled"
          );

        }

        return;
      }


      // Desktop fallback
      try {

        await navigator.clipboard.writeText(
          window.location.href
        );

        alert(
          "Invitation link copied!"
        );

      } catch (error) {

        alert(
          "Copy this invitation link:\n\n" +
          window.location.href
        );

      }

    }
  );

}


// ==========================================
// IMAGE FADE-IN
// ==========================================

const images =
  document.querySelectorAll("img");


const imageObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.style.opacity = "1";

            entry.target.style.transform =
              "scale(1)";

            imageObserver.unobserve(
              entry.target
            );

          }

        }
      );

    },
    {
      threshold: 0.15
    }
  );


images.forEach(
  (image) => {

    image.style.opacity = "0";

    image.style.transform =
      "scale(1.02)";

    image.style.transition =
      "opacity 0.8s ease, transform 0.8s ease";

    imageObserver.observe(
      image
    );

  }
);


// ==========================================
// PREVENT SCROLL BEFORE OPENING INVITATION
// ==========================================

document.body.style.overflow = "hidden";


// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
  "❤️ Pritam Weds Dipika — 25 November 2026"
);
