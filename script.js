// ==========================================
// PRITAM WEDS DIPIKA
// Wedding Invitation
// ==========================================


// ==========================================
// OPEN INVITATION + VIDEO SOUND
// ==========================================

const openingScreen =
  document.getElementById("openingScreen");

const openInvitation =
  document.getElementById("openInvitation");


if (openInvitation) {

  openInvitation.addEventListener(
    "click",
    () => {

      // Hide opening screen
      openingScreen.classList.add("hide");


      // Find wedding video
      const heroVideo =
        document.querySelector(".hero-video");


      if (heroVideo) {

        // Turn sound ON
        heroVideo.muted = false;

        heroVideo.volume = 1;


        // Start video
        heroVideo.play().catch(
          (error) => {

            console.log(
              "Video playback issue:",
              error
            );

          }
        );

      }


      // Allow scrolling
      document.body.style.overflow = "auto";

    }
  );

}



// ==========================================
// COUNTDOWN
// ==========================================

const weddingDate =
  new Date(
    "2026-11-25T19:00:00+05:30"
  ).getTime();


function updateCountdown() {

  const now =
    new Date().getTime();


  const distance =
    weddingDate - now;


  if (distance <= 0) {

    document.getElementById("days").textContent =
      "000";

    document.getElementById("hours").textContent =
      "00";

    document.getElementById("minutes").textContent =
      "00";

    document.getElementById("seconds").textContent =
      "00";

    return;

  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        distance %
        (1000 * 60 * 60 * 24)
      ) /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (
        distance %
        (1000 * 60 * 60)
      ) /
      (1000 * 60)
    );


  const seconds =
    Math.floor(
      (
        distance %
        (1000 * 60)
      ) /
      1000
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


updateCountdown();


setInterval(
  updateCountdown,
  1000
);



// ==========================================
// PHOTO LIGHTBOX
// ==========================================

const galleryItems =
  document.querySelectorAll(
    ".gallery-item"
  );


const lightbox =
  document.getElementById(
    "lightbox"
  );


const lightboxImage =
  document.getElementById(
    "lightboxImage"
  );


const closeLightbox =
  document.getElementById(
    "closeLightbox"
  );


galleryItems.forEach(
  (item) => {

    item.addEventListener(
      "click",
      () => {

        const image =
          item.querySelector("img");


        if (!image) return;


        lightboxImage.src =
          image.src;


        lightboxImage.alt =
          image.alt;


        lightbox.classList.add(
          "show"
        );

      }
    );

  }
);



if (closeLightbox) {

  closeLightbox.addEventListener(
    "click",
    () => {

      lightbox.classList.remove(
        "show"
      );

    }
  );

}



if (lightbox) {

  lightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target === lightbox
      ) {

        lightbox.classList.remove(
          "show"
        );

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

    if (
      event.key === "Escape"
    ) {

      lightbox.classList.remove(
        "show"
      );

    }

  }
);



// ==========================================
// SHARE INVITATION
// ==========================================

const shareButton =
  document.getElementById(
    "shareButton"
  );


if (shareButton) {

  shareButton.addEventListener(
    "click",
    () => {

      const invitationURL =
        "https://pritamdipika.vercel.app";


      const message =
        `❤️ Pritam Weds Dipika ❤️

You are warmly invited to celebrate our wedding! 💍

25 November 2026 · 7:00 PM
Railway Officers Club, Kolkata

Open our wedding invitation:
${invitationURL}`;


      const whatsappURL =
        "https://wa.me/?text=" +
        encodeURIComponent(
          message
        );


      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );

}



// ==========================================
// IMAGE FADE-IN
// ==========================================

const images =
  document.querySelectorAll(
    "img"
  );


const imageObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target.style.opacity =
              "1";


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

    image.style.opacity =
      "0";


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
// PREVENT SCROLL BEFORE OPENING
// ==========================================

document.body.style.overflow =
  "hidden";



// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(
  "❤️ Pritam Weds Dipika — 25 November 2026"
);
