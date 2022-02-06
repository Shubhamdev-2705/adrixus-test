import React from 'react';
import './List.css';
import { DATA } from '../data/data';
import TableWithFilter from '../components/Table-with-filter';
import { FormGroup, Input, Label, Table } from 'reactstrap';

function List() {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(10);

    const totalResults = DATA.length
    const numPages = Math.ceil(totalResults / limit);
    const showingResultsFrom = (page - 1) * limit + 1;
    const showingResultsTo = Math.min(page * limit, totalResults);
    
    const currentPageData = React.useMemo(() => {
        const firstPageIndex = (page - 1) * limit;
        const lastPageIndex = firstPageIndex + Number(limit);
        return DATA.slice(firstPageIndex, lastPageIndex);
    }, [limit, page]);

    const onPageLimitChange = (e) => {
        setPage(1);
        setLimit(e.target.value);
    }

    return (
        <div>
            <h2>User Details</h2>
            <FormGroup>
                <Label>Select{' '}</Label>
                <Input
                    type="select"
                    name="select"
                    onChange={onPageLimitChange}
                >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </Input>
            </FormGroup>
            <TableWithFilter
                total_records={totalResults}
                isPagination={true}
                page={page}
                setPage={setPage}
                limit={limit}
                setLimit={setLimit}
                numPages={numPages}
                showingResultsFrom={showingResultsFrom}
                showingResultsTo={showingResultsTo}
            >
                <Table bordered>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            currentPageData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </TableWithFilter>
        </div>
    )
}

export default List
