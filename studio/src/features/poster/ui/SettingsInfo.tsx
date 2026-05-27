import { useMemo, useState } from "react";
import type { PosterForm } from "@/features/poster/application/posterReducer";
import { ChevronDownIcon } from "@/shared/ui/Icons";

interface PropertyToggle {
  field: keyof PosterForm;
  group: string;
  label: string;
  checked: boolean;
}

interface SettingsInfoProps {
  location: string;
  theme: string;
  layout: string;
  posterSize: string;
  markers: string;
  coordinates: string;
  toggles?: PropertyToggle[];
  onToggle?: (field: keyof PosterForm, checked: boolean) => void;
}

const toGroupId = (group: string) =>
  `settings-toggle-group-${group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function SettingsInfo({
  location,
  theme,
  layout,
  posterSize,
  markers,
  coordinates,
  toggles = [],
  onToggle,
}: SettingsInfoProps) {
  const [openToggleGroups, setOpenToggleGroups] = useState<Set<string>>(
    () => new Set(["Card", "Map Layers"]),
  );
  const rows = [
    { label: "Location", value: location },
    { label: "Theme", value: theme },
    { label: "Layout", value: layout },
    { label: "Poster Size", value: posterSize },
    { label: "Markers", value: markers },
    { label: "Coordinates", value: coordinates },
  ];
  const groupedToggles = useMemo(
    () =>
      toggles.reduce<Array<{ group: string; items: PropertyToggle[] }>>(
        (groups, toggle) => {
          const existingGroup = groups.find((group) => group.group === toggle.group);
          if (existingGroup) {
            existingGroup.items.push(toggle);
          } else {
            groups.push({ group: toggle.group, items: [toggle] });
          }
          return groups;
        },
        [],
      ),
    [toggles],
  );

  const toggleGroupOpen = (group: string) => {
    setOpenToggleGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const setGroupVisibility = (items: PropertyToggle[], checked: boolean) => {
    items.forEach((item) => {
      if (item.checked !== checked) {
        onToggle?.(item.field, checked);
      }
    });
  };

  return (
    <section className="settings-info-card" aria-label="Current settings">
      <div className="settings-info-header">
        <h3 className="settings-info-title">Properties</h3>
        <span className="settings-info-visibility">Grouped visibility</span>
      </div>
      {groupedToggles.length > 0 ? (
        <div className="settings-toggle-list" aria-label="Visibility controls">
          {groupedToggles.map(({ group, items }) => {
            const isOpen = openToggleGroups.has(group);
            const enabledCount = items.filter((item) => item.checked).length;
            const allEnabled = enabledCount === items.length;
            const groupId = toGroupId(group);
            const headerId = `${groupId}-header`;

            return (
              <section
                key={group}
                className={`settings-toggle-group${isOpen ? " is-open" : ""}`}
              >
                <div className="settings-toggle-group-header">
                  <button
                    type="button"
                    className="settings-toggle-group-disclosure"
                    id={headerId}
                    onClick={() => toggleGroupOpen(group)}
                    aria-expanded={isOpen}
                    aria-controls={groupId}
                  >
                    <span className="settings-toggle-group-title">{group}</span>
                    <span className="settings-toggle-group-count">
                      {enabledCount}/{items.length} on
                    </span>
                    <ChevronDownIcon className="settings-toggle-group-chevron" />
                  </button>
                  <button
                    type="button"
                    className="settings-toggle-group-action"
                    onClick={() => setGroupVisibility(items, !allEnabled)}
                    aria-label={`${allEnabled ? "Hide" : "Show"} all ${group} controls`}
                  >
                    {allEnabled ? "Hide all" : "Show all"}
                  </button>
                </div>
                {isOpen ? (
                  <div
                    id={groupId}
                    className="settings-toggle-group-body"
                    role="group"
                    aria-labelledby={headerId}
                  >
                    {items.map((toggle) => (
                      <label key={toggle.field} className="settings-toggle-row">
                        <span>{toggle.label}</span>
                        <span className="theme-switch settings-toggle-switch">
                          <input
                            type="checkbox"
                            checked={toggle.checked}
                            onChange={(event) =>
                              onToggle?.(toggle.field, event.currentTarget.checked)
                            }
                          />
                          <span className="theme-switch-track" aria-hidden="true" />
                        </span>
                      </label>
                    ))}
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}
      <dl className="settings-info-list">
        {rows.map((row) => (
          <div key={row.label} className="settings-info-row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
