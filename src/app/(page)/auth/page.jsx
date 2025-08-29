import AuthPages from '@/app/pages/utils/Auth'
import React from 'react'


export const metadata = {
  title: "Complete Your Authentication",
  description: "Authentication page for Calf",
};

function Page() {
  return (
    <div>
      <AuthPages />
    </div>
  )
}

export default Page;