import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CommonPagination = ({
    page,
    setPage,
    totalResults,
    pageName,
    numPages,
    showingResultsFrom,
    showingResultsTo
}) => {
    return (
        <div>
            <span>
                Showing:{' '}
                <span>
                {totalResults === 0 ? totalResults : showingResultsFrom} -{' '}
                {showingResultsTo} of {totalResults}
                </span>{' '}
                {pageName ? <span>{pageName}</span> : null}
            </span>
            <Pagination size="sm">
                <PaginationItem disabled={page === 1}>
                    <PaginationLink
                        previous
                        onClick={e => {
                        e.preventDefault();
                        setPage(page - 1);
                        }}
                        disabled={page === 1}
                    />
                </PaginationItem>
                <PaginationItem disabled={page === numPages || numPages === 0}>
                    <PaginationLink
                        next
                        onClick={e => {
                        e.preventDefault();
                        setPage(page + 1);
                        }}
                        disabled={page === numPages || numPages === 0}
                    />
                </PaginationItem>
            </Pagination>
        </div>
    );

};

CommonPagination.defaultProps = {
  pageName: '',
};

export default CommonPagination;
