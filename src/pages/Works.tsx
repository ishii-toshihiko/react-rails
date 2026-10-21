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
          ※職務年表に担当・技術の概要を併記（詳細は職務経歴書へ）
        </p>
      </div>
     </Box>

      <div>
        <TableContainer className="table-container-size works-table-container">
          <Table className='table-base'>
            <TableHead >
              <TableRow sx={{ backgroundColor: 'lightgray' }}>
                <TableCell
                  className="table-cell-theme"
                  sx={{ width: { xs: '34%', sm: '28%' } }}
                >
                  西暦
                </TableCell>
                <TableCell
                  className="table-cell-theme"
                  sx={{ width: { xs: '12%', sm: '13%' } }}
                >
                  期間
                </TableCell>
                <TableCell
                  className="table-cell-theme"
                  sx={{ width: { xs: '26%', sm: '28%' } }}
                >
                  社名
                </TableCell>
                <TableCell
                  className="table-cell-theme"
                  sx={{ width: { xs: '28%', sm: '31%' } }}
                >
                  内容
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow key={row.no}>
                    <TableCell align="left" className="table-cell-std works-date-cell">
                      {row.date}
                    </TableCell>
                    <TableCell align="right" className='table-cell-std'>
                        {row.period}
                    </TableCell>
                    <TableCell align="left" className='table-cell-std'>
                      {row.name}
                    </TableCell>
                    <TableCell align="left" className='table-cell-std'>
                      <div>{row.note}</div>
                      <div className="works-summary">{row.summary}</div>
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
