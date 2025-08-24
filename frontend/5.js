console.log("This is the content of 5.js");
let currentSong = new Audio();
async function songs() {

    let a = await fetch("http://127.0.0.1:3000/song/")
    let response = await a.text();
    console.log(response);
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let S = [];
    for (let i = 0; i < as.length; i++) {
        let a = as[i];
        if (a.href.endsWith(".mp3")) {
            S.push(a.href.split("/song/")[1]);// Get only the file name, not the full URL
        }


    }
    return S;
}

const playmusic = (so) => {
    
    
    
    currentSong.src = "/song/" + so;
    currentSong.play();
    play.src = "pause.svg";
    document.querySelector(".songinfo").innerText = so;
    document.querySelector(".songtime").title = "00:00/00:00";
}

async function playSong() {
    
    let S = await songs();
    console.log(S);
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of S) {
        songUL.innerHTML = songUL.innerHTML + `<li>
                        <img class="invert" src="music.svg" alt="Add Icon" />
                        <div class="info">
                        <div> ${song.replaceAll("%20", " ")}</div>
                            
                            
                            
                        </div>
                        <div class="playnow">
                            <span>play now</span>
                            <img class="invert" src="plaay.svg" alt="Like Icon" />
                        </div>
                    </li>`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach((element) => {
        console.log(element.querySelector(".info").firstElementChild.innerText);
        element.querySelector(".playnow").addEventListener("click", () => {
            playmusic(element.querySelector(".info").firstElementChild.innerText.trim());
        });
    });
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "plaay.svg";
        }
    });
    currentSong.addEventListener("timeupdate", () => {
        let current = Math.floor(currentSong.currentTime);
        let duration = Math.floor(currentSong.duration);
        let curM = Math.floor(current / 60);
        let curS = current % 60;
        let durM = Math.floor(duration / 60);
        let durS = duration % 60;
        if (isNaN(durM)) {
            durM = 0;
            durS = 0;
        }
        if (isNaN(curM)) {
            curM = 0;
            curS = 0;
        }
        if (curS < 10) {
            curS = "0" + curS;
        }
        if (durS < 10) {
            durS = "0" + durS;
        }
        document.querySelector(".songtime").innerText = `${curM}:${curS}/${durM}:${durS}`;
        document.querySelector(".circle").style.left = `${(current / duration) * 100}%`;
    });
}

playSong();

