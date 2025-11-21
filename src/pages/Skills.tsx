import { Divider } from '@mui/material'
import {useState } from 'react'
import SkillHeader from '../components/SkillHeader'
import SkillTable from '../components/SkillTable'

 const Skills=()=>{
  const [open] = useState(true)

  return(
    <>
      <Divider/>
      <SkillHeader open={open} />
      <SkillTable/>
      <Divider/>
    </>
  )
}
export default Skills