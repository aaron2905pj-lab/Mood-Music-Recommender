let selectedMood = "";
let selectedGenre = "";
let selectedLanguage = "";
let songs = [];

fetch("songs.json")
  .then(res => res.json())
  .then(data => songs = data);

function handleSelection(className, setter) {
  const buttons = document.querySelectorAll(`.${className}`);
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      setter(btn.dataset.value);
    });
  });
}

handleSelection("mood", value => selectedMood = value);
handleSelection("genre", value => selectedGenre = value);
handleSelection("language", value => selectedLanguage = value);

document.querySelector(".recommend").addEventListener("click", () => {
  const list = document.getElementById("songList");
  list.innerHTML = "";

  if (!selectedMood || !selectedGenre || !selectedLanguage) {
    list.innerHTML = "<li>Please select mood, genre and language 💗</li>";
    return;
  }

  const filtered = songs.filter(song =>
    song.mood === selectedMood &&
    song.genre === selectedGenre &&
    song.language === selectedLanguage
  );

  if (filtered.length === 0) {
    list.innerHTML = "<li>No songs found 😔</li>";
    return;
  }

  filtered.forEach(song => {
    const li = document.createElement("li");
    li.textContent = `🎵 ${song.title} - ${song.artist}`;
    list.appendChild(li);
  });
});
