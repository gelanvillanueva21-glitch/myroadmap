const percent = (completed, total) => total === 0 ? 0 : Math.round((completed / total) * 100);

export const calculateProgress = (roadmap, completedTopics) => {
    const categories = roadmap.map((category) => {
        const total = category.topics.length;
        const completed = category.topics.reduce(
            (count, topic) => count + (completedTopics[topic.id] === true ? 1 : 0),
            0
        );
        return {
            id: category.id,
            completed,
            total,
            percentage: percent(completed, total),
            isComplete: total > 0 && completed === total
        };
    });

    const total = categories.reduce((count, category) => count + category.total, 0);
    const completed = categories.reduce((count, category) => count + category.completed, 0);
    const completedCategories = categories.filter((category) => category.isComplete).length;
    return {
        completed,
        total,
        remaining: total - completed,
        percentage: percent(completed, total),
        completedCategories,
        totalCategories: categories.length,
        categories
    };
};
