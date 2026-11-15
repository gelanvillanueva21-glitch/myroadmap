export const STORAGE_KEY = "software-engineering-roadmap-progress";
export const STORAGE_VERSION = 1;

const isRecord = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export const validateProgress = (value, knownTopicIds) => {
    if (!isRecord(value) || value.version !== STORAGE_VERSION || !isRecord(value.completedTopics)) {
        return { valid: false, reason: "The backup must contain a supported version and a completedTopics object." };
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

    return { valid: true, data: { version: STORAGE_VERSION, completedTopics } };
};

export const loadProgress = (knownTopicIds) => {
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved === null) {
            return { data: { version: STORAGE_VERSION, completedTopics: {} }, warning: null };
        }

        let parsed;
        try {
            parsed = JSON.parse(saved);
        } catch {
            return {
                data: { version: STORAGE_VERSION, completedTopics: {} },
                warning: "Saved progress could not be read because its data is malformed. Your original browser data has not been changed."
            };
        }

        const validation = validateProgress(parsed, knownTopicIds);
        if (!validation.valid) {
            return {
                data: { version: STORAGE_VERSION, completedTopics: {} },
                warning: `Saved progress was not loaded: ${validation.reason} Your original browser data has not been changed.`
            };
        }
        return { data: validation.data, warning: null };
    } catch (error) {
        return {
            data: { version: STORAGE_VERSION, completedTopics: {} },
            warning: `Browser storage is unavailable. Progress changes may not persist. ${error.message}`
        };
    }
};

export const saveProgress = (completedTopics) => {
    const payload = {
        version: STORAGE_VERSION,
        completedTopics,
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

export const exportProgress = (completedTopics) => ({
    version: STORAGE_VERSION,
    completedTopics,
    updatedAt: new Date().toISOString()
});
