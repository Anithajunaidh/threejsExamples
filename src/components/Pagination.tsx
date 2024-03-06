// components/Pagination.tsx
import React from 'react';
import { Pagination as MuiPagination } from '@mui/material';

interface PaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ count, page, onChange }) => {
  return (
    <MuiPagination
      count={count}
      page={page}
      onChange={(_event, value) => onChange(value)}
    />
  );
};

export default Pagination;
