import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Box, Typography } from '@mui/material'
import axios from 'axios'
import { Fragment, useEffect, useMemo, useState } from 'react'

interface Skill {
  id: number
  category: string
  item: string
  term: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/** バー表示の上限年数。これ以上は 100% で飽和 */
const MAX_YEARS = 10

const CATEGORY_ORDER = ['soft', 'heard'] as const

const CATEGORY_META: Record<string, { label: string; description: string }> = {
  soft: {
    label: 'ソフトウェア',
    description: 'Webアプリ・インフラ',
  },
  heard: {
    label: 'ハードウェア',
    description: '回路設計・FPGA / DSP',
  },
}

const experienceBarValue = (term: number): number =>
  (Math.min(Math.max(term, 0), MAX_YEARS) / MAX_YEARS) * 100

const categoryMeta = (category: string) =>
  CATEGORY_META[category] ?? {
    label: category,
    description: '',
  }

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

  const skillGroups = useMemo(() => {
    const byCategory = new Map<string, Skill[]>()
    for (const skill of skills) {
      const key = skill.category || 'other'
      const list = byCategory.get(key) ?? []
      list.push(skill)
      byCategory.set(key, list)
    }

    const orderedKeys = [
      ...CATEGORY_ORDER.filter((key) => byCategory.has(key)),
      ...[...byCategory.keys()].filter(
        (key) => !(CATEGORY_ORDER as readonly string[]).includes(key)
      ),
    ]

    return orderedKeys.map((category) => {
      const meta = categoryMeta(category)
      const items = [...(byCategory.get(category) ?? [])].sort((a, b) => {
        // Ruby をソフトカテゴリの先頭に固定（同率年数でも上に出す）
        if (a.item === 'Ruby' && b.item !== 'Ruby') return -1
        if (b.item === 'Ruby' && a.item !== 'Ruby') return 1
        return b.term - a.term || a.item.localeCompare(b.item, 'ja')
      })
      return {
        category,
        label: meta.label,
        description: meta.description,
        items,
      }
    })
  }, [skills])

  return(
    <>
      <TableContainer className='table-container-size'>
        <Table className='table-base'>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'lightgray' }}>
              <TableCell
                className="table-cell-theme"
                sx={{ width: { xs: '32%', sm: '26%', md: '22%' } }}
              >
                項目
              </TableCell>
              <TableCell
                className="table-cell-theme"
                sx={{ width: { xs: '16%', sm: '15%', md: '15%' } }}
              >
                期間
              </TableCell>
              <TableCell
                className="table-cell-theme"
                sx={{ width: { xs: '52%', sm: '59%', md: '63%' } }}
              >
                経験の目安（最大{MAX_YEARS}年）
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skillGroups.map((group) => (
              <Fragment key={group.category}>
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="table-cell-std"
                    sx={{
                      pl: '1em',
                      py: 1.25,
                      backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    <Typography component="span" sx={{ fontWeight: 'bold' }}>
                      {group.label}
                    </Typography>
                    {group.description && (
                      <Typography component="span" sx={{ fontSize: '0.9em', opacity: 0.85, ml: 1 }}>
                        {group.description}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                {group.items.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell
                      align="left"
                      className="table-cell-std skill-item-cell"
                      sx={{ pl: { xs: '0.5em', sm: '1em' } }}
                    >
                      {skill.item}
                    </TableCell>
                    <TableCell align="center" className='table-cell-std'>
                      {skill.term}年
                    </TableCell>
                    <TableCell>
                      <Box className="skill-bar">
                        <LinearProgress
                          variant="determinate"
                          value={experienceBarValue(skill.term)}
                          aria-label={`${skill.item} の経験 ${skill.term}年`}
                          className="skill-bar-progress"
                          sx={{ height: { xs: 20, md: 24 }, borderRadius: 1 }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SkillTable
