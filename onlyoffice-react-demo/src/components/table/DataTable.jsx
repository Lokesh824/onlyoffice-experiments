import React, { useState } from 'react'
import Table from './table'
import ReadMore from '../ReadMore';

const DataTable = ({tableData}) => {
  const [records, setRecords] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const data = tableData.map((data, idx) => {
    let row = {};
    row["id"] = idx+1;
    Object.entries(data).forEach(each => {
      const accessor = each[0].split(' ').join('_').toLowerCase();
      row[accessor] = <ReadMore wordCount={10} cellData={String(each[1])} />;
    })
    return row;
  });

  function handlePagePerRecordsChange(recordValue){
    setRecords(recordValue);
    
  }

  function onPageClick(pageIdx){
    console.log(pageIdx)
    setPageIndex(pageIdx - 1);
  }

  const column = Object.keys(tableData[0]).map(header => {
    return {
      Header: header.split('_').join(' '),
      accessor: header.split(' ').join('_').toLowerCase(),
      disableSortBy: true,
      width: 200
    }
  });

  column.unshift({
      Header: "ID",
      accessor: "id",
      disableSortBy: true,
      width: 70
  });

  const checkStartIndex = () => {
    if(pageIndex*records > data.length){
      setPageIndex(0);
      return 0;
    }
    return pageIndex*records;
  }

  const filterData = data.slice(checkStartIndex(), pageIndex*records+records > data.lenght ? data.length : pageIndex*records+records);

  console.log(data, data.length);

  return (
    <Table
      columns={column}
      data={filterData}
      pagination = {{ page_number:pageIndex+1, per_page:records, total_count:data.length }}
      onPageClick={onPageClick}
      onPagePerRecordsChange={handlePagePerRecordsChange}
    />
  )
}

export default DataTable
