import React from 'react'

const Shimmer = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 grid-flow-row mt-12'>
        {Array(20).fill(' ').map((item,id)=><div className='w-[11rem] min-h-[15rem] bg-gradient-to-br from-gray-500 to-gray-800 mb-10 opacity-95' key={id}></div>)}
    </div>
  )
}

export default Shimmer