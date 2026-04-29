document.addEventListener("DOMContentLoaded", () => {
  // Select all necessary elements
  const chips = document.querySelectorAll(".chip");
  const projects = document.querySelectorAll(".project-card");
  const modal = document.getElementById("genreModal");
  const modalContent = document.getElementById("modalContent");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const closeBtn = document.getElementById("closeModal");

  // Database of genre descriptions for the Pop-up
  const genreData = {
    strategy:
      "Command your armies and outsmart your foes. This category features turn-based tactics, resource management, and high-level planning simulations.",
    fantasy:
      "Magic, dragons, and epic quests. Dive into immersive worlds where imagination knows no bounds and every hero has a story.",
    horror:
      "Survive the night. Atmospheric lighting, psychological thrills, and heart-pounding tension await in these terrifying experiences.",
    sports:
      "From the pitch to the court. High-performance simulations focused on realistic physics, competition, and precision timing.",
    adventure:
      "Explore vast landscapes and solve intricate puzzles. These story-driven concepts focus on exploration and discovery.",
    shooter:
      "Fast-paced action and precision. Military missions, futuristic combat systems, and intense first-person perspectives.",
    all: "Viewing the complete catalog of Adam Azam's game development concepts and UI designs.",
  };

  /**
   * Handle Filter Click
   */
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const genre = chip.getAttribute("data-genre");

      // 1. UI: Update Active Button Styling
      chips.forEach((c) => {
        c.classList.remove("active", "bg-blue-600", "text-white");
        c.classList.add("border-gray-700");
      });
      chip.classList.add("active", "bg-blue-600", "text-white");
      chip.classList.remove("border-gray-700");

      // 2. Logic: Filter the Projects
      projects.forEach((project) => {
        const category = project.getAttribute("data-category");

        if (genre === "all" || genre === category) {
          project.style.display = "block";
          // Reset opacity for the fade-in effect
          project.style.opacity = "0";
          setTimeout(() => {
            project.style.opacity = "1";
          }, 10);
        } else {
          project.style.opacity = "0";
          project.style.display = "none";
        }
      });

      // 3. UI: Trigger the Pop-up (Modal)
      modalTitle.innerText = genre.toUpperCase();
      modalDesc.innerText =
        genreData[genre] || "Details for this category are being updated.";

      // Show the modal container
      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // Trigger the 'pop' animation after a tiny delay
      setTimeout(() => {
        modalContent.classList.add("scale-100", "opacity-100");
        modalContent.classList.remove("scale-95", "opacity-0");
      }, 10);
    });
  });

  /**
   * Close Modal Logic
   */
  const closeModal = () => {
    // Reverse the animation
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");

    // Wait for animation to finish before hiding container
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }, 200);
  };

  // Event Listeners for Closing
  closeBtn.addEventListener("click", closeModal);

  // Close when clicking outside the box (on the dark backdrop)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on 'Escape' key for accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
});
