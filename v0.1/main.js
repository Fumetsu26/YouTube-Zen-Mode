// YouTube API script
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "360",
    width: "640",
    videoId: "",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  player.stopVideo();
}

// Get the video URL from the form input
const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.querySelector("#video-url");
  const videoUrl = input.value;

  // Extract the video ID from the URL
  const videoId = videoUrl.match(/(?<=v=)[^&]+/)[0];

  // Load the video in the player
  player.loadVideoById(videoId);
});
