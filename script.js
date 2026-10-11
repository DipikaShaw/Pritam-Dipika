// Dipika & Pritam — wedding invitation interactions
// The video contains the song; no separate MP3 is required.
document.addEventListener("DOMContentLoaded", () => {
  const openInvitation = document.getElementById("openInvitation");
  const video = document.getElementById("heroVideo");
  const videoToggle = document.getElementById("videoToggle");
  const videoToggleIcon = document.getElementById("videoToggleIcon");
  const videoStatus = document.getElementById("videoStatus");

  function updateVideoControl() {
    if (!video || !videoToggle) return;
    const playing = !video.paused && !video.ended;
    videoToggle.setAttribute("aria-pressed", String(playing));
    videoToggle.setAttribute("aria-label", playing ? "Pause wedding video" : "Play wedding video with sound");
    if (videoToggleIcon) videoToggleIcon.textContent = playing ? "Ⅱ" : "▶";
    if (videoStatus) {
      videoStatus.textContent = playing
        ? "Our wedding invitation"
        : "Tap the round button to play or resume our invitation";
    }
  }

  async function playVideoWithSound() {
    if (!video) return;
    video.muted = false;
    try {
      await video.play();
    } catch (error) {
      // Some browsers may block sound. Retry muted so the video still plays.
      video.muted = true;
      try {
        await video.play();
        if (videoStatus) videoStatus.textContent = "Video is playing muted. Tap the sound control in your browser to enable audio.";
      } catch (retryError) {
        if (videoStatus) videoStatus.textContent = "Video could not play. Check that assets/wedding-video.mp4 is uploaded.";
        console.warn("Wedding video playback failed:", retryError);
      }
    }
    updateVideoControl();
  }

  // The cover is the only visible page until the viewer explicitly opens the invitation.
  openInvitation?.addEventListener("click", async () => {
    document.body.classList.add("invitation-open");
    document.getElementById("videoPage")?.scrollIntoView({ behavior: "auto", block: "start" });
    await playVideoWithSound();
  });

  async function toggleVideo() {
    if (!video) return;
    if (video.paused || video.ended) {
      await playVideoWithSound();
    } else {
      video.pause();
      updateVideoControl();
    }
  }

  videoToggle?.addEventListener("click", toggleVideo);
  video?.addEventListener("click", (event) => {
    if (event.target === video && document.body.classList.contains("invitation-open")) toggleVideo();
  });
  video?.addEventListener("play", updateVideoControl);
  video?.addEventListener("pause", updateVideoControl);
  video?.addEventListener("ended", updateVideoControl);

  // Do not start or download/play the video before OPEN INVITATION is clicked.
  if (video) video.pause();
  updateVideoControl();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => {
        console.warn("Service worker registration failed:", error);
      });
    });
  }
});
