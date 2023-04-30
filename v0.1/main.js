// YouTube API script
let player;
let shouldPlay = false;
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
  document.getElementById("player").style.display = "none";
  if (shouldPlay) {
    event.target.playVideo();
  }
}
function onPlayerStateChange(event) {
  document.getElementById("player").style.display = "block";
}

// Get the video URL from the form input
const form = document.querySelector("form");
const playerDiv = document.querySelector("#player");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.querySelector("#video-url");
  const videoUrl = input.value;

  // Extract the video ID from the URL
  const videoId = videoUrl.match(/(?<=v=)[^&]+/)[0];

  // Load the video in the player
  player.loadVideoById(videoId);

  // Show the player
  playerDiv.style.display = "block";

  shouldPlay = true;
});
