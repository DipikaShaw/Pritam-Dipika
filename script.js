// Dipika & Pritam — wedding invitation interactions
// The song is embedded in wedding-video.mp4; no separate MP3 is used.
document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
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
    if (videoStatus) videoStatus.textContent = playing ? "Our wedding invitation" : "Tap the centre button to play or resume with music";
  }

  async function startVideoWithSound() {
    if (!video) return;
    video.muted = false;
    try {
      await video.play();
    } catch (error) {
      // Some browsers may still block sound. Start playback muted as a fallback.
      video.muted = true;
      try {
        await video.play();
        if (videoStatus) videoStatus.textContent = "Video is playing muted. Tap the video control again to try sound.";
      } catch (retryError) {
        if (videoStatus) videoStatus.textContent = "Video could not play. Check that assets/wedding-video.mp4 is uploaded.";
        console.warn("Wedding video playback failed:", retryError);
      }
    }
    updateVideoControl();
  }

  openInvitation?.addEventListener("click", async () => {
    document.getElementById("videoPage")?.scrollIntoView({ behavior: "smooth", block: "start" });
    await startVideoWithSound();
  });

  videoToggle?.addEventListener("click", async () => {
    if (!video) return;
    if (!video.paused && !video.ended) video.pause();
    else await startVideoWithSound();
    updateVideoControl();
  });

  video?.addEventListener("click", (event) => {
    if (event.target !== video) return;
    if (!video.paused && !video.ended) video.pause();
    else startVideoWithSound();
  });
  video?.addEventListener("play", updateVideoControl);
  video?.addEventListener("pause", updateVideoControl);
  video?.addEventListener("ended", updateVideoControl);
  updateVideoControl();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Service worker registration failed:", error));
    });
  }
});
