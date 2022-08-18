import { ChangeEvent, forwardRef } from 'react'

import styles from './burger.module.scss'

interface BurgerProps {
  changeHandler?: (value: boolean) => void
}

const Burger = forwardRef<HTMLInputElement, BurgerProps>(
  ({ changeHandler }, ref) => (
    <label className={styles.burger} htmlFor="burger">
      <input
        ref={ref}
        id="burger"
        type="checkbox"
        onChange={(evt: ChangeEvent<HTMLInputElement>) =>
          changeHandler(evt.target.checked)
        }
      />
      <div className={styles.burger_container}>
        <span />
        <span />
        <span />
      </div>
    </label>
  ),
)

Burger.displayName = 'Burger'

export default Burger
