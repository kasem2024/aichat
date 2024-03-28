'use client'

import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion'
import { useState } from 'react'
interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled,
}) => {
  const radius = 100 // change this to increase the rdaius of the hover effect
  const [visible, setVisible] = useState(false)

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect()

    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="
          block 
          sm:text-md 
          font-bold 
          leading-6 
          text-gray-100
          hover:text-green-600
          text-lg
         
        "
      >
        {label}
      </label>
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          var(--green-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover/input:shadow-none transition duration-400`,

            errors[id] && 'focus:ring-rose-500',
            disabled && 'opacity-50 cursor-default'
          )}
        />
      </motion.div>
    </div>
  )
}

export default Input

// form-input
//           border-0
//           ring-1
//           ring-inset
//           ring-gray-300
//           focus:ring-2
//           focus:ring-inset
//           focus:ring-green-600
//           sm:text-sm
//           sm:leading-6`
