import { Transition, Variants } from 'framer-motion'

export const titleVariants: Variants = {
  hide: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
}

export const burgerVariants: Variants = {
  hide: { opacity: 0, x: '-100%' },
  visible: { opacity: 1, x: 0 },
}

export const subTitleVariants: Variants = {
  hide: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}

export const infoVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0 },
}

export const defaultTransition: Transition = {
  type: 'spring',
  duration: 1,
}

export const motionTitle = {
  initial: 'hide',
  whileInView: 'visible',
  exit: 'hide',
  variants: titleVariants,
  transition: defaultTransition,
  viewport: { once: true },
}

export const motionSubtitle = {
  initial: 'hide',
  whileInView: 'visible',
  exit: 'hide',
  variants: subTitleVariants,
  transition: defaultTransition,
  viewport: { once: true },
}

export const motionInfo = {
  initial: 'hide',
  whileInView: 'visible',
  exit: 'hide',
  variants: infoVariants,
  transition: defaultTransition,
  viewport: { once: true },
}
