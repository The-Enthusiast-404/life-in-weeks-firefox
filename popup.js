// popup.js
document.addEventListener("DOMContentLoaded", function () {
  const birthdayInput = document.getElementById("birthday");
  const lifespanInput = document.getElementById("lifespan");
  const saveButton = document.getElementById("save");

  // Load saved data
  browser.storage.local.get(["birthday", "lifespan"], function (result) {
    if (result.birthday) birthdayInput.value = result.birthday;
    if (result.lifespan) lifespanInput.value = result.lifespan;
  });

  saveButton.addEventListener("click", function () {
    const birthday = birthdayInput.value;
    const lifespan = lifespanInput.value;

    browser.storage.local.set({ birthday, lifespan }, function () {
      console.log("Settings saved");
      alert("Settings saved. Open a new tab to see the changes.");
    });
  });
});
