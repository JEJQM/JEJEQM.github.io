// Scroll Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

// Terminal Typing Effect
const terminalLines = [
    "> Scanning network...",
    "> Bypassing firewall...",
    "> Connection established.",
    "> Ready for commands."
];

const terminalBody = document.querySelector(".terminal-body");
let lineIndex = 0;

function typeTerminalLines() {
    if (lineIndex < terminalLines.length) {
        const line = document.createElement("p");
        line.classList.add("typewriter");
        line.textContent = terminalLines[lineIndex];
        terminalBody.appendChild(line);
        lineIndex++;
        setTimeout(typeTerminalLines, 2000);
    }
}

setTimeout(typeTerminalLines, 1500);

// Hover Effects for Cards
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.borderColor = "#0f0";
    });
    card.addEventListener("mouseleave", () => {
        card.style.borderColor = "#333";
    });
});
