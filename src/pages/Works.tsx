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

// 行の内容
type Row = {
  no: number
  date: string
  period: string
  name: string
  note: string
};

const Works=()=>{

  const initData: Row[] = [
    { no: 1, date: '2025年 1月　～　2025年 6月',period: '６か月', name: 'I株式会社', note: 'ICT支援員' },
    { no: 2, date: '2024年 1月　～　2024年12月',period: '１年', name: 'E株式会社', note: 'Webエンジニア' },
    { no: 3, date: '2018年 8月　～　2023年 8月',period: '５年', name: 'T株式会社（再雇用）', note: 'Web/品質保証エンジニア' },
    { no: 4, date: '1981年 4月　～　2018年 7月',period: '３８年', name: 'T株式会社（正社員）', note: 'ソフト/電子回路エンジニア' },
  ];

  // useStateの宣言と初期値の格納
  //const [rows, setRows] = useState<Row[]>(initData);
  const [rows] = useState<Row[]>(initData);


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
              {/* rows(行が格納された配列をループ処理) */}
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