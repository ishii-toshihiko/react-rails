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
  createSkillDraft,
  deleteSkillDraft,
  fetchSkillDrafts,
  publishSkillDrafts,
  resetSkillDrafts,
  updateSkillDraft,
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
  const [drafts, setDrafts] = useState<Skill[]>([])
  const [canPublish, setCanPublish] = useState(false)
  const [form, setForm] = useState<SkillInput>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const applyPayload = (payload: { drafts: Skill[]; can_publish: boolean }) => {
    setDrafts(payload.drafts)
    setCanPublish(payload.can_publish)
  }

  const loadDrafts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSkillDrafts()
      applyPayload(data)
    } catch {
      setError('下書き一覧の取得に失敗しました。')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadDrafts()
  }, [loadDrafts])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const startEdit = (draft: Skill) => {
    setEditingId(draft.id)
    setForm({
      category: (draft.category === 'heard' ? 'heard' : 'soft') as SkillCategory,
      item: draft.item,
      term: draft.term,
    })
    setError(null)
    setNotice(null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setNotice(null)

    const payload: SkillInput = {
      category: form.category,
      item: form.item.trim(),
      term: Number(form.term),
    }

    try {
      if (editingId === null) {
        await createSkillDraft(payload)
      } else {
        await updateSkillDraft(editingId, payload)
      }
      resetForm()
      await loadDrafts()
      setNotice('下書きを保存しました。公開ページにはまだ反映されていません。')
    } catch {
      setError(
        editingId === null
          ? '下書きの作成に失敗しました。入力内容を確認してください。'
          : '下書きの更新に失敗しました。入力内容を確認してください。'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (draft: Skill) => {
    if (!window.confirm(`下書き「${draft.item}」を削除しますか？`)) return

    setError(null)
    setNotice(null)
    try {
      await deleteSkillDraft(draft.id)
      if (editingId === draft.id) resetForm()
      await loadDrafts()
    } catch {
      setError('下書きの削除に失敗しました。')
    }
  }

  const handleReset = async () => {
    if (!window.confirm('公開中のスキル内容で、自分の下書きを上書きしますか？')) return

    setSaving(true)
    setError(null)
    setNotice(null)
    try {
      const data = await resetSkillDrafts()
      applyPayload(data)
      resetForm()
      setNotice('公開内容を下書きへ読み込みました。')
    } catch {
      setError('下書きのリセットに失敗しました。')
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!window.confirm('この下書きを公開スキルに反映しますか？閲覧者に見える内容が変わります。')) {
      return
    }

    setSaving(true)
    setError(null)
    setNotice(null)
    try {
      await publishSkillDrafts()
      setNotice('公開スキルへ反映しました。')
    } catch {
      setError('公開に失敗しました。オーナー権限があるか確認してください。')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 1.5, sm: 2 }, py: 2 }}>
      <Typography component="h1" variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
        スキル管理
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 2 }}>
        編集内容はあなたの下書きです。公開ページ（/skills）へ反映できるのはオーナーのみです。
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => void handleReset()}
          disabled={saving || loading}
          sx={{ textTransform: 'none' }}
        >
          公開内容を下書きへ読み込む
        </Button>
        {canPublish && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => void handlePublish()}
            disabled={saving || loading}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            下書きを公開する
          </Button>
        )}
      </Stack>

      {!canPublish && (
        <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: '0.9rem' }}>
          このアカウントは公開権限がありません。下書きの試用のみ可能です。
        </Typography>
      )}

      <Paper
        component="form"
        onSubmit={handleSubmit}
        variant="outlined"
        sx={{ p: 2, mb: 3 }}
      >
        <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
          {editingId === null ? '新規追加（下書き）' : `編集中（下書き ID: ${editingId}）`}
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
      {notice && (
        <Typography color="success.main" role="status" sx={{ mb: 2 }}>
          {notice}
        </Typography>
      )}

      <Divider sx={{ mb: 2 }} />

      <Typography component="h2" variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
        下書き一覧
      </Typography>

      {loading ? (
        <Typography color="text.secondary">読み込み中…</Typography>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label="スキル下書き一覧">
            <TableHead>
              <TableRow>
                <TableCell>カテゴリ</TableCell>
                <TableCell>項目</TableCell>
                <TableCell align="right">年数</TableCell>
                <TableCell align="right">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drafts.map((draft) => (
                <TableRow key={draft.id} selected={editingId === draft.id}>
                  <TableCell>{categoryLabel(draft.category)}</TableCell>
                  <TableCell>{draft.item}</TableCell>
                  <TableCell align="right">{draft.term}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button
                        size="small"
                        onClick={() => startEdit(draft)}
                        sx={{ textTransform: 'none' }}
                      >
                        編集
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => void handleDelete(draft)}
                        sx={{ textTransform: 'none' }}
                      >
                        削除
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {drafts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography color="text.secondary">下書きがありません。</Typography>
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
