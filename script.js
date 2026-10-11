// Pritam & Dipika — invitation interactions
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("backgroundMusic");
  const introScreen = document.getElementById("introScreen");
  const openInvitation = document.getElementById("openInvitation");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");
  const invitationVideo = document.getElementById("invitationVideo");
  const videoHint = document.getElementById("videoHint");

  function updateMusicButton() {
    const playing = music && !music.paused;
    musicToggle?.setAttribute("aria-pressed", String(Boolean(playing)));
    if (musicLabel) musicLabel.textContent = playing ? "Pause music" : "Play music";
  }

  async function playMusic() {
    if (!music) return;
    try {
      await music.play();
    } catch (error) {
      // Browsers may block audio until a visitor interacts with the page.
      console.info("Background music needs a user gesture to play.", error);
    }
    updateMusicButton();
  }

  function pauseMusic() {
    if (music) music.pause();
    updateMusicButton();
  }

  // The cover button opens the invitation and attempts to start the music.
  openInvitation?.addEventListener("click", async () => {
    introScreen?.classList.add("is-hidden");
    await playMusic();
  });

  // Keep a separate, accessible control for background music.
  musicToggle?.addEventListener("click", async () => {
    if (!music) return;
    if (music.paused) await playMusic();
    else pauseMusic();
  });

  music?.addEventListener("play", updateMusicButton);
  music?.addEventListener("pause", updateMusicButton);
  updateMusicButton();

  // Video tap/click toggles playback: playing -> pause, paused -> play.
  // Native controls remain enabled for seeking and volume. Ignore clicks on
  // the native control area when possible by listening on the video element;
  // the standard controls still work normally.
  invitationVideo?.addEventListener("click", async (event) => {
    const video = event.currentTarget;
    // A click on the video surface toggles playback. Native control clicks
    // are handled by the browser; this behavior is best on the video surface.
    if (video.paused) {
      try {
        await video.play();
        if (videoHint) videoHint.textContent = "Playing — tap the video to pause.";
      } catch (error) {
        if (videoHint) videoHint.textContent = "Playback could not start. Check that the video file exists in assets/.";
        console.warn("Video playback failed:", error);
      }
    } else {
      video.pause();
      if (videoHint) videoHint.textContent = "Paused — tap the video to resume.";
    }
  });

  invitationVideo?.addEventListener("play", () => {
    if (videoHint) videoHint.textContent = "Playing — tap the video to pause.";
  });
  invitationVideo?.addEventListener("pause", () => {
    if (videoHint) videoHint.textContent = "Paused — tap the video to resume.";
  });

  // Register service worker for PWA/offline shell support.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
});
