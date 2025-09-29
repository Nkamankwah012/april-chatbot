# AirCare Widget Deployment Guide

Your Lovable app: **april-chatbot.lovable.app**

## Important: Widget File is NOT Auto-Deployed

⚠️ **Lovable's standard publish does NOT build the widget file.** You need to build it separately.

## Step 1: Build the Widget

Run this command in your project directory to build the widget:

```bash
npm run build -- --config vite.widget.config.ts
```

This creates a `dist/widget.iife.js` file (~500KB) that contains your entire widget bundled with all dependencies.

## Step 2: Get Your Widget File

After building, you'll find the widget file at: `dist/widget.iife.js`

This single file contains everything needed for the widget to work.

## Step 3: Host the Widget File

⚠️ **The widget file must be hosted separately** - it's NOT included in Lovable's standard deployment.

### Hosting Options:

1. **Upload to your web hosting** (recommended)
   - Upload `dist/widget.iife.js` to your server
   - Place it at `/assets/widget.iife.js` or `/scripts/widget.iife.js`
   - Reference: `https://yourdomain.com/assets/widget.iife.js`

2. **Use a CDN service** (e.g., Cloudflare, AWS CloudFront)
   - Upload the file to your CDN
   - Use the CDN URL in your integration code

3. **GitHub Pages or similar** (for testing)
1. Upload `dist/widget.iife.js` to your web server
2. Place it in an accessible directory (e.g., `/assets/` or `/scripts/`)
3. Use your own URL in the integration code

## Step 4: Add to Your Website

### Method 1: Auto-Initialize (Recommended)

Add this script tag to your website's HTML (before closing `</body>` tag):

```html
<!-- Replace YOUR-WIDGET-URL with your actual hosted widget URL -->
<script 
  src="YOUR-WIDGET-URL/widget.iife.js"
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="home"
  data-theme="light"
></script>
```

### Method 2: Manual Control with JavaScript

```html
<!-- Load the widget script -->
<script src="YOUR-WIDGET-URL/widget.iife.js"></script>

<script>
// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  window.AirCareWidget.init({
    autoOpen: true,
    initialTab: 'home',
    theme: 'light'
  });
});
</script>
```

## Step 5: Test Your Integration

Open your website and verify:
1. ✅ Widget appears in bottom-right corner
2. ✅ Clicking buttons opens the appropriate tabs
3. ✅ Chat functionality works
4. ✅ FAQ section displays correctly
5. ✅ Widget is responsive on mobile devices

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
  src="https://april-chatbot.lovable.app/widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="home"
></script>
```

### Auto-open to Chat (Direct support)
```html
<script 
  src="https://april-chatbot.lovable.app/widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="chat"
></script>
```

### Auto-open to FAQ (Self-service)
```html
<script 
  src="https://april-chatbot.lovable.app/widget.iife.js" 
  data-aircare-widget="true"
  data-auto-open="true"
  data-initial-tab="faq"
></script>
```

### Closed by Default (Click to open)
```html
<script 
  src="https://april-chatbot.lovable.app/widget.iife.js" 
  data-aircare-widget="true"
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

## Advanced: Custom Styling

The widget uses your branding automatically, but you can override styles:

```html
<style>
  /* Customize widget position */
  #aircare-widget {
    bottom: 20px !important;
    right: 20px !important;
  }
</style>
```

## Troubleshooting

### Widget doesn't appear
- Check browser console for errors
- Verify script URL is correct and accessible
- Ensure no ad blockers are interfering

### Chat doesn't work
- Verify Botpress configuration is correct
- Check network tab for failed API requests

### Widget looks wrong
- Check for CSS conflicts with your site
- Try adding the widget to a test page first

## File Information

**Widget File:** `dist/widget.iife.js`
- Size: ~500KB (includes React, animations, and all dependencies)
- Self-contained: No external dependencies required
- Cross-browser compatible: Works in all modern browsers

## Support

For issues or questions about the widget:
1. Check console logs for errors
2. Test on the demo page: `public/widget-demo.html`
3. Verify the build completed successfully