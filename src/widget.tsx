import { createRoot } from "react-dom/client";
import { AirCareWidget } from "@/components/AirCareWidget";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

// Widget configuration interface
interface AirCareWidgetConfig {
  containerId?: string;
  botId?: string;
  botUrl?: string;
  theme?: 'light' | 'dark';
  width?: string;
  height?: string;
}

// Global widget class
class AirCareEmbeddableWidget {
  private queryClient: QueryClient;
  private root: any = null;

  constructor() {
    this.queryClient = new QueryClient();
  }

  init(config: AirCareWidgetConfig = {}) {
    const {
      containerId = 'aircare-widget',
      width = '400px',
      height = '750px',
      theme = 'light'
    } = config;

    // Find or create container
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    // Apply widget styles to container
    container.style.width = width;
    container.style.height = height;
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    container.style.zIndex = '9999';
    container.style.borderRadius = '12px';
    container.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    container.style.overflow = 'hidden';

    // Set theme
    container.className = theme === 'dark' ? 'dark' : '';

    // Create React root and render
    this.root = createRoot(container);
    this.render();
  }

  private render() {
    if (!this.root) return;

    this.root.render(
      <QueryClientProvider client={this.queryClient}>
        <TooltipProvider>
          <div className="bg-background text-foreground">
            <AirCareWidget />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  // Show/hide widget
  show() {
    const container = document.getElementById('aircare-widget');
    if (container) {
      container.style.display = 'block';
    }
  }

  hide() {
    const container = document.getElementById('aircare-widget');
    if (container) {
      container.style.display = 'none';
    }
  }
}

// Create global instance
const airCareWidget = new AirCareEmbeddableWidget();

// Expose to global scope
declare global {
  interface Window {
    AirCareWidget: typeof airCareWidget;
  }
}

window.AirCareWidget = airCareWidget;

// Auto-initialize if script has data attributes
document.addEventListener('DOMContentLoaded', () => {
  const script = document.querySelector('script[data-aircare-widget]') as HTMLScriptElement;
  if (script) {
    const config: AirCareWidgetConfig = {
      containerId: script.dataset.containerId,
      botId: script.dataset.botId,
      botUrl: script.dataset.botUrl,
      theme: (script.dataset.theme as 'light' | 'dark') || 'light',
      width: script.dataset.width,
      height: script.dataset.height,
    };
    airCareWidget.init(config);
  }
});

export default airCareWidget;