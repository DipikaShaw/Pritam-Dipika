// Pritam & Dipika — wedding invitation interactions
// The song is part of the video, so no separate MP3 or audio element is needed.
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("heroVideo");
  const videoToggle = document.getElementById("videoToggle");
  const videoToggleIcon = document.getElementById("videoToggleIcon");
  const videoToggleLabel = document.getElementById("videoToggleLabel");
  const videoStatus = document.getElementById("videoStatus");

  function updateVideoControl() {
    if (!video || !videoToggle) return;
    const playing = !video.paused && !video.ended;
    videoToggle.setAttribute("aria-pressed", String(!playing));
    videoToggle.setAttribute("aria-label", playing ? "Pause wedding video" : "Play wedding video with sound");
    if (videoToggleIcon) videoToggleIcon.textContent = playing ? "Ⅱ" : "▶";
    if (videoToggleLabel) videoToggleLabel.textContent = playing ? "Pause video" : "Play video with sound";
    if (videoStatus) {
      videoStatus.textContent = playing
        ? "Our wedding invitation"
        : "Video paused — press play to resume the video and its song";
    }
  }

  async function toggleVideo() {
    if (!video) return;
    if (video.paused || video.ended) {
      // Browsers commonly block autoplay with sound. Start muted autoplay,
      // then enable sound after the visitor's explicit play-button gesture.
      video.muted = false;
      try {
        await video.play();
      } catch (error) {
        // If sound playback is blocked, retry muted so the video still works.
        video.muted = true;
        try {
          await video.play();
          if (videoStatus) videoStatus.textContent = "Video is playing muted. Use your device/browser controls to enable sound.";
        } catch (retryError) {
          if (videoStatus) videoStatus.textContent = "Video could not play. Check that assets/wedding-video.mp4 is uploaded.";
          console.warn("Wedding video playback failed:", retryError);
        }
      }
    } else {
      video.pause();
    }
    updateVideoControl();
  }

  videoToggle?.addEventListener("click", toggleVideo);

  // Tapping the video itself toggles pause/resume; tapping text or buttons does not.
  video?.addEventListener("click", (event) => {
    if (event.target === video) toggleVideo();
  });

  video?.addEventListener("play", updateVideoControl);
  video?.addEventListener("pause", updateVideoControl);
  video?.addEventListener("ended", updateVideoControl);

  // Muted autoplay is allowed by most browsers. The viewer can enable sound
  // by tapping the central play/pause button after the invitation opens.
  if (video) {
    video.muted = true;
    video.play().catch(() => updateVideoControl());
  }
  updateVideoControl();

  // Register PWA service worker if present.
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
});
