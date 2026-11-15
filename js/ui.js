import { PATHWAY_OPTIONS } from "./roadmap.js";

const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
};

const makeProgressTrack = (percentage, label) => {
    const track = createElement("div", "progress-track");
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", label);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", String(percentage));
    const fill = createElement("span");
    fill.style.width = `${percentage}%`;
    track.append(fill);
    return track;
};

const priorityLabel = (priority) => priority.charAt(0).toUpperCase() + priority.slice(1);

const renderNavigation = (container, roadmap, progress, activeCategoryId) => {
    const progressById = new Map(progress.categories.map((category) => [category.id, category]));
    container.replaceChildren();
    roadmap.forEach((category, index) => {
        const categoryProgress = progressById.get(category.id);
        const button = createElement("button", "nav-category");
        button.type = "button";
        button.dataset.categoryId = category.id;
        button.setAttribute("aria-current", category.id === activeCategoryId ? "page" : "false");
        button.append(
            createElement("span", "nav-index", String(index + 1).padStart(2, "0")),
            createElement("span", "nav-title", category.title),
            createElement("span", "nav-progress", `${categoryProgress.percentage}%`)
        );
        container.append(button);
    });
};

const renderDashboard = (elements, progress) => {
    elements.overallPercentage.textContent = `${progress.percentage}%`;
    elements.overallProgressBar.style.width = `${progress.percentage}%`;
    elements.overallProgressTrack.setAttribute("aria-valuenow", String(progress.percentage));
    elements.overallCount.textContent = `${progress.completed} / ${progress.total} topics completed`;
    elements.remainingCount.textContent = `${progress.remaining} remaining`;
    elements.completedTopics.textContent = String(progress.completed);
    elements.totalTopicsCaption.textContent = `of ${progress.total} topics`;
    elements.completedCategories.textContent = String(progress.completedCategories);
    elements.totalCategoriesCaption.textContent = `of ${progress.totalCategories} categories`;
};

const copySelections = (selections) => ({
    frontend: {
        languages: [...selections.frontend.languages],
        frameworks: Object.fromEntries(Object.entries(selections.frontend.frameworks).map(([id, values]) => [id, [...values]]))
    },
    backend: {
        languages: [...selections.backend.languages],
        frameworks: Object.fromEntries(Object.entries(selections.backend.frameworks).map(([id, values]) => [id, [...values]]))
    }
});

