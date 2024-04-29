import { ArrowDownNarrowWide, ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react'
import React from 'react'

type Props = {
  asc?: boolean
  toggleOrder: () => void
}

const OrderButton = ({ asc, toggleOrder }: Props) => {
  return (
    <button className='text-slate-900 border-2 p-1 rounded-md hover:bg-slate-50 shadow-sm focus:border-slate-800' onClick={toggleOrder}>
      {
        asc ?
          <ArrowUpNarrowWide className='w-6 h-6' />
          : <ArrowDownWideNarrow className='w-6 h-6' />
      }
    </button>
  )
}

export default OrderButton