import { Link } from "react-router-dom"

type Props = {
  children: React.ReactNode,
  navigateTo: string,
  style?: string
}

const LinkText = ({ children, navigateTo, style }: Props) => {
  return (
    <Link to={navigateTo}>
      <p className={`hover:text-accent dark:hover:text-sky-300 font-semibold ${style}`}>
        {children}
      </p>
    </Link>
  )
}

export default LinkText