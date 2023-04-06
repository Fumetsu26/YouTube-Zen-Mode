// Set up API variables
const apiKey = "AIzaSyCRTXLeGUJ06Ee7umEI5uh5ByHoN5N6KrM";
const playlistUrl =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=";
const videoUrl = "https://www.youtube.com/watch?v=";

// Get the playlist element
const playlist = document.querySelector(".playlist");

// Get the video player element
const videoPlayer = document.getElementById("video-player");

// Get the playlist ID from the user input
const playlistId = "YOUR_PLAYLIST_ID"; // Replace with the user input

// Construct the API request URL
const requestUrl = `${playlistUrl}${playlistId}&key=${apiKey}`;

// Send the API request
fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    // Parse the JSON response and extract the video IDs and titles
    const videos = data.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
    }));

    // Create a list of links or thumbnails for the videos
    const playlistItems = videos
      .map(
        (video) => `
      <li>
        <a href="#" data-video-id="${video.id}">${video.title}</a>
      </li>
    `
      )
      .join("");

    // Add the playlist items to the DOM
    playlist.innerHTML = playlistItems;

    // Add event listeners to the playlist links
    const playlistLinks = playlist.querySelectorAll("a");
    playlistLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const videoId = link.dataset.videoId;
        videoPlayer.src = `${videoUrl}${videoId}`;
      });
    });
  })
  .catch((error) => console.error(error));
