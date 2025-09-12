# SCSS Architecture Documentation

This project uses a modular SCSS architecture inspired by Bootstrap, organizing styles into logical, maintainable components.

## Directory Structure

```
scss/
├── main.scss                 # Main entry point - imports all modules
├── variables.scss            # Global variables (colors, spacing, etc.)
├── mixins.scss               # Reusable SCSS mixins and functions
├── animations.scss           # Keyframe animations
├── base.scss                 # Base styles and resets
├── components/               # Reusable UI components
│   ├── _index.scss          # Components index file
│   ├── _buttons.scss        # Button components
│   ├── _cards.scss          # Card components
│   ├── _code.scss           # Code editor and preview components
│   ├── _quiz.scss           # Quiz-related components
│   ├── _info.scss           # Info box components
│   ├── _browser-simulator.scss # Browser simulator components
│   └── _layout.scss         # Layout components (content sections, etc.)
├── utilities/               # Utility classes
│   ├── _index.scss          # Utilities index file
│   └── _utilities.scss      # Utility classes (spacing, colors, etc.)
├── helpers/                 # Helper classes
│   ├── _index.scss          # Helpers index file
│   └── _helpers.scss        # Helper classes (clearfix, screen readers, etc.)
├── topics/                 # Topic-specific styles (organized by category)
│   ├── _index.scss          # Main topics index
│   ├── html/                # HTML-related topics
│   │   ├── _index.scss      # HTML topics index
│   │   └── [html-topics]    # HTML topic files
│   ├── css/                 # CSS-related topics
│   │   ├── _index.scss      # CSS topics index
│   │   └── [css-topics]     # CSS topic files
│   ├── javascript/          # JavaScript-related topics
│   │   ├── _index.scss      # JavaScript topics index
│   │   └── [js-topics]      # JavaScript topic files
│   ├── frameworks/          # Framework-related topics
│   │   ├── _index.scss      # Frameworks topics index
│   │   └── [framework-topics] # Framework topic files
│   └── other/               # Other/miscellaneous topics
│       ├── _index.scss      # Other topics index
│       └── [other-topics]   # Other topic files
```

## How to Use

### 1. Using Base Components

All base components are automatically available through the main import. In your topic files, extend base classes:

```scss
.my-custom-section {
  @extend .content-section-base;

  // Add your custom styles here
  background: linear-gradient(45deg, #f0f0f0, #ffffff);
}
```

### 2. Available Base Components

#### Layout Components

- `.content-section-base` - Basic content section with padding, background, and typography
- `.interactive-element-base` - Interactive elements with hover effects

#### Button Components

- `.btn-base` - Base button styles
- `.btn-primary` - Primary button (extends .btn-base)
- `.btn-success` - Success button (extends .btn-base)
- `.btn-info` - Info button (extends .btn-base)

#### Card Components

- `.card-base` - Basic card with shadow and hover effects

#### Code Components

- `.code-editor-container-base` - Container for code editors
- `.code-editor-base` - Code editor styling
- `.output-preview-base` - Output preview styling

#### Quiz Components

- `.quiz-container-base` - Quiz container
- `.quiz-option-base` - Quiz option buttons

#### Info Components

- `.info-box-base` - Info boxes with colored left borders
  - `.info-box-base.info`
  - `.info-box-base.success`
  - `.info-box-base.warning`
  - `.info-box-base.danger`

#### Browser Simulator

- `.browser-simulator-base` - Browser simulator container
- `.browser-header-base` - Browser header
- `.browser-content-base` - Browser content area

### 3. Using Utilities

Utility classes are available for common styling needs:

```html
<div class="text-center mb-4 p-3 bg-light rounded">
  <h3 class="text-primary">Centered Content</h3>
</div>
```

### 4. Using Helpers

Helper classes provide additional functionality:

```html
<div class="container">
  <div class="grid grid-3">
    <div class="card-base">Item 1</div>
    <div class="card-base">Item 2</div>
    <div class="card-base">Item 3</div>
  </div>
</div>
```

## Best Practices

### 1. DRY Principle

- Always extend base classes instead of duplicating styles
- Use `@extend` for inheritance from base components
- Only create new classes when the styling is truly unique

### 2. File Organization

- Keep topic-specific styles in their respective files
- Use the components directory for reusable styles
- Add new components to the appropriate component file

### 3. Responsive Design

- All components include responsive breakpoints
- Use the provided mixins for consistent breakpoints
- Test components across different screen sizes

### 4. Customization

- Override base component variables in `variables.scss`
- Add custom components following the established patterns
- Document any new components in this README

## Topic Categories

### HTML Topics (6 files)

- HTML Introduction, Layout Elements, Audio/Video
- Lists/Links/Images, Tables/Forms, Semantic HTML

### CSS Topics (7 files)

- CSS Basics, Box Model, Frameworks, Preprocessors
- Flexbox/Grid, Responsive Design, Typography

### JavaScript Topics (12 files)

- JS Introduction, Embedding, Variables, Operators
- Functions/Scope, DOM, ES6 Features, jQuery, AJAX
- JSON, Regular Expressions

### Framework Topics (2 files)

- Framework Selection, Frameworks Overview

### Other Topics (10 files)

- Client-Server, Web Browsers/Servers, DNS Hierarchy
- SEO, UI/UX Design, Accessibility

## Adding New Components

1. Create a new file in the `components/` directory
2. Add the component styles following the established patterns
3. Update `components/_index.scss` to forward the new component
4. Document the new component in this README

## Maintenance

- Regularly review and refactor duplicate styles
- Keep component files focused on single responsibilities
- Update this documentation when adding new components

## Adding New Topics

1. **Choose the appropriate category** based on the topic's technology focus:

   - `topics/html/` for HTML-related topics
   - `topics/css/` for CSS-related topics
   - `topics/javascript/` for JavaScript-related topics
   - `topics/frameworks/` for framework-related topics
   - `topics/other/` for miscellaneous topics

2. **Create the topic file** in the corresponding category directory

3. **Update the category index** to forward the new topic file:

   ```scss
   @forward "../new-topic-name";
   ```

4. **Test the import** to ensure everything compiles correctly

5. **Update documentation** in both `topics/README.md` and this main README
