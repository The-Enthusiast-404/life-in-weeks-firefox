// content.js
function createWeeksOverlay(birthday, lifespan) {
  const overlay = document.createElement("div");
  overlay.id = "life-weeks-overlay";

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
    overlay.appendChild(weekDot);
  }

  return overlay;
}

function updateWeeks() {
  browser.storage.local.get(["birthday", "lifespan"], function (result) {
    if (result.birthday && result.lifespan) {
      let overlay = document.getElementById("life-weeks-overlay");
      if (overlay) {
        overlay.remove();
      }
      overlay = createWeeksOverlay(result.birthday, result.lifespan);
      document.body.appendChild(overlay);
    }
  });
}

browser.runtime.onMessage.addListener((message) => {
  if (message.action === "updateWeeks") {
    updateWeeks();
  }
});

updateWeeks();
