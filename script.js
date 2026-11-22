/*
  PERSONALISASI WEBSITE:
  1. Ganti nama, tanggal, nama pengirim, isi surat di CONFIG.
  2. Taruh foto di folder assets/ lalu sesuaikan file pada moments.
  3. Taruh file MP3 di assets/ lalu sesuaikan file pada playlist.
*/
const CONFIG = {
  partnerName: "Sayang",
  senderName: "someone who loves you",
  birthdayDate: "YOUR SPECIAL DAY",
  letter: `Semoga di usiamu yang baru ini, Allah selalu memberikan kesehatan, kebahagiaan, dan keberkahan dalam setiap langkahmu. Terima kasih sudah hadir dan menjadi bagian indah dalam hidupku.

Meski jarak masih memisahkan kita, semoga tahun depan Allah mudahkan langkah kita menuju hari akad. Semoga semua doa dan harapan kita segera menjadi kenyataan.

Tetaplah jadi seseorang yang selalu ingin aku pilih, hari ini, esok, dan selamanya.

I'll always be cheering for you. ♡`,
  journey: [
    { date: "THE BEGINNING", title: "When our story began", text: "Tidak pernah menyangka sebuah pertemuan bisa membawa kita sampai sejauh ini. Dari awal saling mengenal, berbagi cerita, hingga akhirnya menemukan alasan untuk terus bersama. Ternyata, kamu adalah salah satu hal baik yang hadir dalam hidupku." },
    { date: "A LITTLE CLOSER", title: "The moment I knew", text: "Semakin hari, semakin banyak hal yang membuatku yakin bahwa kamu adalah seseorang yang ingin aku ajak melangkah lebih jauh. Bukan sekadar tentang hari ini, tetapi tentang masa depan yang ingin kita bangun bersama." },
    { date: "MY FAVORITE DAYS", title: "A thousand little memories", text: "Ada banyak cerita sederhana yang selalu ingin aku ingat. Obrolan, tawa, perhatian, dan momen-momen kecil yang membuat hubungan ini semakin berarti. Walaupun jarak terkadang membuat kita tidak bisa selalu bersama, kita tetap berusaha saling menjaga dan menguatkan." },
    { date: "OUR NEXT CHAPTER", title: "Still choosing you", text: "Alhamdulillah, kita sudah sampai di tahap yang dulu mungkin hanya menjadi harapan. Bertemu orang tua, saling mengenalkan keluarga, dan mendapatkan restu untuk melangkah ke tahap berikutnya. Sekarang, semoga segala persiapan menuju hari akad tahun depan diberikan kelancaran. Semoga dimudahkan setiap urusannya, dilapangkan rezekinya, dan disatukan dalam ikatan yang diridai Allah. Aku tidak tahu persis bagaimana perjalanan kita ke depan, tetapi aku berharap orang yang akan terus aku temui di setiap bab kehidupan adalah kamu. Bismillah, semoga tahun depan bukan lagi tentang menunggu waktu untuk bertemu, melainkan tentang memulai kehidupan bersama." }
  ],
  moments: [
    { file: "assets/1.jpg", caption: "one of my favorite days ♡" },
    { file: "assets/2.png", caption: "you make me smile" },
    { file: "assets/3.jpg", caption: "a memory to keep" },
    { file: "assets/4.jpg", caption: "more moments with you" },
    { file: "assets/5.jpg", caption: "my favorite person" },
    { file: "assets/6.jpg", caption: "and many more to come ♡" }
  ],
  playlist: [
    { title: "Justin Bieber - Favorite Girl", artist: "Artist name", file: "assets/Justin Bieber - Favorite Girl (Lyrics).mp3" },
    { title: "Daniel Ceaser - Best Part", artist: "Artist name", file: "assets/Daniel Ceaser - Best Part (Lyrics) Feat. H.E.R.mp3" },
    { title: "Baila - Dari Surga", artist: "Artist name", file: "assets/Baila - Dari Surga (Official Lyric Video).mp3" }
  ]
};

