document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("music").pause();
    document.getElementById("hidden").style = "opacity: 0; transition: 2s;";

    document.addEventListener("mousedown", handleMouseDown);

    document.getElementById("volumeControl")?.addEventListener("input", adjustVolume);
    document.getElementById("progressControl")?.addEventListener("input", seekTrack);

    const music = document.getElementById("music");
    const currentSongTitle = document.getElementById("currentSongTitle");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const songs = [
        { src: "media/music.mp3", title: "CITY MORGUE - SCREAMING AT THE RAIN", marqueeText: "What did you fuck up, and then who did you blame?" },
        { src: "media/music2.mp3", title: "LIL PEEP - BENZ TRUCK", marqueeText: "Who you wanna hate now? Pretty soon you gonna hate me." },
        { src: "media/music3.mp3", title: "$UICIDEBOYS$  - ANTARTICA", marqueeText: "Spray paint the walls with blood and whatever." }
    ];

    let currentSongIndex = 0;

    function handleMouseDown() {
        music.play();
        document.getElementById("preload").style = "opacity: 0; transition: 3s;";
        document.getElementById("hidden").style = "opacity: 1; transition: 6s;";

        var rythm = new Rythm();
        rythm.addRythm("blur1", "blur", 0, 250);
        rythm.addRythm('bass', 'pulse', 0, 10, { min: 0.6, max: 0.8 });
        rythm.connectExternalAudioElement(music);
        rythm.setGain(0.07);
        rythm.start();

        document.getElementById("duration").textContent = formatTime(music.duration);
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    function loadSong(index) {
        const song = songs[index];
        music.src = song.src;
        music.play();
        if (currentSongTitle) currentSongTitle.textContent = song.title;
        const marquee = document.querySelector("marquee");
        if (marquee) marquee.textContent = song.marqueeText;
    }

    function adjustVolume() {
        const volume = document.getElementById("volumeControl")?.value;
        if (music) music.volume = volume;
    }

    function updateProgress() {
        const progress = document.getElementById("progressControl");
        const currentTime = music.currentTime;
        if (progress) progress.value = (currentTime / music.duration) * 100;
        document.getElementById("currentTime").textContent = formatTime(currentTime);
    }

    function seekTrack() {
        const progress = document.getElementById("progressControl");
        if (progress) {
            const seekTime = (progress.value / 100) * music.duration;
            music.currentTime = seekTime;
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    if (prevBtn) prevBtn.addEventListener("click", prevSong);
    if (nextBtn) nextBtn.addEventListener("click", nextSong);

    music.addEventListener("timeupdate", updateProgress);

    music.addEventListener("loadedmetadata", function () {
        document.getElementById("duration").textContent = formatTime(this.duration);
    });

    loadSong(currentSongIndex);
});