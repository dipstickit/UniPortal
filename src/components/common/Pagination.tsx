import React from 'react'
import PaginationMUI from '@mui/material/Pagination';

type Props = {
  count?: number,
  page: number,
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

const Pagination = ({count, page, handleChange}: Props) => {
  return (
    <div className='flex justify-center'>
      <PaginationMUI count={count} shape="rounded" onChange={handleChange}/>
    </div>
  )
}

export default Pagination