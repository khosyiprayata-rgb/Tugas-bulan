/* ====== MINI VOTING APP - SCRIPT ====== */

// 1. VARIABLE untuk menyimpan jumlah vote tiap kandidat
let gameVotes = 0;
let storeVotes = 0;
let todoVotes = 0;
let quizVotes = 0;

// 2. Ambil elemen tombol vote (querySelector)
const gameBtn = document.querySelector("#btn-game");
const storeBtn = document.querySelector("#btn-store");
const todoBtn = document.querySelector("#btn-todo");
const quizBtn = document.querySelector("#btn-quiz");

// 3. Ambil elemen teks jumlah vote
const gameText = document.querySelector("#votes-game");
const storeText = document.querySelector("#votes-store");
const todoText = document.querySelector("#votes-todo");
const quizText = document.querySelector("#votes-quiz");

// 4. Elemen persentase & progress bar
const gamePct = document.querySelector("#pct-game");
const storePct = document.querySelector("#pct-store");
const todoPct = document.querySelector("#pct-todo");
const quizPct = document.querySelector("#pct-quiz");

const gameBar = document.querySelector("#bar-game");
const storeBar = document.querySelector("#bar-store");
const todoBar = document.querySelector("#bar-todo");
const quizBar = document.querySelector("#bar-quiz");

// 5. Elemen lain
const totalText = document.querySelector("#totalVotes");
const feedback = document.querySelector("#feedback");
const leaderName = document.querySelector("#leaderName");
const leaderInfo = document.querySelector("#leaderInfo");
const resetBtn = document.querySelector("#resetBtn");
const fsBtn = document.querySelector("#fsBtn");

// ====== FUNCTION: hitung persen ======
function hitungPersen(votes, total) {
  if (total === 0) {
    return 0;
  }
  return Math.round((votes / total) * 100);
}

// ====== FUNCTION: update seluruh tampilan (DOM) ======
function updateTampilan() {
  // total vote = penjumlahan semua kandidat
  const total = gameVotes + storeVotes + todoVotes + quizVotes;

  // update angka vote
  gameText.textContent = gameVotes;
  storeText.textContent = storeVotes;
  todoText.textContent = todoVotes;
  quizText.textContent = quizVotes;

  // update total
  totalText.textContent = total;

  // hitung persentase
  const pGame = hitungPersen(gameVotes, total);
  const pStore = hitungPersen(storeVotes, total);
  const pTodo = hitungPersen(todoVotes, total);
  const pQuiz = hitungPersen(quizVotes, total);

  gamePct.textContent = pGame + "%";
  storePct.textContent = pStore + "%";
  todoPct.textContent = pTodo + "%";
  quizPct.textContent = pQuiz + "%";

  // update progress bar
  gameBar.style.width = pGame + "%";
  storeBar.style.width = pStore + "%";
  todoBar.style.width = pTodo + "%";
  quizBar.style.width = pQuiz + "%";

  // update current leader
  updateLeader(total);
}

// ====== FUNCTION: cari kandidat unggul ======
function updateLeader(total) {
  if (total === 0) {
    leaderName.textContent = "Belum ada vote";
    leaderInfo.textContent = "Klik salah satu tombol vote untuk memulai polling.";
    return;
  }

  let namaTeratas = "🎮 Mini Game";
  let voteTeratas = gameVotes;

  if (storeVotes > voteTeratas) {
    namaTeratas = "🛒 Mini Store";
    voteTeratas = storeVotes;
  }
  if (todoVotes > voteTeratas) {
    namaTeratas = "📝 To-Do App";
    voteTeratas = todoVotes;
  }
  if (quizVotes > voteTeratas) {
    namaTeratas = "🧠 Quiz App";
    voteTeratas = quizVotes;
  }

  leaderName.textContent = namaTeratas;
  leaderInfo.textContent =
    voteTeratas + " vote — sementara berada di posisi pertama 🔥";
}

// ====== FUNCTION: tampilkan feedback ======
function tampilkanFeedback(pesan) {
  feedback.textContent = pesan;
  feedback.classList.remove("pop");
  void feedback.offsetWidth; // trik supaya animasi bisa diulang
  feedback.classList.add("pop");
}

// ====== CLICK EVENT tiap kandidat ======
gameBtn.addEventListener("click", function () {
  gameVotes++;
  updateTampilan();
  tampilkanFeedback("✅ Vote berhasil! Kamu memilih 🎮 Mini Game");
});

storeBtn.addEventListener("click", function () {
  storeVotes++;
  updateTampilan();
  tampilkanFeedback("✅ Vote berhasil! Kamu memilih 🛒 Mini Store");
});

todoBtn.addEventListener("click", function () {
  todoVotes++;
  updateTampilan();
  tampilkanFeedback("✅ Vote berhasil! Kamu memilih 📝 To-Do App");
});

quizBtn.addEventListener("click", function () {
  quizVotes++;
  updateTampilan();
  tampilkanFeedback("✅ Vote berhasil! Kamu memilih 🧠 Quiz App");
});

// ====== BONUS: RESET VOTING ======
resetBtn.addEventListener("click", function () {
  gameVotes = 0;
  storeVotes = 0;
  todoVotes = 0;
  quizVotes = 0;
  updateTampilan();
  tampilkanFeedback("🔄 Voting sudah direset. Semua vote kembali 0.");
});

// ====== BONUS: FULLSCREEN ======
fsBtn.addEventListener("click", function () {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
    fsBtn.textContent = "✕ Keluar Fullscreen";
  } else {
    document.exitFullscreen();
    fsBtn.textContent = "⛶ Fullscreen";
  }
});

// ====== Tampilan awal ======
updateTampilan();
