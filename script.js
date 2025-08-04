document.addEventListener("DOMContentLoaded", () => {
  const statusBox = document.getElementById("main-status");
  statusBox.innerHTML = "Dashboard loaded successfully.";

  // Future logic for crypto evaluations could go here
});

function showInfo() {
  const disclaimer = document.getElementById("disclaimer");
  disclaimer.style.display = disclaimer.style.display === "none" ? "block" : "none";
}