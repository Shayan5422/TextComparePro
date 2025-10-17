# Text Comparison Tool - Design Guidelines

## Design Approach: Modern Utility System

**Selected Approach**: Clean, productivity-focused design inspired by developer tools like VS Code, GitHub Diff, and Linear's interface aesthetics combined with Material Design principles for information density.

**Justification**: Text comparison is a utility-focused tool requiring clarity, precision, and efficient information presentation. The design prioritizes readability, clear visual differentiation, and intuitive controls.

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary** (default):
- Background: 220 15% 12%
- Surface: 220 15% 16%
- Surface Elevated: 220 15% 20%
- Border: 220 10% 28%
- Text Primary: 0 0% 95%
- Text Secondary: 220 8% 65%

**Semantic Colors**:
- Match/Success: 142 71% 45% (green for matching text)
- Addition: 142 76% 36% (darker green for added words)
- Deletion: 0 72% 51% (red for removed text)
- Modification: 45 93% 47% (amber for modified text)
- Primary Accent: 217 91% 60% (blue for CTAs and interactive elements)

**Light Mode**:
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Surface Elevated: 220 20% 97%
- Border: 220 13% 88%
- Text Primary: 220 15% 12%
- Text Secondary: 220 9% 46%

### B. Typography

**Font Stack**:
- Primary: 'Inter' (Google Fonts) - UI text, labels, buttons
- Monospace: 'JetBrains Mono' (Google Fonts) - Text input areas, diff display

**Hierarchy**:
- H1 (Page Title): 2rem (32px), font-weight 700
- H2 (Section Headers): 1.5rem (24px), font-weight 600
- H3 (Stats Labels): 1.125rem (18px), font-weight 600
- Body: 1rem (16px), font-weight 400
- Small/Captions: 0.875rem (14px), font-weight 400
- Monospace Text: 0.9375rem (15px), font-weight 400, line-height 1.6

### C. Layout System

**Spacing Scale**: Use Tailwind units of 2, 3, 4, 6, 8, 12, 16
- Component padding: p-4 to p-6
- Section gaps: gap-6 to gap-8
- Micro-spacing: space-y-2, space-y-3
- Large sections: py-12 to py-16

**Grid Structure**:
- Main container: max-w-7xl mx-auto px-4
- Dual-pane comparison: grid grid-cols-1 lg:grid-cols-2 gap-6
- Stats dashboard: grid grid-cols-2 md:grid-cols-4 gap-4

### D. Component Library

**Core UI Elements**:

1. **Text Input Areas**
   - Auto-expanding textareas with monospace font
   - Rounded corners (rounded-lg)
   - Subtle border with focus state (ring-2 ring-primary)
   - Min-height: 300px, resize-y enabled
   - Clear labels with character/word counts

2. **Control Panel**
   - Horizontal button group with toggle switches
   - Icons from Heroicons (outline style)
   - Toggle states with smooth color transitions
   - Grouped by functionality (Comparison Mode | Display Options)

3. **Statistics Dashboard**
   - Card-based layout with icon + label + value
   - Real-time updating numbers
   - Percentage bars for similarity metrics
   - Grid layout: 4 columns on desktop, 2 on tablet, 1 on mobile

4. **Diff Display**
   - Inline word/character highlighting
   - Color-coded spans with subtle background colors
   - Line-by-line comparison view option
   - Tooltip on hover showing diff type
   - Monospace font for precise alignment

5. **Navigation/Header**
   - Sticky header with tool title and theme toggle
   - Minimal design: logo/title on left, controls on right
   - Height: h-16
   - Backdrop blur effect (backdrop-blur-sm)

6. **Action Buttons**
   - Primary: Solid blue background (bg-primary)
   - Secondary: Outline style (border-2)
   - Icon buttons: Rounded-full with hover scale
   - Size variants: px-4 py-2 (small), px-6 py-3 (medium)

7. **Toggle Switches**
   - Custom styled with smooth transitions
   - Clear on/off states with color change
   - Label positioned left or right as appropriate
   - Icons to indicate state (check/x)

**Forms**:
- Input fields with floating labels
- Focus states with ring effect
- Error states in red with helper text
- Success states in green

**Data Display**:
- Comparison results in card containers
- Side-by-side or stacked views (responsive)
- Highlighted differences with legend
- Export options in dropdown menu

**Overlays**:
- Modal for settings/preferences (if needed)
- Toast notifications for actions (text copied, comparison complete)
- Tooltips for toggle explanations

### E. Interactions & Animations

**Minimal Animation Philosophy**:
- Button hover: Subtle scale (scale-105) and brightness increase
- Toggle switches: Smooth slide transition (300ms)
- Stat updates: Gentle fade-in for new values
- Diff highlighting: Instant, no animation (clarity over flair)
- Theme toggle: Fade transition (200ms)

**NO animations for**:
- Text area updates
- Diff calculations
- Scroll-triggered effects

---

## Layout Architecture

**Three-Section Structure**:

1. **Header** (sticky, h-16)
   - Tool branding/title
   - Theme toggle
   - Optional settings icon

2. **Main Workspace** (flex-1, overflow-auto)
   - Control panel (toggles and options) - horizontal layout
   - Dual text input panes - side-by-side on desktop, stacked on mobile
   - Action buttons (Compare, Reset, Swap) - centered below inputs
   - Statistics dashboard - 4-column grid
   - Diff results display - full width, scrollable

3. **Footer** (minimal)
   - Brief attribution or links
   - py-6

**Responsive Breakpoints**:
- Mobile: Single column, stacked inputs
- Tablet (md): Two-column stats, stacked inputs
- Desktop (lg): Side-by-side inputs, 4-column stats

---

## Images

**No hero image required** - This is a utility tool, not a marketing page. Focus remains on functionality and workspace clarity. All visual interest comes from the UI components, diff highlighting, and clean typography.