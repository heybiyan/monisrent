# Workspace Builder — Project Docs Index

Kumpulan dokumen ini disiapkan sebagai **project context untuk AI coding agent** (Codex, Claude Code, atau setara). Target: MVP deployable dalam 8 jam kerja.

## Urutan baca (wajib, sebelum eksekusi apapun)

1. `01-design.md` — visual system: warna, tipografi, komponen, referensi UI
2. `02-data-model.md` — struktur data desk/produk/slot/cart
3. `03-components.md` — inventory komponen React yang perlu dibangun
4. `04-dev-guide.md` — tech stack, scope MVP 8 jam, struktur folder, langkah deploy Vercel
5. `05-agent-prompts.md` — prompt eksekusi per milestone (jalankan berurutan)

## Sumber referensi
- `design.md` / `prd.md` (dokumen awal) — objective & required states produk
- Screenshot referensi UI monis.rent (PDP asli) — dipakai untuk selaraskan gaya komponen (badge, button, card, price display) di `01-design.md`

## Prinsip kerja untuk agent
- Ikuti scope MVP di `04-dev-guide.md` secara ketat — jangan menambah fitur di luar milestone yang sedang dikerjakan.
- Setiap milestone di `05-agent-prompts.md` harus menghasilkan build yang jalan (`npm run dev` tanpa error) sebelum lanjut ke milestone berikutnya.
- Gunakan data dummy/JSON statis (lihat `02-data-model.md`) — tidak ada backend/API real di scope 8 jam ini.
