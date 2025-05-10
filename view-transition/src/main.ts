import "./style.css";

const content = document.querySelector<HTMLDivElement>("#content")!;
const triggers = document.querySelectorAll<HTMLButtonElement>(
  ".transition-trigger"
);

const handleNavigation = async (event: Event) => {
  const target = event.currentTarget as HTMLButtonElement;
  const index = target.value;

  if (!index) return;

  // Start the transition
  document.startViewTransition(() => {
    // Update the content
    content.innerHTML = `<h2>${target.value}</h2>`;
  });
};

// Add event listeners to all triggers
triggers.forEach((trigger) => {
  trigger.addEventListener("click", handleNavigation);
});
