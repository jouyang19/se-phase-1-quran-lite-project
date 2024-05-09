function toggleChapters() {
  document.querySelector("#toggle-chapters").addEventListener("click", () => {
    const select = document.getElementById("quranChapters");
    if (select.style.display === "none" || select.style.display === "") {
      select.style.display = "block";
    } else {
      select.style.display = "none";
    }
  });
}

function getChapter(chapter) {
  const chapterSelect = document.getElementById("quranChapters");
  chapterSelect.addEventListener("change", (event) => {
    event.preventDefault();
    document.querySelector("#verses").textContent = "";
    const surah = chapterSelect.options[chapterSelect.selectedIndex].text;
    const chapterNumber = parseInt(surah.split(".")[0]);
    console.log("Chapter Number: ", chapterNumber);
    getVerses(chapterNumber);
  });
}

async function getVerses(chapter) {
  fetch(`http://localhost:3000/${chapter}`)
    .then((response) => response.json())
    .then((verses) => {
      console.log("verses: ", verses);
      appendVerses(verses);
    });
}

function appendVerses(verses) {
  const versesArr = verses;
  console.log("versesArr:", versesArr);
  versesArr.forEach((verse) => {
    const div = document.querySelector("#verses");
    const p = document.createElement("p");
    p.textContent = verse.text;
    div.append(p);
    handleHover();
  });
}

function handleHover() {
  const versesP = document.querySelectorAll("#verses p");

  versesP.forEach((p) => {
    p.addEventListener("mouseover", () => {
      p.className = "hovered";
    });
    p.addEventListener("mouseout", () => {
      p.className = "";
    });
  });
}

function main() {
  toggleChapters();
  getChapter();
}

main();
