document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.workday-video-frame').forEach((frame) => {
    const video = frame.querySelector('video');
    const playButton = frame.querySelector('[data-workday-video-play]');
    if (!video || !playButton) return;

    const showPlayButton = () => { playButton.hidden = false; };
    const hidePlayButton = () => { playButton.hidden = true; };

    video.addEventListener('play', hidePlayButton);
    video.addEventListener('pause', showPlayButton);
    video.addEventListener('ended', showPlayButton);

    playButton.addEventListener('click', () => {
      video.controls = true;
      video.play().catch(showPlayButton);
    });

    // Muted, inline playback is permitted by most browsers. Native controls
    // remain visible if the browser declines the autoplay request.
    video.play().catch(showPlayButton);
  });
});
