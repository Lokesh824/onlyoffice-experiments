import React from 'react'
import { SubText } from '@itispal/uikit';
import { useTable, useSortBy, useRowSelect, usePagination, Column } from 'react-table'
import StyledPagination from './pagination'

const Table = ({
    columns,
    data,
    pagination = { page_number:1, per_page:10, total_count:20 },
    sort = { id:'id', desc:true },
    hidden_columns = [],
    load = false,
    onColumnSorting,
    onPagePerRecordsChange,
    onPageClick
}) => {
    const { page_number:currentPage, total_count:totalCount, per_page:pageSize } = pagination
    console.log(Math.ceil(totalCount / pageSize))

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        pageCount,
        state: { sortBy }
    } = useTable({
        columns,
        data,
        initialState: {
            sortBy: [sort],
            hiddenColumns: hidden_columns
        },
        pageCount: Math.ceil(totalCount / pageSize),
        manualPagination: true,
        manualSortBy:true
    },useSortBy, usePagination, useRowSelect)

    function handleColumnSort(id, desc){
        onColumnSorting(id, desc)
    }

    function handlePagePerRecordsChange(records){
        onPagePerRecordsChange(records)
    }

    function handlePageClick(page_index){
        onPageClick(page_index)
    }

    return (
        load?
        <div className="animated-background">
            <div className="background-masker content-first-line"></div>
            <div className="background-masker content-second-line"></div>
            <div className="background-masker content-third-line"></div>
        </div>
        :<>
        <div className={`table-responsive`}>
            <table {...getTableProps()} className={`table`}>
                <thead>
                    {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}
                            onClick={(column.disableSortBy && column.disableSortBy === true)?null:() => { column.toggleSortBy(!column.isSortedDesc); handleColumnSort(column.id, !column.isSortedDesc); }}
                            style={{
                                backgroundColor: column.id === 'separator'?'#FFFFFF':'transparent',
                                borderBottom: column.id === 'separator'?'none':'2px solid #EBECF0',
                                textAlign:(column.id === 'code' || column.id === 'action' || column.id === 'is_active')?'center':'left' 
                            }}
                        >
                            <span style={{width:column.width === 'auto'?'auto':column.width+'px'}}>
                                {column.render('Header')}
                                   {(column.disableSortBy && column.disableSortBy === true)?
                                    ''
                                   :column.isSorted
                                    ? column.isSortedDesc
                                        ? <span style={{position:'relative'}}><i className='fas fa-sort-up inactive'></i><i className='fas fa-sort-down'></i></span>
                                        : <span style={{position:'relative'}}><i className='fas fa-sort-up'></i><i className='fas fa-sort-down inactive'></i></span>
                                    :<i className='fa fa-sort'></i>
                                }
                            </span>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.length > 0?
                        page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map((cell, j) => {
                                return <td {...cell.getCellProps()}
                                            style={{
                                                backgroundColor: 'transparent',
                                                textAlign: 'left',
                                                borderBottom:'1px solid #EBECF0'
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                            })}
                            </tr>
                        )
                        })
                        :<tr><td colSpan={columns.length}><SubText>No matching data found</SubText></td></tr>
                    }
                </tbody>
            </table>
        </div>
        {
            totalCount > 10 &&
            <StyledPagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageCount={pageCount}
                pageSize={pageSize}
                onPagePerRecordsChange={handlePagePerRecordsChange}
                onPageClick={handlePageClick}
            />
        }
        </>
    )
}

export default Table
