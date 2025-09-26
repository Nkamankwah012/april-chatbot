# AirCare Widget Deployment Guide

## Step 1: Build the Widget

Run this command to build the widget for deployment:

```bash
npm run build -- --config vite.widget.config.ts
```

This creates a `dist/widget.iife.js` file that contains your entire widget.

## Step 2: Deploy to Your Website

### Method 1: Auto-Initialize (Recommended)

Add this script tag to your website where you want the widget to appear:

```html
<!-- Auto-opens to home section when users land on your site -->
<script 
  src="https://your-domain.com/widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="home"
  data-theme="light"
></script>
```

### Method 2: Manual Control

```html
<!-- Load the widget script -->
<script src="https://your-domain.com/widget.iife.js"></script>

<script>
// Initialize when page loads and auto-open to home
document.addEventListener('DOMContentLoaded', function() {
  window.AirCareWidget.init({
    autoOpen: true,
    initialTab: 'home',
    theme: 'light'
  });
});
</script>
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoOpen` | boolean | false | Auto-opens widget when page loads |
| `initialTab` | string | 'home' | Which tab to show first ('home', 'chat', 'faq') |
| `theme` | string | 'light' | Widget theme ('light' or 'dark') |
| `containerId` | string | 'aircare-widget' | Custom container ID |

## Different Auto-Open Scenarios

### Auto-open to Home (Welcome users)
```html
<script 
  src="widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="home"
></script>
```

### Auto-open to Chat (Direct support)
```html
<script 
  src="widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="chat"
></script>
```

### Auto-open to FAQ (Self-service)
```html
<script 
  src="widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="faq"
></script>
```

## Manual Control Methods

After initialization, you can control the widget programmatically:

```javascript
// Show/hide the widget
window.AirCareWidget.show();
window.AirCareWidget.hide();

// Destroy the widget
window.AirCareWidget.destroy();

// Re-initialize with different settings
window.AirCareWidget.init({
  autoOpen: false,
  initialTab: 'chat'
});
```

## File Upload Requirements

Upload these files to your web server:
1. `dist/widget.iife.js` - The main widget file
2. Any CSS/font assets (if referenced)

The widget is completely self-contained and includes all necessary styles and dependencies.