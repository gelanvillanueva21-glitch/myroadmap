import { roadmap, allTopics } from "./roadmap.js";
import { calculateProgress } from "./progress.js";
import {
    exportProgress,
    loadProgress,
    parseProgressFile,
    saveProgress
} from "./storage.js";
import { renderApp, showNotice } from "./ui.js";

const elements = {
    categoryNavigation: document.querySelector("#category-navigation"),
    overallPercentage: document.querySelector("#overall-percentage"),
    overallProgressBar: document.querySelector("#overall-progress-bar"),
    overallProgressTrack: document.querySelector("#overall-progress-track"),
    overallCount: document.querySelector("#overall-count"),
    remainingCount: document.querySelector("#remaining-count"),
    completedTopics: document.querySelector("#completed-topics"),
    totalTopicsCaption: document.querySelector("#total-topics-caption"),
    completedCategories: document.querySelector("#completed-categories"),
    totalCategoriesCaption: document.querySelector("#total-categories-caption"),
    breadcrumbCurrent: document.querySelector("#breadcrumb-current"),
    sectionTitle: document.querySelector("#section-title"),
    sectionEyebrow: document.querySelector("#section-eyebrow"),
    expandAllButton: document.querySelector("#expand-all-button"),
    roadmapContent: document.querySelector("#roadmap-content"),
    emptyState: document.querySelector("#empty-state"),
    resultsSummary: document.querySelector("#results-summary"),
    searchInput: document.querySelector("#search-input"),
    filterSelect: document.querySelector("#filter-select"),
    storageAlert: document.querySelector("#storage-alert"),
    toast: document.querySelector("#toast"),
    exportButton: document.querySelector("#export-button"),
    importButton: document.querySelector("#import-button"),
    importFile: document.querySelector("#import-file"),
    resetButton: document.querySelector("#reset-button"),
    menuToggle: document.querySelector("#menu-toggle"),
    sidebar: document.querySelector("#sidebar")
};

const knownTopicIds = new Set(allTopics.map((topic) => topic.id));
const initialProgress = loadProgress(knownTopicIds);
const state = {
    roadmap,
    completedTopics: initialProgress.data.completedTopics,
    activeCategoryId: null,
    expandedCategories: new Set(),
    searchTerm: "",
    filter: "all"
};
let toastTimeout;

if (initialProgress.warning) {
    showNotice(elements.storageAlert, initialProgress.warning);
}

const update = () => {
    const progress = calculateProgress(state.roadmap, state.completedTopics);
    renderApp(elements, state, progress, {
        onToggleCategory: (categoryId) => {
            if (state.expandedCategories.has(categoryId)) {
                state.expandedCategories.delete(categoryId);
            } else {
                state.expandedCategories.add(categoryId);
            }
            update();
        },
        onToggleTopic: toggleTopic
    });
};

const showToast = (message) => {
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
        elements.toast.hidden = true;
    }, 3500);
};

const persist = () => {
    try {
        saveProgress(state.completedTopics);
        elements.storageAlert.hidden = true;
        return true;
    } catch (error) {
        showNotice(elements.storageAlert, `Progress changed on this page but could not be saved to browser storage. ${error.message}`);
        return false;
    }
};

function toggleTopic(category, topic, isComplete) {
    const previousCategoryProgress = calculateProgress(state.roadmap, state.completedTopics)
        .categories.find((item) => item.id === category.id);
    if (isComplete) {
        state.completedTopics[topic.id] = true;
    } else {
        delete state.completedTopics[topic.id];
    }
    persist();
    update();

    const nextCategoryProgress = calculateProgress(state.roadmap, state.completedTopics)
        .categories.find((item) => item.id === category.id);
    if (!previousCategoryProgress.isComplete && nextCategoryProgress.isComplete) {
        showToast(`${category.title} complete. Great work!`);
    }
}

elements.categoryNavigation.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category-id]");
    if (!button) {
        return;
    }
    state.activeCategoryId = button.dataset.categoryId;
    state.searchTerm = "";
    state.filter = "all";
    state.expandedCategories.add(state.activeCategoryId);
    elements.searchInput.value = "";
    elements.filterSelect.value = "all";
    update();
});

elements.searchInput.addEventListener("input", () => {
    state.searchTerm = elements.searchInput.value;
    if (state.searchTerm.trim()) {
        state.roadmap.forEach((category) => state.expandedCategories.add(category.id));
    }
    update();
});

elements.filterSelect.addEventListener("change", () => {
    state.filter = elements.filterSelect.value;
    if (state.filter !== "all") {
        state.roadmap.forEach((category) => state.expandedCategories.add(category.id));
    }
    update();
});

elements.expandAllButton.addEventListener("click", () => {
    const visibleCategories = state.searchTerm.trim() || state.filter !== "all"
        ? state.roadmap
        : state.roadmap.filter((category) => !state.activeCategoryId || category.id === state.activeCategoryId);
    const allExpanded = visibleCategories.every((category) => state.expandedCategories.has(category.id));
    visibleCategories.forEach((category) => {
        if (allExpanded) {
            state.expandedCategories.delete(category.id);
        } else {
            state.expandedCategories.add(category.id);
        }
    });
    update();
});

elements.exportButton.addEventListener("click", () => {
    const backup = exportProgress(state.completedTopics);
    const blob = new Blob([`${JSON.stringify(backup, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "software-engineering-roadmap-progress.json";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("Progress backup exported.");
});

elements.importButton.addEventListener("click", () => elements.importFile.click());

elements.importFile.addEventListener("change", async () => {
    const [file] = elements.importFile.files ?? [];
    if (!file) {
        return;
    }
    try {
        const result = await parseProgressFile(file, knownTopicIds);
        if (!result.valid) {
            window.alert(`Import was not applied: ${result.reason}`);
            return;
        }
        if (!window.confirm("Import this backup and replace the progress currently saved in this browser?")) {
            return;
        }
        state.completedTopics = result.data.completedTopics;
        const saved = persist();
        update();
        if (saved) {
            showToast("Progress backup imported.");
        }
    } catch (error) {
        window.alert(`The backup could not be read: ${error.message}`);
    } finally {
        elements.importFile.value = "";
    }
});

elements.resetButton.addEventListener("click", () => {
    if (!window.confirm("Reset all completed topics? This cannot be undone unless you have an exported backup.")) {
        return;
    }
    state.completedTopics = {};
    const saved = persist();
    update();
    if (saved) {
        showToast("Progress has been reset.");
    }
});

elements.menuToggle.addEventListener("click", () => {
    const isOpen = elements.sidebar.classList.toggle("is-open");
    elements.menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
    if (!elements.sidebar.classList.contains("is-open")) {
        return;
    }
    const clickedNavigation = event.composedPath().includes(elements.categoryNavigation);
    if (clickedNavigation || event.target.closest("#menu-toggle")) {
        return;
    }
    elements.sidebar.classList.remove("is-open");
    elements.menuToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !event.ctrlKey && !event.metaKey && !event.altKey && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        elements.searchInput.focus();
    }
    if (event.key === "Escape") {
        elements.sidebar.classList.remove("is-open");
        elements.menuToggle.setAttribute("aria-expanded", "false");
    }
});

update();
