const loginPage = document.getElementById('login-page');
const moodPage = document.getElementById('mood-page');
const resultPage = document.getElementById('result-page');
const historyPage = document.getElementById('history-page');

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const error = document.getElementById('login-error');

  if (user === 'yash' && pass === '1234') {
    loginPage.classList.add('hidden');
    moodPage.classList.remove('hidden');
  } else {
    error.textContent = "Invalid login!";
  }
}

function selectMood(mood) {
  const recipes = {
    happy: "Fruit Salad",
    sad: "Chocolate Cake",
    tired: "Energy Smoothie",
    stressed: "Green Tea"
  };

  const suggestion = recipes[mood] || "Pasta";

  document.getElementById('mood-text').textContent = `You are feeling ${mood}`;
  document.getElementById('suggestion-text').textContent = `Suggested Recipe: ${suggestion}`;

  saveToHistory(mood, suggestion);

  moodPage.classList.add('hidden');
  resultPage.classList.remove('hidden');
}

function goToMoodPage() {
  historyPage.classList.add('hidden');
  resultPage.classList.add('hidden');
  moodPage.classList.remove('hidden');
}

function saveToHistory(mood, suggestion) {
  const history = JSON.parse(localStorage.getItem('moodHistory')) || [];
  history.push({
    mood,
    suggestion,
    time: new Date().toLocaleString()
  });
  localStorage.setItem('moodHistory', JSON.stringify(history));
}

function showHistory() {
  const list = document.getElementById('history-list');
  list.innerHTML = '';
  const history = JSON.parse(localStorage.getItem('moodHistory')) || [];

  history.forEach(entry => {
    const item = document.createElement('li');
    item.textContent = `${entry.time} - Mood: ${entry.mood}, Recipe: ${entry.suggestion}`;
    list.appendChild(item);
  });

  resultPage.classList.add('hidden');
  historyPage.classList.remove('hidden');
}
