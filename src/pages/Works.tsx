import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Button,
  Box
} from '@mui/material';
import { useState } from 'react'
import { workRows } from '../data/rows'

const Works=()=>{
  const [rows] = useState(workRows)

  return(
    <>
     <Divider/>
     <Box className='table-container-size'>
      <div className='works-header'>
      <Button className='works-button'>
        職務経歴
      </Button>
        <p className='table-cell-std works-note'>
          ※詳細は職務経歴書をご参照ください
        </p>
      </div>
     </Box>

      <div>
        <TableContainer  className='table-container-size'>
          <Table className='table-base'>
            <TableHead >
              <TableRow sx={{ backgroundColor: 'lightgray' }}>
                <TableCell className='table-cell-theme' sx={{width:'28%'}}>西暦</TableCell>
                <TableCell className='table-cell-theme' sx={{width:'13%'}}>期間</TableCell>
                <TableCell className='table-cell-theme' sx={{width:'28%'}}>社名</TableCell>
                <TableCell className='table-cell-theme' sx={{width:'31%',}}>内容</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow key={row.no}>
                    <TableCell align="center" className='table-cell-std'>
                      {row.date}
                    </TableCell>
                    <TableCell align="center" className='table-cell-std'>
                        {row.period}
                    </TableCell>
                    <TableCell align="left" className='table-cell-std'>
                      {row.name}
                    </TableCell>
                    <TableCell align="left" className='table-cell-std'>
                      {row.note}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    <Divider/>
    </>
  )
}
export default Works
