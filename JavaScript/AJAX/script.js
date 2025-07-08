 document.getElementById('checkBirthday').addEventListener('click', () => {
      const birthday = prompt("Enter your birthday (YYYY-MM-DD):");
      if (birthday) {
        const daysLeft = calculateDaysToBirthday(birthday);
        document.getElementById('result').innerText =
          `🎉 Your birthday is in ${daysLeft} day(s)! 🎉`;
      }
    });

    function calculateDaysToBirthday(birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);

      // Set to this year
      birthDate.setFullYear(today.getFullYear());

      // If already passed, move to next year
      if (birthDate < today) {
        birthDate.setFullYear(today.getFullYear() + 1);
      }

      const diffTime = birthDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }