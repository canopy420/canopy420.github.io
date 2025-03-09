document.getElementById("music").pause();
document.getElementById("hidden").style = "opacity: 0; transition: 2s;";

document.addEventListener("mousedown", handleMouseDown);

document.getElementById("volumeControl").addEventListener("input", adjustVolume);
document.getElementById("progressControl").addEventListener("input", seekTrack);

const music = document.getElementById("music");
const currentSongTitle = document.getElementById("currentSongTitle");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Lista de canciones (el marquee text solo busca la etiqueta <marquee y cambia el texto>)
const songs = [
    { src: "resources/music.mp3", title: "JUICE WRLD - WASTED (FT. LIL UZI VERT)", marqueeText: "Wasted, I'm on these drugs, I feel wasted." },
    { src: "resources/music2.mp3", title: "LIL TRACY - TATTOOS", marqueeText: "I'm gettin' rich, I'ma die in a mansion." },
    { src: "resources/music3.mp3", title: "LIL PEEP - THE WAY I SEE THINGS", marqueeText: "I got a feeling' that I'm not gonna be here for next year." }
];

// Empieza en la canción 0 (va de 0 a 2)
let currentSongIndex = 0;

// Animación inicial
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

// Función para cambiar a la canción anterior
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

// Función para cambiar a la siguiente canción
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

// Función para cargar una canción
function loadSong(index) {
    const song = songs[index];
    music.src = song.src;
    music.play();
    currentSongTitle.textContent = song.title; // Actualizar el nombre de la canción entre las flechas
    document.querySelector("marquee").textContent = song.marqueeText; // Actualizar el texto del marquee
}

// Función para ajustar el volumen
function adjustVolume() {
    const volume = document.getElementById("volumeControl").value;
    music.volume = volume;
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const progress = document.getElementById("progressControl");
    const currentTime = music.currentTime;

    progress.value = (currentTime / music.duration) * 100;

    document.getElementById("currentTime").textContent = formatTime(currentTime);
}

// Función para buscar en la pista
function seekTrack() {
    const progress = document.getElementById("progressControl");
    const seekTime = (progress.value / 100) * music.duration;
    music.currentTime = seekTime;
}

// Función para formatear el tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

// Eventos
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Actualizar la barra de progreso y el tiempo en cada actualización
music.addEventListener("timeupdate", updateProgress);

// Actualizar la duración una vez que se carguen los metadatos
music.addEventListener("loadedmetadata", function () {
    document.getElementById("duration").textContent = formatTime(this.duration);
});

// Cargar la primera canción al inicio
loadSong(currentSongIndex);