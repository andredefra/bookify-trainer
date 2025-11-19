import { useState, useEffect } from "react";
import { Layout } from "react-grid-layout";
import { getDefaultLayout, getDefaultEnabledWidgets } from "@/components/trainer/dashboard/tabs/overview/widgetConfig";

const STORAGE_KEY_LAYOUT = "trainer-dashboard-layout-v4"; // v4: core widgets 1×2, Expiration sotto la 1a riga
const STORAGE_KEY_ENABLED = "trainer-dashboard-enabled-widgets";

export function useWidgetLayout() {
  const [layout, setLayout] = useState<Layout[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LAYOUT);
    return saved ? JSON.parse(saved) : getDefaultLayout();
  });

  const [enabledWidgets, setEnabledWidgets] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ENABLED);
    return saved ? JSON.parse(saved) : getDefaultEnabledWidgets();
  });

  const saveLayout = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem(STORAGE_KEY_LAYOUT, JSON.stringify(newLayout));
  };

  const toggleWidget = (widgetId: string) => {
    const newEnabled = enabledWidgets.includes(widgetId)
      ? enabledWidgets.filter(id => id !== widgetId)
      : [...enabledWidgets, widgetId];
    
    setEnabledWidgets(newEnabled);
    localStorage.setItem(STORAGE_KEY_ENABLED, JSON.stringify(newEnabled));
  };

  const resetToDefault = () => {
    const defaultLayout = getDefaultLayout();
    const defaultEnabled = getDefaultEnabledWidgets();
    
    setLayout(defaultLayout);
    setEnabledWidgets(defaultEnabled);
    
    localStorage.setItem(STORAGE_KEY_LAYOUT, JSON.stringify(defaultLayout));
    localStorage.setItem(STORAGE_KEY_ENABLED, JSON.stringify(defaultEnabled));
  };

  return {
    layout,
    enabledWidgets,
    saveLayout,
    toggleWidget,
    resetToDefault
  };
}
