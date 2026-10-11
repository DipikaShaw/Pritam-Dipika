// Pritam & Dipika — wedding invitation interactions
 document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const videoToggle = document.getElementById("videoToggle");
  const videoToggleIcon = document.getElementById("videoToggleIcon");
  const videoToggleLabel = document.getElementById("videoToggleLabel");
  const videoStatus = document.getElementById("videoStatus");
  const music = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");

  function updateVideoControl() {
    if (!video || !videoToggle) return;
    const playing = !video.paused && !video.ended;
    videoToggle.setAttribute("aria-pressed", String(!playing));
    videoToggle.setAttribute("aria-label", playing ? "Pause wedding video" : "Play wedding video");
    if (videoToggleIcon) videoToggleIcon.textContent = playing ? "Ⅱ" : "▶";
    if (videoToggleLabel) videoToggleLabel.textContent = playing ? "Pause video" : "Play video";
    if (videoStatus) videoStatus.textContent = playing ? "A little film of our love" : "Video paused — press play when you are ready";
  }

  async function toggleVideo() {
    if (!video) return;
    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch (error) {
        if (videoStatus) videoStatus.textContent = "Video could not play. Check that assets/wedding-video.mp4 is uploaded.";
        console.warn("Wedding video playback failed:", error);
      }
    } else {
      video.pause();
    }
    updateVideoControl();
  }

  videoToggle?.addEventListener("click", toggleVideo);
  // Tapping the background itself toggles playback too. The overlay/text/buttons do not.
  video?.addEventListener("click", (event) => {
    if (event.target === video) toggleVideo();
  });
  video?.addEventListener("play", updateVideoControl);
  video?.addEventListener("pause", updateVideoControl);
  video?.addEventListener("ended", updateVideoControl);
  // Attempt autoplay; browsers normally permit muted video autoplay.
  if (video) video.play().catch(() => updateVideoControl());
  updateVideoControl();

  function updateMusicButton() {
    if (!musicToggle || !music) return;
    const playing = !music.paused;
    musicToggle.setAttribute("aria-pressed", String(playing));
    musicToggle.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
    if (musicLabel) musicLabel.textContent = playing ? "Pause music" : "Play music";
  }

  musicToggle?.addEventListener("click", async () => {
    if (!music) return;
    try {
      if (music.paused) await music.play();
      else music.pause();
    } catch (error) {
      console.warn("Background music could not play. Check assets/wedding-song.mp3.", error);
    }
    updateMusicButton();
  });
  music?.addEventListener("play", updateMusicButton);
  music?.addEventListener("pause", updateMusicButton);
  updateMusicButton();

  // Register PWA service worker if present.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
});
