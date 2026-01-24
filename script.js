let songs = [];

fetch("songs.json")
  .then(res => res.json())
  .then(data => songs = data);

// get selected radio value
function getSelected(name) {
  const options = document.getElementsByName(name);
  for (let opt of options) {
    if (opt.checked) return opt.value;
  }
  return null;
}

// normal mood based filter
function getSongs() {
  const mood = getSelected("mood");
  const genre = getSelected("genre");
  const language = getSelected("language");

  if (!mood || !genre || !language) {
    alert("Please select all options 🙂");
    return;
  }

  const filtered = songs.filter(song =>
    song.mood === mood &&
    song.genre === genre &&
    song.language === language
  );

  showList(filtered);
}

// 🎲 SURPRISE ME FEATURE
function surpriseMe() {
  const shuffled = [...songs].sort(() => 0.5 - Math.random());
  const random12 = shuffled.slice(0, 12);
  showList(random12);
}

// display result
function showList(listSongs) {
  const list = document.getElementById("result");
  list.innerHTML = "";

  if (listSongs.length === 0) {
    list.innerHTML = "<li>No songs found 😔</li>";
    return;
  }

  listSongs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${song.song} — ${song.artist}`;
    list.appendChild(li);
  });
}
