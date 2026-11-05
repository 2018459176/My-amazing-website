document.addEventListener("DOMContentLoaded", () => {
    const weeks = [2, 3, 4, 5];
    let visited = new Set();
    try {
        const saved = JSON.parse(localStorage.getItem("vicky-journey") || "[]");
        if (Array.isArray(saved)) visited = new Set(saved.filter(w => weeks.includes(w)));
    } catch (_) { /* Navigation works without browser storage. */ }
    const week = Number(document.querySelector("[data-reflection-week]")?.dataset.reflectionWeek);
    if (weeks.includes(week)) {
        visited.add(week);
        try { localStorage.setItem("vicky-journey", JSON.stringify([...visited])); } catch (_) {}
    }
    document.querySelectorAll(".map-stop").forEach(stop => {
        const value = Number(stop.dataset.week);
        stop.classList.toggle("completed", visited.has(value));
        stop.classList.toggle("current", value === weeks.find(w => !visited.has(w)));
        stop.setAttribute("aria-label", `Explore Week ${value}`);
    });
    const progress = document.getElementById("journey-progress");
    if (progress) progress.textContent = visited.size === 4
        ? "Journey completed! ✦" : `${visited.size} / 4 discoveries explored ♡`;
    const filename = location.pathname.split("/").pop();
    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === filename) link.setAttribute("aria-current", "page");
    });
    // Preserve links to the former weekly sections on the homepage.
    if (document.getElementById("digital-practices") && /^#week[2-5]$/.test(location.hash)) {
        location.replace(`week${location.hash.slice(5)}.html`);
    }
});
