import React from 'react';
import { DropdownButton } from '@itispal/uikit';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { usePagination, DOTS } from './use-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const StyledPagination = (props) => {
  const {
    currentPage,
    totalCount,
    pageCount,
    pageSize,
    siblingCount = 1,
    onPagePerRecordsChange,
    onPageClick
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount
  });

  const recordFrom = currentPage > 1? ((currentPage - 1) * pageSize) + 1 : 1
  const recordTo = (recordFrom + (pageSize - 1)) < totalCount? recordFrom + (pageSize - 1) : totalCount

  const lastPage = paginationRange[paginationRange.length - 1];

  const defaultCustomRecordsPerPage = [5, 10, 25, 50];

  function handlePagePerRecordsChange(records){
    onPagePerRecordsChange(records)
  }

  function handlePageClick(page_index){
    onPageClick(page_index)
  }

  return (
    <div className='pagination'>
      <span>
          <DropdownButton.UncontrolledDropdown>
            <DropdownButton.DropdownToggle id="button-record-container">{pageSize} <FontAwesomeIcon icon={faChevronDown} /></DropdownButton.DropdownToggle>
            <DropdownButton.DropdownMenu>
              {
                defaultCustomRecordsPerPage.map((records) => {
                  return <DropdownButton.DropdownItem key={`data-${records}`} name={`record-${records}`} id={`record-${records}`} disabled={pageSize === records} onClick={() => handlePagePerRecordsChange(records)}>{records}</DropdownButton.DropdownItem>
                })
              }
            </DropdownButton.DropdownMenu>
          </DropdownButton.UncontrolledDropdown>
      </span>
      <span className='space'></span>
      <span>
        <strong>
          Showing {recordFrom} to {recordTo} of {totalCount} records
        </strong>{' '}
      </span>
      {
        pageCount > 1 &&
        <Pagination>
          <PaginationItem disabled={currentPage <= 1}>
            <PaginationLink
              name="page-prev"
              id="page-prev"
              onClick={() => handlePageClick(currentPage - 1)}
              previous
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </PaginationLink>
          </PaginationItem>
          {paginationRange.map((pageNumber, idx) => {
            if (pageNumber === DOTS) {
              return <li key={pageNumber + idx} className="page-item dots">&#8230;</li>;
            }

            return (
              <PaginationItem key={pageNumber} active={currentPage === pageNumber}>
                <PaginationLink name={`page-${pageNumber}`} id={`page-${pageNumber}`} onClick={() => handlePageClick(pageNumber)}>
                {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem disabled={currentPage >= lastPage}>
            <PaginationLink
              name="page-next"
              id="page-next"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      }
    </div>
  );
};

export default StyledPagination;
