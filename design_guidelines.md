# Design Guidelines: AI Phone Agent ROI Calculator

## Design Approach: Professional Design System

**Selected Framework**: Material Design principles adapted for B2B sales tooling
**Rationale**: This is a utility-focused, data-dense sales demonstration tool requiring clarity, trust, and professionalism over visual flair. The calculator must convey credibility and precision to service-based business decision-makers during high-stakes demo calls.

---

## Typography System

**Font Stack**: 
- Primary: Inter or Roboto (via Google Fonts)
- Monospace: JetBrains Mono for numerical outputs

**Hierarchy**:
- Hero Numbers (ROI %, Net Profit): text-6xl md:text-7xl, font-bold, tabular-nums
- Section Titles: text-3xl md:text-4xl, font-semibold
- Subsection Headers: text-xl md:text-2xl, font-medium
- Input Labels: text-sm, font-medium, uppercase, tracking-wide
- Body/Subtext: text-base, font-normal
- Helper Text: text-sm, opacity-70
- Output Metrics: text-2xl md:text-3xl, font-semibold, tabular-nums

---

## Layout & Spacing

**Container Structure**:
- Maximum width: max-w-7xl for entire application
- Section padding: py-16 md:py-24
- Inner content: max-w-6xl mx-auto px-6

**Spacing Primitives** (Tailwind):
- Core units: 4, 6, 8, 12, 16
- Micro spacing (within components): space-y-4, gap-4
- Section spacing: space-y-8, gap-8
- Major section breaks: space-y-12

**Grid System**:
- ROI Calculator: Two-column grid (lg:grid-cols-2 gap-12)
- Left column: Input forms (min-width 400px)
- Right column: Metrics display, sticky positioning (lg:sticky lg:top-8)
- Mobile: Single column stack (grid-cols-1)

---

## Component Library

### Navigation/Header
- Simple top bar with logo/title, minimal height (h-16)
- Optional "Back to [Your Company]" link aligned left
- Keep lightweight to maximize calculator real estate

### Section 1: Missed Revenue Calculator
**Layout**: Single column, centered, max-w-4xl

**Banner Component**:
- "Are You Losing Revenue..." attention banner
- Prominent placement below header
- Icon (exclamation-circle) + bold text
- Padding: p-6, rounded corners (rounded-lg)

**Industry Selector**:
- Dropdown positioned prominently after banner
- Full-width on mobile, max-w-md on desktop
- Icon: building or briefcase

**Input Container**:
- 2-column grid on desktop (md:grid-cols-2 gap-6)
- Single column mobile
- Each input has icon, label (uppercase), and input field grouped vertically

**Dynamic Benefits Block**:
- Renders conditionally based on industry selection
- Card-style container with subtle border
- Bulleted list or icon + text rows
- Padding: p-6, space-y-3

**Output "Your Missed Revenue"**:
- Large card container (p-8)
- Metrics in vertical stack or 3-column grid
- Each metric: Label (small caps) + Large number display
- "Recovery Potential" highlighted with strongest visual weight

### Section 2: ROI Calculator
**Header**: "Calculate Your ROI" + descriptive subheader

**Two-Column Layout**:

*Left Column (Inputs)*:
- Vertical stack of input groups (space-y-8)
- Each input group: Label + helper text + input field
- Input fields: Large touch targets (h-14), clear focus states
- Currency symbol prefix integrated into input

*Right Column (Outputs)*:
- Action buttons at top (Download PDF, Save Calculation)
- Buttons: Horizontal layout on desktop, subtle styling
- Hero Metrics Container:
  - Net Annual Profit (largest, most prominent)
  - ROI Percentage (secondary hero)
  - Side-by-side or stacked depending on values
- Detailed Breakdown:
  - Payback Period
  - 3-Year Projection
  - Visual hierarchy through sizing/weight variations

### Input Components
**Standard Pattern for All Inputs**:
- Label: Uppercase, small font, medium weight, spacing below
- Helper/Subtext: Regular case, smaller font, subtle (below input)
- Input field: Large, clear borders, prominent focus states
- Icons: Positioned left inside input field (phone, dollar-sign, etc.)
- Padding: px-4 py-3.5

**Currency Inputs**: Dollar symbol prefix, right-aligned numbers
**Number Inputs**: Left-aligned, step controls optional

### Output/Metric Components
**Hero Metrics**:
- Extra large numbers (text-6xl or larger)
- Tabular numerals for alignment
- Label above in small caps
- Optional prefix/suffix (%, $, "months")

**Standard Metrics**:
- Card-style containers with subtle borders
- Number + label pairing
- Spacing: p-6, rounded-lg

### Buttons
- Primary CTA: Solid, medium size (px-6 py-3)
- Secondary: Outlined or ghost style
- Icon buttons: Consistent sizing (w-10 h-10)
- All buttons: rounded-lg, medium font-weight

---

## Interaction & States

**Form Interactions**:
- Real-time calculation on input change (no submit button needed)
- Smooth transitions for number updates (transition-all duration-300)
- Loading states for calculations if needed (subtle spinner)

**Data Binding**:
- Recovery Potential from Section 1 auto-populates Additional Annual Revenue in Section 2
- Visual indicator showing this connection (subtle animation or note)

**Focus States**: 
- Clear ring treatment on all inputs (ring-2 ring-offset-2)
- Keyboard navigation fully supported

**Responsive Behavior**:
- Sticky right column on desktop (lg:sticky lg:top-8)
- Smooth column collapse to single stack on mobile
- Touch-optimized input sizes on all devices

---

## Content Strategy

**Problem-Agitation-Solution Flow**:
- Section 1 establishes pain (missed revenue)
- Calculations agitate the problem (quantified loss)
- Section 2 presents solution (ROI of AI agent)
- Visual hierarchy supports this narrative progression

**Persuasive Elements**:
- "80% Recovery Potential" badge/highlight
- Industry-specific benefits dynamically rendered
- Large positive numbers emphasized visually
- Payback period shown in months for tangibility

---

## Accessibility

- All inputs have associated labels
- Color not sole indicator of meaning
- Focus states clearly visible
- Sufficient contrast ratios throughout
- Screen reader friendly metric announcements
- Keyboard navigation for all interactions

---

## Technical Notes

- Use Font Awesome or Heroicons for icons (CDN)
- Number formatting libraries for currency display (e.g., Intl.NumberFormat)
- Form validation: Real-time, non-blocking, helpful error messages
- Calculations: Precise decimal handling, no rounding errors visible to user