const renderPathwaySelector = (container, track, state, onSelectionChange) => {
    const options = PATHWAY_OPTIONS[track];
    const selection = state.selections[track];
    container.replaceChildren();

    const heading = createElement("div", "pathway-heading");
    heading.append(
        createElement("div", "eyebrow", "CUSTOMIZE YOUR ROADMAP"),
        createElement("h3", "", `Choose ${track === "backend" ? "languages" : "frontend languages"} and frameworks`)
    );
    const helperText = createElement("p", "pathway-helper", track === "backend"
        ? "Select one or more languages. Each selected language reveals its fundamentals and available frameworks."
        : "HTML and CSS stay in your core path. Select JavaScript or TypeScript, then choose the frameworks you want to learn.");
    container.append(heading, helperText);

    const languageGrid = createElement("div", "pathway-language-grid");
    options.languages.forEach((language) => {
        const selected = selection.languages.includes(language.id);
        const label = createElement("label", `pathway-option${selected ? " is-selected" : ""}`);
        const checkbox = createElement("input", "pathway-checkbox");
        checkbox.type = "checkbox";
        checkbox.checked = selected;
        checkbox.setAttribute("aria-label", `Learn ${language.title}`);
        checkbox.addEventListener("change", () => {
            const next = copySelections(state.selections);
            if (checkbox.checked) {
                next[track].languages.push(language.id);
                next[track].frameworks[language.id] ??= [];
            } else {
                next[track].languages = next[track].languages.filter((id) => id !== language.id);
                delete next[track].frameworks[language.id];
            }
            onSelectionChange(track, next);
        });
        const copy = createElement("span", "pathway-option-copy");
        copy.append(
            createElement("strong", "", language.title),
            createElement("span", "", language.description)
        );
        label.append(checkbox, copy);
        languageGrid.append(label);
    });
    container.append(languageGrid);

    const selectedLanguages = options.languages.filter((language) => selection.languages.includes(language.id));
    if (!selectedLanguages.length) {
        container.append(createElement("p", "pathway-empty", "Choose at least one language to add its learning path."));
        return;
    }

    selectedLanguages.forEach((language) => {
        const frameworkOptions = track === "frontend"
            ? options.frameworks
            : options.frameworks[language.id] ?? [];
        const section = createElement("section", "framework-section");
        const sectionHeading = createElement("div", "framework-heading");
        sectionHeading.append(
            createElement("h4", "", `${language.title} frameworks`),
            createElement("span", "", "Optional")
        );
        section.append(sectionHeading);

        const frameworkGrid = createElement("div", "framework-grid");
        frameworkOptions.forEach((framework) => {
            const chosen = (selection.frameworks[language.id] ?? []).includes(framework.id);
            const missingRequirements = (framework.requires ?? []).filter(
                (requiredId) => !(selection.frameworks[language.id] ?? []).includes(requiredId)
            );
            const label = createElement("label", `framework-option${chosen ? " is-selected" : ""}${missingRequirements.length ? " is-disabled" : ""}`);
            const checkbox = createElement("input", "pathway-checkbox");
            checkbox.type = "checkbox";
            checkbox.checked = chosen;
            checkbox.disabled = missingRequirements.length > 0;
            checkbox.setAttribute("aria-label", `Learn ${framework.title} with ${language.title}`);
            const copy = createElement("span", "pathway-option-copy");
            copy.append(
                createElement("strong", "", framework.title),
                createElement("span", "", missingRequirements.length
                    ? `Select ${missingRequirements.map((id) => options.frameworks.find((item) => item.id === id)?.title ?? id).join(", ")} first.`
                    : framework.description)
            );
            if (framework.url) {
                const link = createElement("a", "pathway-docs", "Official docs ↗");
                link.href = framework.url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.addEventListener("click", (event) => event.stopPropagation());
                copy.append(link);
            }
            checkbox.addEventListener("change", () => {
                const next = copySelections(state.selections);
                const current = next[track].frameworks[language.id] ?? [];
                next[track].frameworks[language.id] = checkbox.checked
                    ? [...current, framework.id]
                    : current.filter((id) => id !== framework.id);
                onSelectionChange(track, next);
            });
            label.append(checkbox, copy);
            frameworkGrid.append(label);
        });
        section.append(frameworkGrid);
        container.append(section);
    });
};

const topicMatches = (topic, filter, completedTopics, searchTerm) => {
    if (filter === "completed" && completedTopics[topic.id] !== true) {
        return false;
    }
    if (filter === "incomplete" && completedTopics[topic.id] === true) {
        return false;
    }
    if (["essential", "important", "advanced"].includes(filter) && topic.priority !== filter) {
        return false;
    }
    const normalizedTerm = searchTerm.trim().toLowerCase();
    return !normalizedTerm || `${topic.title} ${topic.description}`.toLowerCase().includes(normalizedTerm);
};

const createTopicRow = (category, topic, completed, onToggle) => {
    const row = createElement("div", `topic-row${completed ? " is-complete" : ""}`);
    const checkbox = createElement("input", "topic-checkbox");
    checkbox.type = "checkbox";
    checkbox.id = `topic-${topic.id}`;
    checkbox.checked = completed;
    checkbox.dataset.topicId = topic.id;
    checkbox.setAttribute("aria-label", `${completed ? "Mark incomplete" : "Mark complete"}: ${topic.title}`);
    checkbox.addEventListener("change", () => onToggle(category, topic, checkbox.checked));

    const label = createElement("label", "topic-label");
    label.htmlFor = checkbox.id;
    label.append(
        createElement("span", "topic-title", topic.title),
        createElement("span", "topic-description", topic.description)
    );

    const metadata = createElement("div", "topic-metadata");
    const badge = createElement("span", `priority-badge priority-${topic.priority}`, priorityLabel(topic.priority));
    metadata.append(badge);
    if (topic.resources?.length) {
        const links = topic.resources.map((item) => {
            const link = createElement("a", "topic-resources", "Docs ↗");
            link.href = item.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.title = item.title;
            link.setAttribute("aria-label", `${item.title} (opens in a new tab)`);
            return link;
        });
        metadata.append(...links);
    }
    row.append(checkbox, label, metadata);
    return row;
};

