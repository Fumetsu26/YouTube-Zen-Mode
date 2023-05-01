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

  try {
    let playlistId = videoUrl.match(/(?<=list=)[^&]+/)[0];
  
    console.log("playlistId:"+playlistId);
    
    var apiKey = 'AIzaSyCRTXLeGUJ06Ee7umEI5uh5ByHoN5N6KrM';

    // Define the API endpoint URL.
    var apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=' + playlistId + '&key=' + apiKey;
    
    if (playlistId != null) {
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Extract the video IDs, titles, and URLs from the API response.
        var videos = data.items.map(item => {
          return {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            url: 'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId
          };
        });

        var urls = data.items.map(item => 'https://www.youtube.com/watch?v=' + item.snippet.resourceId.videoId);
        var ids = data.items.map(item => item.snippet.resourceId.videoId);

        // Populate the video list with list items and links for each video.
        var videoList = document.getElementById('video-list');
        videos.forEach(video => {
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.textContent = video.title;
          link.target = '_blank';
          link.onclick = function() {
            player.loadVideoById(video.id);
            playerDiv.style.display = "block";
            shouldPlay = true;
          };
          listItem.appendChild(link);
          videoList.appendChild(listItem);
        });
        console.log("Playing:"+ids[0]);
        player.loadVideoById(ids[0]);
        playerDiv.style.display = "block";
        shouldPlay = true;
      })
      .catch(error => {
        console.error(error);
      });
    }
    else {
      console.log("videoId:"+videoId);
    }
    console.log("videoId:"+videoId);
  }
  
  catch {
    let videoId = videoUrl.match(/(?<=v=)[^&]+/)[0];
    player.loadVideoById(videoId);

    // Show the player
    playerDiv.style.display = "block";

    shouldPlay = true;
    var videoList = document.getElementById('video-list');
    videoList.innerHTML = "";
  }
});