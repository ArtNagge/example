import useMediaMD from './useMediaMD'
import useMediaXL from './useMediaXL'

const useAdaptive = () => {
  const { matchUpMd, matchDownMd } = useMediaMD()
  const { matchDownXl } = useMediaXL()

  const isMobile = matchDownMd
  const isTablet = matchUpMd && matchDownXl
  const isDesktop = !isTablet && !isMobile

  return { isMobile, isTablet, isDesktop }
}

export default useAdaptive