const $ = (id) => document.getElementById(id);
$("partnerNameHero").textContent = CONFIG.partnerName;
$("partnerNameLetter").textContent = CONFIG.partnerName;
$("senderName").textContent = CONFIG.senderName;
$("birthdayDate").textContent = CONFIG.birthdayDate;
$("letterText").textContent = CONFIG.letter;

const screens = ["welcome", "home", "journey", "moment", "playlist", "gift"];
function showScreen(id) {
  screens.forEach(screen => $(screen).classList.toggle("hidden", screen !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
$("startBtn").addEventListener("click", () => showScreen("home"));
document.querySelectorAll("[data-page]").forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.page));
});
document.querySelectorAll("[data-back]").forEach(btn => btn.addEventListener("click", () => showScreen("home")));

$("timeline").innerHTML = CONFIG.journey.map(item => `
  <article class="timeline-item">
    <div class="timeline-date">${item.date}</div><h3>${item.title}</h3><p>${item.text}</p>
  </article>`).join("");

$("photoGrid").innerHTML = CONFIG.moments.map((item, i) => `
  <button class="photo-item" style="--tilt:${i % 2 ? "2deg" : "-2deg"}" data-photo="${i}">
    <img src="${item.file}" alt="${item.caption}" loading="lazy" onerror="this.style.background='linear-gradient(135deg,#ffe1e9,#fff0e5)';this.style.border='1px dashed #e8a0b4'">
    <span>${item.caption}</span>
  </button>`).join("");

const modal = $("photoModal");
document.querySelectorAll("[data-photo]").forEach(btn => btn.addEventListener("click", () => {
  const item = CONFIG.moments[Number(btn.dataset.photo)];
  $("modalImage").src = item.file;
  $("modalCaption").textContent = item.caption;
  modal.classList.remove("hidden");
}));
function closeModal(){ modal.classList.add("hidden"); $("modalImage").src = ""; }
$("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

let currentTrack = 0;
const audio = $("audioPlayer");
function loadTrack(index, autoplay=false) {
  currentTrack = (index + CONFIG.playlist.length) % CONFIG.playlist.length;
  const track = CONFIG.playlist[currentTrack];
  $("trackTitle").textContent = track.title;
  $("trackArtist").textContent = track.artist;
  audio.src = track.file;
  document.querySelectorAll(".track-row").forEach((row, i) => row.classList.toggle("active", i === currentTrack));
  if(autoplay) audio.play().then(() => $("playTrack").textContent = "Ⅱ").catch(() => $("playTrack").textContent = "▶");
  else $("playTrack").textContent = "▶";
}
$("trackList").innerHTML = CONFIG.playlist.map((track, i) => `
  <button class="track-row" data-track="${i}"><span>${String(i+1).padStart(2,"0")} &nbsp; ${track.title}</span><span>♡</span></button>`).join("");
document.querySelectorAll("[data-track]").forEach(btn => btn.addEventListener("click", () => loadTrack(Number(btn.dataset.track), true)));
$("playTrack").addEventListener("click", () => {
  if(!audio.src) loadTrack(0);
  if(audio.paused) audio.play().then(() => $("playTrack").textContent = "Ⅱ").catch(() => alert("Tambahkan file MP3 ke folder assets terlebih dahulu."));
  else { audio.pause(); $("playTrack").textContent = "▶"; }
});
$("prevTrack").addEventListener("click", () => loadTrack(currentTrack - 1, true));
$("nextTrack").addEventListener("click", () => loadTrack(currentTrack + 1, true));
audio.addEventListener("ended", () => loadTrack(currentTrack + 1, true));
loadTrack(0);

$("giftBox").addEventListener("click", () => {
  $("giftBox").classList.add("open");
  $("giftStage").classList.add("hidden");
  $("letter").classList.remove("hidden");
});
