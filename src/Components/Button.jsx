import React from 'react'
import './Button.css'
import { Icon } from "@iconify/react";
export default function Button() {
  return (
        <button className='btn font-Poppins'><span className='spn'></span>View All Products<Icon
        icon="tabler:arrow-up-right"
        className="text-[28px] transition duration-200"
      /></button>
  )
}