const createCategoryCard = (category, categoryProgress, state, callbacks) => {
    const card = createElement("article", "category-card");
    const expanded = state.expandedCategories.has(category.id);
    card.dataset.categoryId = category.id;
    card.dataset.expanded = String(expanded);

    const header = createElement("div", "category-card-header");
    const toggle = createElement("button", "category-toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", `${expanded ? "Collapse" : "Expand"} ${category.title}`);
    toggle.addEventListener("click", () => callbacks.onToggleCategory(category.id));
    toggle.append(
        createElement("span", "category-chevron", "›"),
        createElement("span", "category-number", String(state.roadmap.findIndex((item) => item.id === category.id) + 1).padStart(2, "0"))
    );

    const copy = createElement("span", "category-heading-copy");
    copy.append(
        createElement("span", "category-title", category.title),
        createElement("span", "category-description", category.description)
    );
    toggle.append(copy, createElement("span", `priority-badge priority-${category.priority}`, priorityLabel(category.priority)));

    const progressCopy = createElement("span", "category-progress-copy");
    progressCopy.append(
        createElement("strong", "", `${categoryProgress.percentage}%`),
        createElement("span", "", `${categoryProgress.completed} / ${categoryProgress.total} topics`)
    );
    progressCopy.append(makeProgressTrack(categoryProgress.percentage, `${category.title} progress`));
    header.append(toggle, progressCopy);
    card.append(header);

    if (expanded) {
        const pathwayTrack = category.id === "frontend-engineering"
            ? "frontend"
            : category.id === "backend-engineering"
                ? "backend"
                : null;
        if (pathwayTrack && !state.searchTerm.trim() && state.filter === "all") {
            const pathwaySelector = createElement("div", "pathway-selector");
            pathwaySelector.setAttribute("aria-label", `Choose ${pathwayTrack} learning paths`);
            renderPathwaySelector(pathwaySelector, pathwayTrack, state, callbacks.onSelectionChange);
            card.append(pathwaySelector);
        }

        const topicsContainer = createElement("div", "category-topics");
        for (const group of category.groups ?? [{ title: null, topicIds: category.topics.map((topic) => topic.id) }]) {
            const groupTopics = category.topics
                .filter((topic) => group.topicIds.includes(topic.id))
                .filter((topic) => topicMatches(topic, state.filter, state.completedTopics, state.searchTerm));
            if (!groupTopics.length) {
                continue;
            }
            if (group.title) {
                topicsContainer.append(createElement("div", "topic-group-label", group.title));
            }
            groupTopics.forEach((topic) => {
                topicsContainer.append(createTopicRow(category, topic, state.completedTopics[topic.id] === true, callbacks.onToggleTopic));
            });
        }
        card.append(topicsContainer);
    }
    return card;
};

export const renderApp = (elements, state, progress, callbacks) => {
    renderNavigation(elements.categoryNavigation, state.roadmap, progress, state.activeCategoryId);
    renderDashboard(elements, progress);

    const searchActive = state.searchTerm.trim() !== "" || state.filter !== "all";
    const selectedCategory = state.roadmap.find((category) => category.id === state.activeCategoryId);
    const categories = searchActive
        ? state.roadmap
        : selectedCategory
            ? [selectedCategory]
            : state.roadmap;

    elements.breadcrumbCurrent.textContent = selectedCategory && !searchActive ? selectedCategory.title : "Overview";
    elements.sectionTitle.textContent = searchActive
        ? "Search results"
        : selectedCategory
            ? selectedCategory.title
            : "All categories";
    elements.sectionEyebrow.textContent = searchActive ? "FILTERED ROADMAP" : selectedCategory ? "ROADMAP CATEGORY" : "ROADMAP OVERVIEW";
    elements.expandAllButton.textContent = categories.every((category) => state.expandedCategories.has(category.id)) ? "Collapse all" : "Expand all";
    elements.roadmapContent.replaceChildren();
    let visibleTopics = 0;
    categories.forEach((category) => {
        const visible = category.topics.filter((topic) =>
            topicMatches(topic, state.filter, state.completedTopics, state.searchTerm)
        );
        visibleTopics += visible.length;
        if (visible.length) {
            const categoryProgress = progress.categories.find((item) => item.id === category.id);
            elements.roadmapContent.append(createCategoryCard(category, categoryProgress, state, callbacks));
        }
    });

    elements.emptyState.hidden = visibleTopics !== 0;
    elements.resultsSummary.textContent = searchActive
        ? `${visibleTopics} matching ${visibleTopics === 1 ? "topic" : "topics"} across ${categories.filter((category) => category.topics.some((topic) => topicMatches(topic, state.filter, state.completedTopics, state.searchTerm))).length} ${categories.length === 1 ? "category" : "categories"}`
        : "";
};

export const showNotice = (element, message) => {
    element.textContent = message;
    element.hidden = false;
};
