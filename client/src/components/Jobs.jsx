import React from 'react'
import FilterCard from './FilterCard'
import Job from './Job';

const jobsArray=[1,2,3,4,5,6,7,8];

const Jobs = () => {
  return (
    <div>
      <FilterCard/>
      <div>
      {
        jobsArray.map((item,index)=><Job/>)
      }
      </div>
    </div>
  )
}

export default Jobs
