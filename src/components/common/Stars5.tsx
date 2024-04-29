import { Star } from 'lucide-react'

type Props = {
  rating: number,
  size?: 'medium' | 'large'
}

const Stars5 = ({ rating, size }: Props) => {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({ length: 5 },
        (star, index) => <Star size={size == 'large' ? 24 : 18} className={`text-yellow-400 dark:text-yellow-500
        ${index + 1 <= Math.round(rating) ? 'fill-yellow-400' : ''}`} />
      )}
      <p className={`pl-2 text-slate-500 ${size == 'large' ? 'text-lg': ''}`}>
        <span className='font-semibold text-slate-900 dark:text-slate-50'>{rating}</span> out of <span className='font-semibold text-slate-900 dark:text-slate-50'>5</span>
      </p>
    </div>
  )
}

export default Stars5