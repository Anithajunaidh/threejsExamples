
import { Table,TableContainer, Paper, TableBody, TableRow, TableCell, TableHead, IconButton, LinearProgress } from "@mui/material";
import React, { useState,  useCallback, useRef, useEffect } from "react";
import useScroll from "./useScrollHook";
import { UseScrollProps } from "./useScrollHook";

interface DataTableProps {
  data: any[]; // Replace with your data structure
  actions: { label: string; actionType: string; icon: React.ReactNode }[];
  handleClick: (actionType: string, id: number) => void;
  headers: { title: string; field: string }[];
  rowsPerPage: number;
  page:number;
 setPage: ( page: number) => void;
 totalRecords:number;
}
const DataTable: React.FC<DataTableProps> = ({
  data,
  actions,
  headers,
  handleClick,
  rowsPerPage,
  page,
 setPage,totalRecords,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const handleTableScroll = useCallback(({ isAtTop, isAtBottom }: UseScrollProps) => {
    const totalPages = Math.ceil(totalRecords / rowsPerPage);
    const isAtLastPage = page + 1 >= totalPages;

    if (!isFetching && isAtTop && page > 1) {
      setPage(page - 1);
    } else if (!isFetching && isAtBottom && !isAtLastPage) {
      console.log('touched bottom',isAtBottom)
      setIsFetching(true);
      setPage(page + 1);
    }
    isAtTop=false;
    isAtBottom=false;
  }, [isFetching, page]);

  
  // Use the custom useScroll hook with the handleTableScroll function
 // useScroll(tableRef, handleTableScroll);
 useScroll(tableRef, handleTableScroll, {
  onFetchData: () => {
      if (tableRef.current) {
      if (page === 0) {
        // Set scroll to the top when page is zero
        tableRef.current.scrollTop = 0;
      } else {
      const containerHeight = tableRef.current.clientHeight;
      const totalScrollHeight = tableRef.current.scrollHeight;
      const centerScrollPosition = (totalScrollHeight - containerHeight) / 2;
      
      // Set scroll to center
      tableRef.current.scrollTop = centerScrollPosition;
    }
  }
    }
  });

  useEffect(() => {
    setIsFetching(false);
  }, [data]);
  
  // useEffect(() => {
  //   if (tableRef.current) {
  //     if (page === 0) {
  //       // Set scroll to the top when page is zero
  //       tableRef.current.scrollTop = 0;
  //     } else {
  //     const containerHeight = tableRef.current.clientHeight;
  //     const totalScrollHeight = tableRef.current.scrollHeight;
  //     const centerScrollPosition = (totalScrollHeight - containerHeight) / 2;
      
  //     // Set scroll to center
  //     tableRef.current.scrollTop = centerScrollPosition;
  //   }
  // }
  // }, [page]);
  
 // const columns = headers.map((column) => column.field);
   const displayedData =  data ? data.slice(0, (page + 1) * rowsPerPage) : [];

  const emptyRows = Math.max(0, rowsPerPage - displayedData.length);

  return (
    <div ref={tableRef} style={{ overflowY: "auto", maxHeight:300 }}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
           <TableHead>
            <TableRow>
               {headers.map((column, index) => (
                <TableCell key={index}>{column.title}</TableCell>
              ))}
              {actions.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
  {displayedData.map((item, rowIndex) => (
    <TableRow key={rowIndex}>
      {headers.map((column) => (
        <TableCell  key={column.field}>{item[column.field]}</TableCell>
      ))}
      <TableCell>
        {actions.map((action, actionIndex) => (
          <IconButton
            key={actionIndex}
            onClick={() => handleClick(action.actionType, item.id)}
          >
            {action.icon}
          </IconButton>
        ))}
      </TableCell>
    </TableRow>
  ))}
  {emptyRows > 0 && (
    <TableRow style={{ height: 53 * emptyRows }}>
      <TableCell colSpan={headers.length + (actions.length > 0 ? 1 : 0)} />
    </TableRow>
  )}
   {isFetching && data &&(
    <TableRow>
      <TableCell colSpan={headers.length + (actions.length > 0 ? 1 : 0)}><LinearProgress color="primary"/></TableCell>
    </TableRow>
   )} 
</TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(DataTable);
