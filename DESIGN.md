# Design System — Developer Portfolio

Inspired by Vercel. Black and white precision, Geist font.

Strong fit for developer platforms, monochrome precision designs, and infrastructure marketing.

---

## 1. Visual Theme & Atmosphere

- **Mood**: Precision, speed, developer-focused clarity
- **Density**: Medium — generous whitespace with tight content areas
- **Philosophy**: Black and white as the foundation, color only for workflow states and syntax highlighting. Every pixel earns its place.

---

## 2. Color Palette

| Token | Hex | Role |
|-------|-----|------|
| Vercel Black | `#171717` | Primary text, headings |
| Pure White | `#ffffff` | Page background |
| True Black | `#000000` | Console text, dark mode background |
| Develop Blue | `#0a72ef` | Primary accent, links, focus states |
| Preview Pink | `#de1d8d` | Secondary accent, highlights |
| Ship Red | `#ff5b4f` | Error states, destructive actions |
| Gray 600 | `#4d4d4d` | Secondary text |
| Gray 500 | `#666666` | Tertiary text |
| Gray 400 | `#808080` | Placeholders |
| Gray 100 | `#ebebeb` | Borders, dividers |
| Gray 50 | `#fafafa` | Subtle surface tint, card backgrounds |
| Link Blue | `#0072f5` | Interactive links |
| Badge Bg | `#ebf5ff` | Pill badge surface |

---

## 3. Typography

**Font Families**:
- Sans: `Geist, system-ui, -apple-system, sans-serif`
- Mono: `Geist Mono, ui-monospace, monospace`

**Scale**:

| Name | Size | Weight | Line Height | Letter Spacing | Font |
|------|------|--------|-------------|----------------|------|
| Display Hero | 48px | 600 | 1.00 | -2.4px | Geist |
| Section Heading | 40px | 600 | 1.20 | -2.4px | Geist |
| Sub-heading | 32px | 600 | 1.25 | -1.28px | Geist |
| Card Title | 24px | 600 | 1.33 | -0.96px | Geist |
| Body Large | 20px | 400 | 1.80 | normal | Geist |
| Body Medium | 16px | 500 | 1.50 | normal | Geist |
| Body Semibold | 16px | 600 | 1.50 | -0.32px | Geist |
| Button / Link | 14px | 500 | 1.43 | normal | Geist |
| Caption | 12px | 500 | 1.33 | normal | Geist |
| Mono Body | 16px | 400 | 1.50 | normal | Geist Mono |
| Mono Label | 12px | 500 | 1.33 | uppercase | Geist Mono |

---

## 4. Component Stylings

### Buttons

**Primary Dark**: `bg-[#171717] text-white rounded-md px-4 py-2.5 text-sm font-medium hover:bg-[#000]`

**Ghost / Shadow**: `bg-white text-[#171717] border border-[#ebebeb] rounded-md px-4 py-2.5 text-sm font-medium hover:border-[#171717]`

**Pill Badge**: `bg-[#ebf5ff] text-[#0a72ef] rounded-full px-3 py-1 text-xs font-medium`

### Cards

**Default Card**: `bg-white border border-[#ebebeb] rounded-lg p-6`

**Elevated Card**: `bg-white border border-[#ebebeb] rounded-lg p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]`

**Hover State**: `hover:border-[#171717] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-all duration-200`

### Navigation

**Header**: `h-14 flex items-center justify-between border-b border-[#ebebeb] bg-white/80 backdrop-blur`

**Nav Link**: `text-sm font-medium text-[#666] hover:text-[#171717] transition-colors`

---

## 5. Layout Principles

- **Max width**: `max-w-6xl` (72rem / 1152px)
- **Page padding**: `px-6` (24px)
- **Section spacing**: `py-16` (64px) between major sections
- **Grid**: 12-column implicit grid, content centered
- **Card grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-6`

---

## 6. Depth & Elevation

| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Flat surfaces | none |
| 1 | Ring-as-border | `inset 0 0 0 1px #ebebeb` |
| 2 | Cards | `0 2px 8px rgba(0,0,0,0.08)` |
| 3 | Elevated cards | `0 4px 16px rgba(0,0,0,0.12)` |
| Focus | Accessibility | `0 0 0 2px hsl(212,100%,48%)` |

---

## 7. Do's and Don'ts

- **Do** use black and white as the primary palette
- **Do** use Geist font for all text
- **Do** use color only for interactive states and workflow accents
- **Don't** use gradients for backgrounds
- **Don't** use more than one accent color per component
- **Don't** use border-radius larger than 8px for cards

---

## 8. Responsive Behavior

| Breakpoint | Width | Changes |
|------------|-------|---------|
| sm | 640px | 2-column grids activate |
| md | 768px | Navigation fully visible |
| lg | 1024px | 3-column grids, larger typography |
| xl | 1280px | Max-width container centered |

---

## 9. Agent Prompt Guide

**Quick reference for AI agents:**

- Background: `#ffffff`
- Text: `#171717`
- Secondary text: `#666666`
- Accent: `#0a72ef`
- Border: `#ebebeb`
- Card surface: `#fafafa`
- Font: Geist
- Mono font: Geist Mono
- Border radius (cards): 8px
- Border radius (buttons): 6px
- Border radius (pills): 9999px
