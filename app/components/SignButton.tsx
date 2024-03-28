'use client'
import clsx from 'clsx'
import { motion } from 'framer-motion'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
  cancel?: boolean
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  cancel,
}) => {
  return (
    <motion.button
      onHoverStart={(e) => {}}
      onHoverEnd={(e) => {}}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
        flex 
        justify-center 
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-300' : 'text-white',
        cancel ? 'text-gray-100 hover:text-rose-500' : 'text-white',
        danger &&
          'bg-rose-500 hover:bg-rose-500 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'bg-slate-900 hover:bg-slate-800 hover:text-green-600 focus-visible:outline-green-600'
      )}
    >
      {children}
    </motion.button>
  )
}

export default Button
