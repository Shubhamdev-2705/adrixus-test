import React from 'react';
import CommonPagination from './Pagination';

export default function TableWithFilter({
    children,
    page,
    limit,
    setPage,
    setLimit,
    total_records,
    isPagination = true,
    numPages,
    showingResultsFrom,
    showingResultsTo
}) {
    return (
        <div>
            <div>
                {isPagination ? (
                    <CommonPagination
                        page={page}
                        totalResults={total_records}
                        limit={limit}
                        setPage={setPage}
                        setLimit={setLimit}
                        numPages={numPages}
                        showingResultsFrom={showingResultsFrom}
                        showingResultsTo={showingResultsTo}
                    />
                ) : null}
            </div>
            {children}
        </div>
    );
}
