const apiKey = 'AIzaSyBpW4RE11YybhSTgvTZRWX8FSItw2NGBvs'; // Your YouTube Data API key
const channelId = 'UC4NsCPOo3pv9j7ZwR2AMV3w'; // Your YouTube Channel ID
const videoGallery = document.getElementById('video-gallery');

// Function to fetch YouTube videos
async function fetchYouTubeVideos() {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`);
    
    // Check if the response is okay
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    
    const data = await response.json();
    displayVideos(data.items);
  } catch (error) {
    console.error('Error fetching videos:', error);
    videoGallery.innerHTML = '<p>Failed to load videos. Please try again later.</p>';
  }
}

// Function to display videos
function displayVideos(videos) {
  if (videos.length === 0) {
    videoGallery.innerHTML = '<p>No videos found.</p>';
    return;
  }

  videos.forEach(video => {
    if (video.id.kind === "youtube#video") {
      const videoElement = document.createElement('iframe');
      videoElement.src = `https://www.youtube.com/embed/${video.id.videoId}`;
      videoElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      videoElement.allowFullscreen = true;
      videoGallery.appendChild(videoElement);
    }
  });
}

// Fetch videos on page load
window.onload = () => {
  fetchYouTubeVideos();
};

// Parallax Background Effect
document.addEventListener('mousemove', (event) => {
  const parallaxElement = document.querySelector('body[data-parallax]::before');

  if (parallaxElement) {
    const offsetX = (event.clientX / window.innerWidth - 0.5) * 20;
    const offsetY = (event.clientY / window.innerHeight - 0.5) * 20;

    parallaxElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});
