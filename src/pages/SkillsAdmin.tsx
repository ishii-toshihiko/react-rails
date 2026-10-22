import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useState, type FormEvent } from 'react'
import {
  createSkill,
  deleteSkill,
  fetchSkills,
  updateSkill,
} from '../apis/skills'
import type { Skill, SkillCategory, SkillInput } from '../types/Skill'

const emptyForm: SkillInput = {
  category: 'soft',
  item: '',
  term: 1,
}

const categoryLabel = (category: string): string => {
  if (category === 'soft') return 'ソフトウェア'
  if (category === 'heard') return 'ハードウェア'
  return category
}

const SkillsAdmin = () => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [form, setForm] = useState<SkillInput>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadSkills = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSkills()
      setSkills(data)
    } catch {
      setError('スキル一覧の取得に失敗しました。')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadSkills()
  }, [loadSkills])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id)
    setForm({
      category: (skill.category === 'heard' ? 'heard' : 'soft') as SkillCategory,
      item: skill.item,
      term: skill.term,
    })
    setError(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: SkillInput = {
      category: form.category,
      item: form.item.trim(),
      term: Number(form.term),
    }

    try {
      if (editingId === null) {
        await createSkill(payload)
      } else {
        await updateSkill(editingId, payload)
      }
      resetForm()
      await loadSkills()
    } catch {
      setError(
        editingId === null
          ? 'スキルの作成に失敗しました。入力内容を確認してください。'
          : 'スキルの更新に失敗しました。入力内容を確認してください。'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (skill: Skill) => {
    if (!window.confirm(`「${skill.item}」を削除しますか？`)) return

    setError(null)
    try {
      await deleteSkill(skill.id)
      if (editingId === skill.id) resetForm()
      await loadSkills()
    } catch {
      setError('スキルの削除に失敗しました。')
    }
  }

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 1.5, sm: 2 }, py: 2 }}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
        スキル管理
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        ログイン後のみ操作できます。公開のスキル画面に反映されます。
      </Typography>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        variant="outlined"
        sx={{ p: 2, mb: 3 }}
      >
        <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
          {editingId === null ? '新規追加' : `編集中（ID: ${editingId}）`}
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          useFlexGap
          sx={{ flexWrap: 'wrap', alignItems: { sm: 'flex-start' } }}
        >
          <TextField
            select
            label="カテゴリ"
            name="category"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                category: e.target.value as SkillCategory,
              }))
            }
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="soft">ソフトウェア</MenuItem>
            <MenuItem value="heard">ハードウェア</MenuItem>
          </TextField>
          <TextField
            label="項目"
            name="item"
            value={form.item}
            onChange={(e) => setForm((prev) => ({ ...prev, item: e.target.value }))}
            size="small"
            required
            sx={{ flex: 1, minWidth: 180 }}
          />
          <TextField
            label="経験年数"
            name="term"
            type="number"
            value={form.term}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, term: Number(e.target.value) }))
            }
            size="small"
            required
            inputProps={{ min: 0, max: 50, step: 1 }}
            sx={{ width: 120 }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            {editingId === null ? '追加する' : '更新する'}
          </Button>
          {editingId !== null && (
            <Button
              type="button"
              variant="outlined"
              onClick={resetForm}
              disabled={saving}
              sx={{ textTransform: 'none' }}
            >
              キャンセル
            </Button>
          )}
        </Stack>
      </Paper>

      {error && (
        <Typography color="error" role="alert" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        一覧
      </Typography>

      {loading ? (
        <Typography color="text.secondary">読み込み中…</Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="スキル一覧">
            <TableHead>
              <TableRow>
                <TableCell>カテゴリ</TableCell>
                <TableCell>項目</TableCell>
                <TableCell align="right">年数</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id} selected={editingId === skill.id}>
                  <TableCell>{categoryLabel(skill.category)}</TableCell>
                  <TableCell>{skill.item}</TableCell>
                  <TableCell align="right">{skill.term}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        size="small"
                        onClick={() => startEdit(skill)}
                        sx={{ textTransform: 'none' }}
                      >
                        編集
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => void handleDelete(skill)}
                        sx={{ textTransform: 'none' }}
                      >
                        削除
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {skills.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography color="text.secondary">スキルがありません。</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default SkillsAdmin
