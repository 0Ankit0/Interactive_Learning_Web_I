# Copilot Instructions for Web Technology I Interactive Course

This is an educational web course project teaching web technologies through interactive lessons, built with vanilla HTML/CSS/JS and organized into units and topics.

## Project Architecture

### Three-Tier Structure

1. **Main Index** (`interactive-course/index.html`) - Course overview dashboard
2. **Unit Pages** (`units/unit[1-7].html`) - Collections of related topics
3. **Topic Pages** (`topics/*.html`) - Individual lessons with interactive content

### Key Directories

- `topics/` - Individual lesson HTML files (35+ topics covering HTML, CSS, JS, etc.)
- `units/` - Unit overview pages linking to related topics
- `dist/css/` - Compiled CSS from SCSS source
- `dist/js/` - JavaScript modules (one per topic + shared utilities)
- `dist/scss/` - SCSS source organized in components, topics, utilities

## Critical Patterns

### SCSS Architecture (Modern @use/@forward)

```scss
// Main entry point: dist/scss/main.scss
@use "variables" as *;
@use "components/index" as *;
@use "topics/index" as *;
```

**Component System**: Shared UI components in `dist/scss/components/` (cards, buttons, quiz, code blocks, etc.) using `_index.scss` files to forward exports.

**Topic-Specific Styling**: Each topic has dedicated SCSS file (e.g., `_css-basics-topic.scss`) for unique interactive elements.

### Naming Conventions

- **Files**: Kebab-case (`evolution-of-web.html`, `js-dom-topic.js`)
- **CSS Classes**: BEM-inspired (`topic-header`, `quiz-container`, `code-playground`)
- **SCSS Partials**: Underscore prefix (`_variables.scss`, `_mixins.scss`)

### Interactive Elements Pattern

Each topic page includes:

- **Breadcrumb navigation** with consistent structure
- **Progress tracking** via JavaScript (`topic.js` shared functionality)
- **Interactive demos** (code playgrounds, live examples)
- **Quiz sections** with shared styling from `components/_quiz.scss`

### JavaScript Organization

- `topic.js` - Shared functionality (progress, quiz engine, scroll tracking)
- `[topic-name]-topic.js` - Topic-specific interactivity
- Each topic JS module handles its own interactive demos and examples

## Development Workflow

### SCSS Compilation

The project uses **automatic SCSS compilation** with Live Sass Compiler:

- **No manual compilation needed** - changes are compiled automatically on save
- Converting old CSS to modular SCSS components using modern `@use/@forward` syntax
- Consolidating duplicate styles into shared classes in `components/_shared-components.scss`
- Topic-specific styles extend shared components using `@extend` directives
- Live compilation ensures instant preview of styling changes

**Key Architecture:**

```scss
// main.scss - Entry point
@use "variables" as *;
@use "components/index" as *; // Shared components
@use "topics/index" as *; // Topic-specific styles

// Topic files use @extend for consistency
.my-component {
  @extend .shared-component;
}
```

### File Organization Logic

- **HTML files** follow course curriculum structure from `course_contents.md`
- **JavaScript** mirrors HTML structure (one JS file per topic)
- **SCSS topics** match topic HTML files for styling isolation

### Adding New Topics

1. Create HTML file in `topics/` following existing template structure
2. Add corresponding JS file in `dist/js/` for interactivity
3. Create SCSS partial in `dist/scss/topics/` for styling
4. Update unit page with new topic link
5. Import new SCSS in `topics/_index.scss`

## Course Content Structure

Based on 7 units covering:

- Unit 1: Web fundamentals, protocols, client-server architecture
- Unit 2: HTML structure, forms, semantic elements
- Unit 3: CSS styling, layout, responsive design
- Unit 4-5: JavaScript basics, DOM manipulation, functions
- Unit 6: Advanced JS (ES6, async, frameworks overview)
- Unit 7: jQuery, AJAX, JSON

Each topic includes theory, interactive examples, and knowledge checks following educational design patterns.

## Key Files to Understand

- `dist/scss/main.scss` - SCSS entry point and architecture
- `dist/js/topic.js` - Shared interactive functionality
- `topics/evolution-of-web.html` - Template example for topic pages
- `course_contents.md` - Curriculum structure and learning objectives

## Key Shared Components (Consolidated)

The project uses consolidated shared components to eliminate duplicate CSS classes:

### Demo Components

- `.interactive-demo` - Main demo container with gradient background
- `.demo-container` - Alternative demo container (existing)
- `.demo-controls` - Control panels within demos
- `.demo-result` - Result display areas
- `.demo-content` - Content areas within demos

### Card Components

- `.method-card`, `.property-card`, `.technique-card` - Feature cards for methods/properties
- `.card-interactive` - Interactive cards with hover effects
- `.card-feature` - Feature showcase cards
- `.card-demo` - Demo content cards

### Interactive Elements

- `.selector-demo` - Element selector demonstrations
- `.content-editor` - Content manipulation editors
- `.style-editor` - Style manipulation editors
- `.attribute-editor` - Attribute manipulation editors

### Layout Grids

- `.method-grid`, `.property-grid`, `.technique-grid` - Responsive card grids
- `.grid-auto-fit` - Auto-fitting grid layouts
- `.grid-two-columns`, `.grid-three-columns` - Fixed column grids

## Pedagogical Structure
