import cn from 'classnames'
import styles from './Button.module.scss'

interface ButtonProps {
  className?: string
}

export default function Button({ className }: ButtonProps) {
  const buttonClassnames = cn(styles.Button, className)

  return <button className={buttonClassnames}>Hello Button</button>
}
