import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import { useEffect, useState } from 'react'


interface Skill {
  id: number
  category: string
  item: string
  term: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const SkillTable = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  useEffect(() => {
    axios.get(`${API_BASE_URL}/skills`)
    .then(response => {
        setSkills(response.data)
    })
    .catch(error => {
        console.error('Error fetching skills:', error)
    })
  }, [])

  return(
    <>
      <TableContainer className='table-container-size'>
        <Table className='table-base'>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'lightgray' }}>
              <TableCell className='table-cell-theme' sx={{ width: '20%'}}>項目</TableCell>
              <TableCell className='table-cell-theme' sx={{ width: '15%'}}>期間[年]</TableCell>
              <TableCell className="table-cell-theme" sx={{ width: '65%'}}>習熟度</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell align="left" className='table-cell-left table-cell-std'>
                  {skill.item}
                </TableCell>
                <TableCell align="center" className='table-cell-std'>
                  {skill.term}
                </TableCell>
                <TableCell>
                  <Rating
                    value={skill.term / 2}
                    max={10}
                    precision={0.5}
                    readOnly={true}
                    emptyIcon={<StarIcon sx={{ opacity: 0 }} />} // ← 空の星を非表示にする
                    className='rating-size'
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SkillTable