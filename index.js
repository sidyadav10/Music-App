const mainCard = document.querySelector("#ContentWarpper");
const songImg = document.querySelector("#SongImg");
const controlButtons = document.querySelector(".control");

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songImgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "./audio/_Sher_(Official_Video)__Honsla_Rakh__Yeah_proof__Laddi_Chahal__Tips_Punjabi(128k).mp3",
    title: "Sher",
    artist: "Diljit Doshanj",
    imgSrc: "images/boy-1299588_1280.png",
  },
  {
    songSrc: "audio/Black_And_White_(Remix)__-_Diljit_Dosanjh_Song_Remix_2021___Dhol_Mix__MoonChild_Era_(128k).mp3",
    title: "Black And White",
    artist: "Diljit Doshanj",
    imgSrc: "images/EhsGCh2U4AAc9Oo.jpg",
  },
  {
    songSrc: "audio/Born_To_Shine_Remix_-_DJ_Hans_DJ_SSS__Diljit_Dosanjh__New_Punjabi_Songs_2020(128k).mp3",
    title: "Born To Shine Mix",
    artist: "Diljit Doshanj",
    imgSrc: "images/pile-163497_1280.jpg",
  },
  {
    songSrc: "audio/Diljit_Dosanjh_-_G.O.A.T._(Official)_Remix__DJ_Chetas_&_DJ_NYK__New_Punjabi_Songs_2020(128k).mp3",
    title: "GOAT",
    artist: "Diljit Doshanj",
    imgSrc: "images/G-O-A-T-Punjabi-2020-20230915040651-500x500.jpg",
  },
  {
    songSrc: "audio/Diljit_Dosanjh_-_VANILLA_(Visualiser)__Drive_Thru(128k).mp3",
    title: "Vanilla",
    artist: "Diljit Doshanj",
    imgSrc: "images/rabbit-4031334_1280.png",
  },
 
  
];

const loadMusic = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songImgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadMusic(index++);
  play();
});

loadMusic();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadMusic(index++);
    play();
} else {
    index = 0
    loadMusic(index);
    play();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadMusic(index--);
    play();
  } else {
    index = songDataBase.length-1;
    loadMusic(index);
    play()
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songImg.classList.add("anime");
};
const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songImg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
    console.log(event)
    let { duration, currentTime } = event.srcElement;
    const full_second = Math.floor(duration % 60);
    console.log(full_second,"seconf")
    const full_minute = Math.floor(duration / 60);
    console.log(full_minute,"minute")
    const start_second = Math.floor(currentTime % 60);
    console.log(start_second,"start")
    const start_minute = Math.floor(currentTime / 60);
    console.log(start_minute,"start")
    const totalDuration = `${full_minute} : ${full_second}`;
    const currenDuration = `${start_minute} : ${start_second}`;
    if (duration) {
        endDuration.textContent = totalDuration;
    }
    startDuration.textContent = currenDuration;
    const percentage = (currentTime / duration) * 100;
    meter.style.width = `${percentage}%`;
};

audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
    console.log(event)
    const { duration } = audio;
    const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
    audio.currentTime = moreProgress;
});


