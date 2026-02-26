# 🏷️ Rename My Window

**The simplest way to tell your VS Code windows apart.**

Got 5 VS Code windows open and no idea which is which? Just click, type a name, and you're done. No JSON files. No settings to dig through. Just a name.

![Demo](demo.gif)

## How to Use

### Option 1: Click the Status Bar
Look at the bottom-left of your VS Code window. You'll see **"🏷️ Name this window"**. Click it. Type a name. Done.

### Option 2: Keyboard Shortcut
Press `Ctrl+Shift+T` (or `Cmd+Shift+T` on Mac). Type a name. Done.

### Option 3: Command Palette
Press `Ctrl+Shift+P`, type "Rename", and pick **"🏷️ Rename This Window"**. Type a name. Done.

### Option 4: Right-Click Area
There's a tag icon in your editor title bar. Click it. Type a name. Done.

### Option 5: With Emoji! 😎
Open the Command Palette and pick **"😎 Rename with Emoji Prefix"**. Pick an emoji, type a name, and your window becomes something like **🔥 Client Portal** or **🧪 Staging Server**.

## Features

- **One-click rename** from the status bar (bottom-left)
- **Keyboard shortcut** `Ctrl+Shift+T` / `Cmd+Shift+T`
- **Emoji mode** for extra-clear visual identification
- **Persists across sessions** — close and reopen, your name is still there
- **No config files to edit** — everything happens through simple UI prompts
- **Clear name** command to go back to default
- **Customizable title format** if you want to tweak the template

## Commands

| Command | Description |
|---------|-------------|
| `Rename My Window: 🏷️ Rename This Window` | Give this window a custom name |
| `Rename My Window: 😎 Rename with Emoji Prefix` | Pick an emoji + name |
| `Rename My Window: ❌ Clear Window Name` | Remove the custom name |

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `renameMyWindow.showStatusBar` | `true` | Show the clickable name badge in the status bar |
| `renameMyWindow.titleFormat` | `${name} ✦ ${activeEditorShort}${separator}${rootName}` | Customize how the title looks |
| `renameMyWindow.favoriteEmojis` | (15 emojis) | Customize the emoji picker options |

## Examples

After renaming, your windows will look like this in the taskbar:

- **🔥 Client Portal ✦ index.tsx — client-portal**
- **🚀 API Server ✦ routes.ts — api-server**
- **💎 My Blog ✦ post.md — blog**
- **🧪 Staging ✦ config.yml — staging-env**

Instead of the usual confusing mess of file names.

## Why This Exists

Every developer has been there: you Alt+Tab through 4 identical-looking VS Code windows trying to find the right one. The built-in solution requires editing `.vscode/settings.json` manually with a template string. That's not fun.

This extension makes it dead simple. Click. Type. Done.

## License

MIT
