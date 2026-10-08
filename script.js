/* =====================================================
   PRITAM WEDS DIPIKA
   WEDDING INVITATION JAVASCRIPT
===================================================== */


/* =====================================================
   OPEN INVITATION
===================================================== */

const openingScreen =
  document.getElementById("openingScreen");

const openInvitation =
  document.getElementById("openInvitation");

const heroVideo =
  document.querySelector(".hero-video");


if (openInvitation) {

  openInvitation.addEventListener("click", () => {

    /* Hide opening screen */

    openingScreen.classList.add("hide");


    /* Try to start video with sound */

    if (heroVideo) {

      heroVideo.muted = false;
      heroVideo.volume = 1;

      const playPromise =
        heroVideo.play();

      if (playPromise !== undefined) {

        playPromise.catch(() => {

          /*
            Some browsers may still block
            autoplay with sound.
          */

          heroVideo.muted = true;

          heroVideo.play().catch(() => {});

        });

      }

    }

  });

}


/* =====================================================
   SCROLL TO NEXT SECTION
===================================================== */

const scrollButtons =
  document.querySelectorAll(".scroll-indicator");


scrollButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const nextSectionId =
      button.getAttribute("data-next");

    if (!nextSectionId) {
      return;
    }

    const nextSection =
      document.getElementById(nextSectionId);

    if (!nextSection) {
      return;
    }

    nextSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
  new Date("2026-11-25T19:00:00+05:30");


function updateCountdown() {

  const now =
    new Date();

  const difference =
    weddingDate.getTime() -
    now.getTime();


  const daysElement =
    document.getElementById("days");

  const hoursElement =
    document.getElementById("hours");

  const minutesElement =
    document.getElementById("minutes");

  const secondsElement =
    document.getElementById("seconds");


  if (!daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement) {

    return;

  }


  if (difference <= 0) {

    daysElement.textContent = "000";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;

  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (difference /
        (1000 * 60 * 60)) %
        24
    );


  const minutes =
    Math.floor(
      (difference /
        (1000 * 60)) %
        60
    );


  const seconds =
    Math.floor(
      (difference / 1000) %
      60
    );


  daysElement.textContent =
    String(days).padStart(3, "0");

  hoursElement.textContent =
    String(hours).padStart(2, "0");

  minutesElement.textContent =
    String(minutes).padStart(2, "0");

  secondsElement.textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
  document.querySelectorAll(".gallery-item img");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const closeLightbox =
  document.getElementById("closeLightbox");


galleryImages.forEach((image) => {

  image.addEventListener("click", () => {

    lightboxImage.src =
      image.src;

    lightboxImage.alt =
      image.alt;

    lightbox.classList.add("show");

    document.body.style.overflow =
      "hidden";

  });

});


function closeImageLightbox() {

  lightbox.classList.remove("show");

  document.body.style.overflow =
    "";

}


if (closeLightbox) {

  closeLightbox.addEventListener(
    "click",
    closeImageLightbox
  );

}


if (lightbox) {

  lightbox.addEventListener(
    "click",
    (event) => {

      if (
        event.target === lightbox
      ) {

        closeImageLightbox();

      }

    }
  );

}


/* =====================================================
   ESC KEY CLOSES LIGHTBOX
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeImageLightbox();

    }

  }
);
