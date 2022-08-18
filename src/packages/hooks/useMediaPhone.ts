import breakpoints from './../styles/variables/_breakpoints.module.scss'
import useMedia from './useMedia'

const useMediaPhone = () => {
  const md = +breakpoints['breakpoint-md']
  const matchPhone = useMedia({ minWidth: 0, maxWidth: md - 1 })
  return matchPhone
}

export default useMediaPhone
