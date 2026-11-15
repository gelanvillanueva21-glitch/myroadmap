import { DEFAULT_SELECTIONS, normalizeSelections } from "./roadmap.js";

export const STORAGE_KEY = "software-engineering-roadmap-progress";
export const STORAGE_VERSION = 2;

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export const validateProgress = (value, knownTopicIds) => {
    if (!isRecord(value) || ![1, STORAGE_VERSION].includes(value.version) || !isRecord(value.completedTopics)) {
        return { valid: false, reason: "The backup must contain a supported version and a completedTopics object." };
    }

    let selections = DEFAULT_SELECTIONS;
    if (value.version === STORAGE_VERSION) {
        if (!isRecord(value.selections)) {
            return { valid: false, reason: "Version 2 backups must include frontend and backend selections." };
        }
        for (const track of ["frontend", "backend"]) {
            const selection = value.selections[track];
            if (!isRecord(selection) || !Array.isArray(selection.languages) || !isRecord(selection.frameworks)) {
                return { valid: false, reason: `The ${track} selections are malformed.` };
            }
            if (selection.languages.some((id) => typeof id !== "string")
                || Object.values(selection.frameworks).some((ids) => !Array.isArray(ids) || ids.some((id) => typeof id !== "string"))) {
                return { valid: false, reason: `The ${track} language or framework selections are malformed.` };
            }
        }
        selections = normalizeSelections(value.selections);
    }

    const completedTopics = {};
    for (const [topicId, isComplete] of Object.entries(value.completedTopics)) {
        if (typeof isComplete !== "boolean") {
            return { valid: false, reason: "Each completion value must be true or false." };
        }
        if (isComplete && knownTopicIds.has(topicId)) {
            completedTopics[topicId] = true;
        }
    }

    return { valid: true, data: { version: STORAGE_VERSION, completedTopics, selections } };
};

export const loadProgress = (knownTopicIds) => {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === null) {
            return {
                data: { version: STORAGE_VERSION, completedTopics: {}, selections: DEFAULT_SELECTIONS },
                warning: null
            };
        }

        let parsed;
        try {
            parsed = JSON.parse(saved);
        } catch {
            return {
                data: { version: STORAGE_VERSION, completedTopics: {}, selections: DEFAULT_SELECTIONS },
                warning: "Saved progress could not be read because its data is malformed. Your original browser data has not been changed."
            };
        }

        const validation = validateProgress(parsed, knownTopicIds);
        if (!validation.valid) {
            return {
                data: { version: STORAGE_VERSION, completedTopics: {}, selections: DEFAULT_SELECTIONS },
                warning: `Saved progress was not loaded: ${validation.reason} Your original browser data has not been changed.`
            };
        }
        return { data: validation.data, warning: null };
    } catch (error) {
        return {
            data: { version: STORAGE_VERSION, completedTopics: {}, selections: DEFAULT_SELECTIONS },
            warning: `Browser storage is unavailable. Progress changes may not persist. ${error.message}`
        };
    }
};

export const saveProgress = (completedTopics, selections) => {
    const payload = {
        version: STORAGE_VERSION,
        completedTopics,
        selections,
        updatedAt: new Date().toISOString()
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const parseProgressFile = async (file, knownTopicIds) => {
    let parsed;
    try {
        parsed = JSON.parse(await file.text());
    } catch {
        return { valid: false, reason: "The selected file is not valid JSON." };
    }
    return validateProgress(parsed, knownTopicIds);
};

export const exportProgress = (completedTopics, selections) => ({
    version: STORAGE_VERSION,
    completedTopics,
    selections,
    updatedAt: new Date().toISOString()
});
