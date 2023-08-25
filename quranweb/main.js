let audio = document.querySelector('.quranPlayer'),
  surahsContainer = document.querySelector('.surahs'),
  ayah = document.querySelector('.ayah'),
  next = document.querySelector('.next'),
  prev = document.querySelector('.prev'),
  play = document.querySelector('.play');

getSurahs();

function getSurahs() {
  // Fetch To Get Surahs data
  fetch('https://quran-endpoint.vercel.app/quran')
    .then(response => response.json())
    .then(data => {
      for (let surah in data.data) {
        // Create a new div element for each surah
        let surahDiv = document.createElement('div');
        surahDiv.innerHTML = `
          <p>${data.data[surah].asma.ar.long}</p>
          <p>${data.data[surah].asma.en.long}</p>
        `;
        
        // Add click event listener to play the surah
        surahDiv.addEventListener('click', () => {
          // Set the audio source to the surah audio URL
          audio.src = data.data[surah].recitation.full;
          
          // Play the audio
          audio.play();
        });
        
        // Append the surah div to the surahs container
        surahsContainer.appendChild(surahDiv);
      }
    });

    //////////////////
    function playSurah() {
        // Set the audio source to the surah audio URL
        audio.src = 'http://download.quranicaudio.com/quran/ahmed_ibn_3ali_al-3ajamy/002.mp3';
        
        // Play or pause the audio based on the current state
        if (!isPlaying) {
          audio.play();
          isPlaying = true;
          play.textContent = 'Pause';
        } else {
          audio.pause();
          isPlaying = false;
          play.textContent = 'Play';
        }
      }
      
      // Event listener for the play/pause button
      play.addEventListener('click', () => {
        if (currentSurahIndex >= 0) {
          playSurah(data.data[currentSurahIndex].recitation.full);
        }
      });
      

      
}