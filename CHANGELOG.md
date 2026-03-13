# Change Log

## [1.0.4] - 2026-03-13

### Fixed
- Removed title bar manipulation - the extension no longer writes to `window.title` settings
- This fixes the bug where renaming one window would overwrite the title bar of other windows
- The custom name now shows only in the status bar, which is per-window and reliable

### Removed
- `renameMyWindow.titleFormat` setting (no longer needed since we don't touch the title bar)

## [1.0.1] - 2026-02-26

### Fixed
- Multi-window support: each window now keeps its own custom name instead of overwriting others
- Uses workspace-level settings when a folder is open, preventing cross-window conflicts
- Added re-apply logic to restore the name if another instance overwrites the global title

## [1.0.0] - 2026-02-24

### Added
- One-click rename from status bar
- Keyboard shortcut (Ctrl+Shift+T / Cmd+Shift+T)
- Emoji prefix mode with customizable emoji list
- Clear name command
- Persistent names across sessions (per workspace)
- Customizable title format
- Editor title bar button
- Command palette integration
