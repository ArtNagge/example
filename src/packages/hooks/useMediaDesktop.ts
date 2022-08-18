import breakpoints from '@styles/variables/_breakpoints.module.scss'

import useMedia from '@hooks/useMedia'

const useMediaDesktop = () => {
  const xl = +breakpoints['breakpoint-xl']
  const matchDesktop = useMedia({ minWidth: xl + 1 })
  return matchDesktop
}

export default useMediaDesktop
