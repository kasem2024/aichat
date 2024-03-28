import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'

const page = () => {
  return (
    <div>
      this is the landing page for our project
      <Link href="/site">
        <Button>Login</Button>
      </Link>
      <Link href="/site">
        <Button>Register</Button>
      </Link>
    </div>
  )
}

export default page
