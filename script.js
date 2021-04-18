const songs =[
   {
      title:"Complicated",
      artist:"Mac Miller",
      cover:"images/complicated.jpg",
      source:"songs/complicated.mp3"
   },
   {
      title:"Inside Out",
      artist:"Spoon",
      cover:"images/inside-out.jpg",
      source:"songs/inside-out.mp3"
   },
   {
      title:"Old Town Road",
      artist:"Lil Nas X",
      cover:"images/old-town-road.jpg",
      source:"songs/Old-Town-Road.mp3"
   },
   {
      title:"Sorcererz",
      artist:"Gorillaz",
      cover:"images/sorcererz.jpg",
      source:"songs/sorcererz.mp3"
   },
   {
      title:"Porcelain",
      artist:"Moby",
      cover:"images/porcelain.jpg",
      source:"songs/porcelain.mp3"
   }
  
]

//....Get the Elemenets
const cover= document.querySelector('.cover-image');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const playBtn =document.querySelector('.play-pause-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const changeIcon = document.querySelector('.changeIcon');
const audio = document.querySelector('.audio');
const progress = document.querySelector('.progress');
const progressContainer =document.querySelector('.progress-container');
const songCurrentTime = document.getElementById('songCurrentTime');
const songDuration = document.getElementById('songDuration');



let songIndex=2;

//.....Load the song Initially
loadSong(songs[songIndex]);


//......Load function................
function loadSong(){
   cover.src=songs[songIndex].cover;
   title.textContent = songs[songIndex].title;
   artist.textContent = songs[songIndex].artist;
   audio.src=songs[songIndex].source;
   
}

//.......Play function..........
function playSong(){
   audio.classList.add("playing");
   audio.play();
   changeIcon.classList.remove("bx-play");
   changeIcon.classList.add("bx-pause");
}

//........Pause function...........
function pauseSong(){
   audio.classList.remove("playing");
   audio.pause();
   changeIcon.classList.add("bx-play");
   changeIcon.classList.remove("bx-pause");
}

//.......Previous Song function...........
function prevSong(){
   songIndex--;
if(songIndex < 0){
   songIndex = songs.length-1;
}
loadSong(songIndex);
playSong();
}


//.......Next Song function..........
function nextSong(){
   songIndex++;
   if(songIndex > songs.length-1){
      songIndex = 0;
   }
   loadSong(songIndex);
   playSong();
}

//......Filling the progress bar...........
function updateProgress(e){
   
   const currentTime = e.srcElement.currentTime;
   const totalTime = e.srcElement.duration;
 
   const progressPercent = (currentTime/totalTime)*100;
   progress.style.width = `${progressPercent}%`; 
 
 }

 //.......Skipping the song by clicking on progress bar
 function setProgress(e){
 const width = this.clientWidth;
 const clickX = e.offsetX;
 const totalTime = audio.duration;
 
 audio.currentTime = (clickX/width)*totalTime;
 }

 //.......Setting the song timings...
 function changeTime(e){
   const currentTime = e.srcElement.currentTime;
   const totalTime = e.srcElement.duration;

   // updating the time
   let initialMinutes= Math.floor(currentTime/60);
   let initialSeconds = Math.floor(currentTime%60);
   // adding a 0 at the start 
   if(initialSeconds <10 ){
      initialSeconds = `0${initialSeconds}`;
   }
   songCurrentTime.textContent = `${initialMinutes}:${initialSeconds}`;

   
   // setting the total duration
   let finalMinutes= Math.floor(totalTime/60);
   let finalSeconds = Math.floor(totalTime%60);
   // adding a 0 at the end 
   if(finalSeconds < 10 ){
      finalSeconds = `${finalSeconds}0`;
   }
   if(totalTime){
      songDuration.textContent = `${finalMinutes}:${finalSeconds}`;
   }
   
   
 }

//....... Play Pause Button........
playBtn.addEventListener('click',function(){
   const isPlaying = audio.classList.contains("playing");
   
   if(isPlaying){
      pauseSong();
   }
   else{
      playSong();
   }
  

});
 
//......Event Listners..........
   prevBtn.addEventListener('click',prevSong);
   nextBtn.addEventListener('click',nextSong);

    
   audio.addEventListener('timeupdate',updateProgress);
   audio.addEventListener('timeupdate',changeTime); 

   progressContainer.addEventListener('click',setProgress);

   audio.addEventListener('ended',nextSong)
  



//......Playlist Section........
let playlist= document.querySelector('.playlist');
const playlistBtn = document.querySelector('.playlistBtn');

playlistBtn.addEventListener('click',openPlaylist);

function openPlaylist(){
   playlist.classList.toggle('activePlayList');

};

//.....adding songs to to the playList dynamically
songs.forEach(function(song){

      
   const pSong = document.createElement('div');
   pSong.classList.add("p-song");

   const pSongName = document.createElement('p');
   pSongName.classList.add("p-title");
   pSongName.textContent=song.title;

   const pSongArtist = document.createElement('p');
   pSongArtist.classList.add("p-artist");
   pSongArtist.textContent=song.artist;

   const pPlayBtn = document.createElement('button');
   pPlayBtn.classList.add('pPlay');
   pPlayBtn.innerHTML="<i class='bx bx-play'></i>";
   

   pSong.appendChild(pSongName);
   pSong.appendChild(pSongArtist);
   pSong.appendChild(pPlayBtn);

   playlist.appendChild(pSong);


});

//....Play Button Inside the Playlist
const pPlayButton = document.querySelectorAll('.pPlay');
pPlayButton.forEach(function(btn){
   btn.addEventListener('click',function(){

      //Getting the title of the song on which the Play button is clicked
      const songTitle = btn.parentElement.firstChild.textContent;

      //using filter to get the song title from songs Array and comparing with the title obtained from button click
      
      songs.filter(function(song){
         if (song.title == songTitle){
            
            //loading the song
            cover.src=song.cover;
            title.textContent = song.title;
            artist.textContent = song.artist;
            audio.src=song.source;
         }
         
         playSong();
         
      })

   })
})





