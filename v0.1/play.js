// Set up API variables

//  https://www.googleapis.com/youtube/v3/search?key=AIzaSyCRTXLeGUJ06Ee7umEI5uh5ByHoN5N6KrM&type=list&q=dsa

// https://www.youtube.com/watch?v=5_5oE5lgrhw&list=PLu0W_9lII9ahIappRPN0MCAgtOu3lQjQi
const apiKey = "AIzaSyCRTXLeGUJ06Ee7umEI5uh5ByHoN5N6KrM"
const videoUrl = "https://www.googleapis.com/youtube/v3/search?key="
const type = "list"
const q = "dsa"
let tempVideo = "https://www.youtube.com/watch?v="
let reqId = ""

const requestUrl = `${videoUrl}${apiKey}&type=${type}&q=${q}`

fetch(requestUrl) // return goes into response
  .then((response) => response.json())
  .then((data) => {
    reqId = data.items[0].id.videoId.playlistId
    data.items.map((item) => {
      console.log(item.id.videoId)
      reqId = item.id.videoId
      let videoURL = `${tempVideo}${reqId}`
      console.log("this is video url", videoURL)
    })
  })
