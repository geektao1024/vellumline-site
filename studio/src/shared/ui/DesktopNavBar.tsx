import {
  LocationIcon,
  ThemeIcon,
  LayoutIcon,
  LayersIcon,
  MarkersIcon,
  RouteIcon,
  StyleIcon,
} from "./Icons";
import type { MobileTab } from "./MobileNavBar";

const tabs: {
  id: MobileTab;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "location", label: "Place", Icon: LocationIcon },
  { id: "theme", label: "Palette", Icon: ThemeIcon },
  { id: "layout", label: "Format", Icon: LayoutIcon },
  { id: "style", label: "Style", Icon: StyleIcon },
  { id: "layers", label: "Layers", Icon: LayersIcon },
  { id: "markers", label: "Markers", Icon: MarkersIcon },
  { id: "routes", label: "Routes", Icon: RouteIcon },
];

interface DesktopNavBarProps {
  activeTab: MobileTab;
  panelOpen: boolean;
  onTabChange: (tab: MobileTab) => void;
}

export default function DesktopNavBar({
  activeTab,
  panelOpen,
  onTabChange,
}: DesktopNavBarProps) {
  return (
    <nav className="desktop-nav-bar" aria-label="Settings sections">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = panelOpen && activeTab === id;
        return (
          <button
            key={id}
            type="button"
            className={`desktop-nav-tab${isActive ? " is-active" : ""}`}
            onClick={() => onTabChange(id)}
            title={isActive ? `Collapse ${label}` : label}
            aria-label={isActive ? `Collapse ${label}` : label}
            aria-expanded={isActive}
            aria-controls="desktop-settings-panel"
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="desktop-nav-icon" />
            <span className="desktop-nav-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
