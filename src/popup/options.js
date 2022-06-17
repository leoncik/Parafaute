// Display anglicism level if anglicism is active
const anglicismFilter = document.querySelector('#anglicismes');
anglicismFilter.addEventListener("input", () => {
      document.querySelector('.anglicism-options').classList.toggle('options-activated');
})

// Manage anglicism level
const anglicismLevelInput = document.querySelector('#anglicism-level');
const anglicismLevelOutput = document.querySelector('.anglicism-level-output');

anglicismLevelOutput.textContent = anglicismLevelInput.value;

anglicismLevelInput.addEventListener("input", () => {
    anglicismLevelOutput.textContent = anglicismLevelInput.value;
})