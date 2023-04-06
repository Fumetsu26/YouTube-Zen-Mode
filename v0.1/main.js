// Set up API variables

//  https://www.googleapis.com/youtube/v3/search?key=AIzaSyCRTXLeGUJ06Ee7umEI5uh5ByHoN5N6KrM&type=list&q=dsa
const apiKey = "AIzaSyCRTXLeGUJ06Ee7umEI5uh5ByHoN5N6KrM"
const videoUrl = "https://www.googleapis.com/youtube/v3/search?key="
const type = "video"
const q = "dsa"
let tempVideo = "https://www.youtube.com/watch?v="
let reqId = ""

// Get the playlist element
const playlist = document.querySelector(".playlist")

// Get the video player element
const videoPlayer = document.getElementById("video-player")

// Get the playlist ID from the user input

// template string
const requestUrl = `${videoUrl}${apiKey}&type=${type}&q=${q}`

// Send the API request

// fetch call to the API returns a promise pass the template string
fetch(requestUrl) // return goes into response
  .then((response) => response.json())
  .then((data) => {
    // Parse the JSON response and extract the video IDs and titles
    // const videos = data.items.map((item) => ({
    console.log(data.items[0].id.videoId)
    reqId = data.items[0].id.videoId
    data.items.map((item) => {
      console.log(item.id.videoId)
      reqId = item.id.videoId
      let videoURL = `${tempVideo}${reqId}`
      console.log("this is video url", videoURL)
    })
    //   id: item.snippet.resourceId.videoId,
    //   title: item.snippet.title,
  })
// Create a list of links or thumbnails for the videos
//     const playlistItems = videos
//       .map(
//         (video) => `
//       <li>
//         <a href="#" data-video-id="${video.id}">${video.title}</a>
//       </li>
//     `
//       )
//       .join("")

//     // Add the playlist items to the DOM
//     playlist.innerHTML = playlistItems

//     // Add event listeners to the playlist links
//     const playlistLinks = playlist.querySelectorAll("a")
//     playlistLinks.forEach((link) => {
//       link.addEventListener("click", (event) => {
//         event.preventDefault()
//         const videoId = link.dataset.videoId
//         videoPlayer.src = `${videoUrl}${videoId}`
//       })
//     })
//   })
//   .catch((error) => console.error(error))
