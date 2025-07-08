const button = document.getElementById('checkBirthday');
    const resultDiv = document.getElementById('result');
    let countdownInterval;

    button.addEventListener('click', () => {
      const birthday = prompt("Enter your birthday (YYYY-MM-DD):");
      if (birthday) {
        startBirthdayCountdown(birthday);
      }
    });

    function startBirthdayCountdown(birthday) {
      clearInterval(countdownInterval); // Clear any existing countdown
      const birthDate = new Date(birthday);
      const today = new Date();

      // Set birthday to this year
      birthDate.setFullYear(today.getFullYear());

      // If birthday already passed this year, move to next year
      if (birthDate < today) {
        birthDate.setFullYear(today.getFullYear() + 1);
      }

      countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = birthDate - now;

        if (diff <= 0) {
          clearInterval(countdownInterval);
          resultDiv.innerHTML = "🎉 Happy Birthday! 🎉";
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);

          resultDiv.innerHTML = `🎉 Time left: <br>${days} day- ${hours} hour-${minutes} minute- ${seconds} second 🎉`;
        }
      }, 2000);
    }