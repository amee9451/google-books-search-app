import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback } from 'react';
const Pagination = ({ isLoading, page, totalPages, setPage }) => {
    const handleNext = useCallback(() => {
        setPage((prev) => Math.min(prev + 1, totalPages));
    }, [totalPages]);
    const handlePrev = useCallback(() => {
        setPage((prev) => Math.max(prev - 1, 1));
    }, []);
    return (_jsxs("div", { className: "flex justify-center items-center mt-4 mb-4", children: [_jsx("button", { onClick: handlePrev, disabled: isLoading || page <= 1, className: "px-4 py-2 bg-gray-300 rounded-l disabled:opacity-50", children: "Previous" }), _jsx("span", { className: "px-4 py-2 bg-white border-t border-b", children: `Page ${page} of ${totalPages}` }), _jsx("button", { onClick: handleNext, disabled: isLoading || page >= totalPages, className: "px-4 py-2 bg-gray-300 rounded-r disabled:opacity-50", children: "Next" })] }));
};
export default Pagination;
