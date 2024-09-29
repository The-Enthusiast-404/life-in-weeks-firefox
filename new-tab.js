function createWeeksVisualization(birthday, lifespan) {
  const weeksContainer = document.getElementById("weeks-container");
  weeksContainer.innerHTML = "";

  const today = new Date();
  const birthDate = new Date(birthday);
  const totalWeeks = lifespan * 52;
  const livedWeeks = Math.floor(
    (today - birthDate) / (7 * 24 * 60 * 60 * 1000),
  );

  for (let i = 0; i < totalWeeks; i++) {
    const weekDot = document.createElement("div");
    weekDot.className = "week";
    if (i < livedWeeks) {
      weekDot.classList.add("lived");
    }
    weeksContainer.appendChild(weekDot);
  }
}

function updateWeeks() {
  browser.storage.local.get(["birthday", "lifespan"], function (result) {
    const birthdayInput = document.getElementById("birthday");
    const lifespanInput = document.getElementById("lifespan");

    if (result.birthday) {
      birthdayInput.value = result.birthday;
    }
    if (result.lifespan) {
      lifespanInput.value = result.lifespan;
    }

    if (result.birthday && result.lifespan) {
      createWeeksVisualization(result.birthday, result.lifespan);
    } else {
      document.getElementById("weeks-container").innerHTML =
        "<p>Please set your birthday and expected lifespan.</p>";
    }
  });
}

function saveSettings() {
  const birthday = document.getElementById("birthday").value;
  const lifespan = document.getElementById("lifespan").value;

  browser.storage.local.set({ birthday, lifespan }, function () {
    console.log("Settings saved");
    updateWeeks();
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  browser.storage.local.set({ darkTheme: isDark });
}

document.addEventListener("DOMContentLoaded", function () {
  updateWeeks();

  document.getElementById("save").addEventListener("click", saveSettings);

  const themeCheckbox = document.getElementById("theme-checkbox");
  themeCheckbox.addEventListener("change", toggleTheme);

  browser.storage.local.get("darkTheme", function (result) {
    if (result.darkTheme) {
      document.body.classList.add("dark");
      themeCheckbox.checked = true;
    }
  });
});
