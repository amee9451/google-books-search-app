import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TOTAL_ITEMS, MOST_FREQUENT_AUTHOR, EARLIEST_PUBLISHED_YEAR, LATEST_PUBLISHED_YEAR, RESPONSE_TIME_MS } from '../../constants/Book';
const StatsPanel = ({ stats }) => {
    if (!stats)
        return null;
    return (_jsxs("div", { className: "bg-white border p-4 rounded shadow mb-4", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "Search Statistics" }), _jsxs("ul", { className: "space-y-1 text-sm", children: [_jsxs("li", { children: [_jsxs("strong", { children: [TOTAL_ITEMS, ":"] }), " ", stats.totalItems] }), _jsxs("li", { children: [_jsxs("strong", { children: [MOST_FREQUENT_AUTHOR, ":"] }), " ", stats.mostFrequentAuthor || 'N/A'] }), _jsxs("li", { children: [_jsxs("strong", { children: [EARLIEST_PUBLISHED_YEAR, ":"] }), " ", stats.earliestPublishedYear || 'N/A'] }), _jsxs("li", { children: [_jsxs("strong", { children: [LATEST_PUBLISHED_YEAR, ":"] }), " ", stats.latestPublishedYear || 'N/A'] }), _jsxs("li", { children: [_jsxs("strong", { children: [RESPONSE_TIME_MS, ":"] }), " ", stats.responseTimeMs, " ms"] })] })] }));
};
export default StatsPanel;
