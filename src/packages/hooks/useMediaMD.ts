import breakpoints from './../styles/variables/_breakpoints.module.scss'
import useMedia from './useMedia'

const useMediaMD = () => {
  const md = +breakpoints['breakpoint-md']
  const matchUpMd = useMedia({ minWidth: md })
  const matchDownMd = useMedia({ maxWidth: md - 1 })
  return { md, matchUpMd, matchDownMd }
}

export default useMediaMD
