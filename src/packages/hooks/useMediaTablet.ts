import breakpoints from './../styles/variables/_breakpoints.module.scss'
import useMedia from './useMedia'

const useMediaTablet = () => {
  const md = +breakpoints['breakpoint-md']
  const xl = +breakpoints['breakpoint-xl']
  const matchTablet = useMedia({ minWidth: md, maxWidth: xl })
  return matchTablet
}

export default useMediaTablet
