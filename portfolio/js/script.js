const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    // toggle class 'hidden' untuk menampilkan/menyembunyikan menu mobile
    mobileMenu.classList.toggle("hidden");
  });
}

const gradeForm = document.getElementById("grade-form");

if (gradeForm) {
  // Ambil semua elemen yang dibutuhkan
  const tugasInput = document.getElementById("tugas");
  const utsInput = document.getElementById("uts");
  const uasInput = document.getElementById("uas");

  const errorMessage = document.getElementById("error-message");
  const resultBox = document.getElementById("result-box");
  const finalScoreOutput = document.getElementById("final-score");
  const gradeOutput = document.getElementById("grade-output");

  const resetButton = document.getElementById("reset-button");

  // Bobot penilaian sesuai ketentuan tugas
  const BOBOT_TUGAS = 0.3;
  const BOBOT_UTS = 0.3;
  const BOBOT_UAS = 0.4;

  // Fungsi untuk menentukan grade berdasarkan nilai akhir
  function tentukanGrade(nilaiAkhir) {
    if (nilaiAkhir >= 80) {
      return "A";
    } else if (nilaiAkhir >= 75) {
      return "B+";
    } else if (nilaiAkhir >= 70) {
      return "B";
    } else if (nilaiAkhir >= 65) {
      return "C+";
    } else if (nilaiAkhir >= 60) {
      return "C";
    } else {
      return "D";
    }
  }

  // Fungsi untuk memvalidasi satu input nilai
  // Mengembalikan true jika valid, false jika tidak valid
  function isValidScore(value) {
    // cek apakah kosong
    if (value.trim() === "") {
      return false;
    }

    // cek apakah berupa angka
    const number = Number(value);
    if (isNaN(number)) {
      return false;
    }

    // cek rentang nilai 0 - 100
    if (number < 0 || number > 100) {
      return false;
    }

    return true;
  }

  // Fungsi untuk menampilkan pesan error
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
    resultBox.classList.add("hidden");
  }

  // Fungsi untuk menyembunyikan pesan error
  function hideError() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  }

  // Event listener untuk submit form (tombol Calculate Grade)
  gradeForm.addEventListener("submit", (event) => {
    event.preventDefault(); // mencegah reload halaman

    const tugasValue = tugasInput.value;
    const utsValue = utsInput.value;
    const uasValue = uasInput.value;

    // Validasi ketiga input
    if (
      !isValidScore(tugasValue) ||
      !isValidScore(utsValue) ||
      !isValidScore(uasValue)
    ) {
      showError(
        "Nilai tidak valid. Pastikan Tugas, UTS, dan UAS diisi dengan angka antara 0 sampai 100."
      );
      return;
    }

    hideError();

    // Ubah nilai input (string) menjadi angka
    const tugas = Number(tugasValue);
    const uts = Number(utsValue);
    const uas = Number(uasValue);

    // Hitung nilai akhir sesuai rumus
    const nilaiAkhir = tugas * BOBOT_TUGAS + uts * BOBOT_UTS + uas * BOBOT_UAS;

    // Bulatkan ke 2 angka desimal supaya rapi
    const nilaiAkhirRounded = Math.round(nilaiAkhir * 100) / 100;

    // Tentukan grade
    const grade = tentukanGrade(nilaiAkhirRounded);

    // Tampilkan hasil ke halaman
    finalScoreOutput.textContent = nilaiAkhirRounded.toFixed(2);
    gradeOutput.textContent = grade;
    resultBox.classList.remove("hidden");
  });

  // Event listener untuk tombol Reset
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      gradeForm.reset();
      hideError();
      resultBox.classList.add("hidden");
      finalScoreOutput.textContent = "";
      gradeOutput.textContent = "";
    });
  }
}

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const contactFeedback = document.getElementById("contact-feedback");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // mencegah form benar-benar mengirim data

    // Simulasi: tampilkan pesan sukses ke pengguna
    contactFeedback.textContent = "Message form submitted successfully.";
    contactFeedback.classList.remove("hidden");

    // Kosongkan form setelah "dikirim"
    contactForm.reset();
  });
}
