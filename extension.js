const vscode = require('vscode');

/** @type {vscode.StatusBarItem} */
let statusBarItem;

/** @type {string|undefined} */
let currentName;


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Restore saved name for this workspace (or globally if no workspace)
  currentName = context.workspaceState.get('windowName')
    || context.globalState.get('windowName_' + getWorkspaceId());

  // Create status bar item (always visible, clickable)
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1000
  );
  statusBarItem.command = 'renameMyWindow.rename';
  statusBarItem.tooltip = 'Click to rename this window';
  updateStatusBar();

  const config = vscode.workspace.getConfiguration('renameMyWindow');
  if (config.get('showStatusBar', true)) {
    statusBarItem.show();
  }

  // === COMMAND: Rename This Window ===
  const renameCmd = vscode.commands.registerCommand('renameMyWindow.rename', async () => {
    const name = await vscode.window.showInputBox({
      prompt: 'Give this window a name (shows in the status bar)',
      placeHolder: 'e.g. Client Portal, My Blog, API Server...',
      value: currentName || '',
      validateInput: (value) => {
        if (value && value.length > 100) {
          return 'Keep it under 100 characters';
        }
        return null;
      }
    });

    if (name === undefined) {
      return; // User pressed Escape
    }

    if (name === '') {
      await clearName(context);
      return;
    }

    await setName(context, name);
    vscode.window.showInformationMessage(`Window renamed to: ${name}`);
  });

  // === COMMAND: Rename with Emoji Prefix ===
  const emojiCmd = vscode.commands.registerCommand('renameMyWindow.addEmoji', async () => {
    const config = vscode.workspace.getConfiguration('renameMyWindow');
    const emojis = config.get('favoriteEmojis', [
      '\u{1F525}', '\u{1F680}', '\u{1F48E}', '\u26A1', '\u{1F3AF}',
      '\u{1F6E0}\uFE0F', '\u{1F9EA}', '\u{1F31F}', '\u{1F4BB}', '\u{1F4E6}',
      '\u{1F3A8}', '\u{1F41B}', '\u2705', '\u{1F3D7}\uFE0F', '\u{1F4F1}'
    ]);

    const items = emojis.map(emoji => ({
      label: emoji,
      description: `Use ${emoji} as prefix`
    }));

    const picked = await vscode.window.showQuickPick(items, {
      placeHolder: 'Pick an emoji for this window',
      title: 'Choose an Emoji'
    });

    if (!picked) {
      return;
    }

    const emoji = picked.label;

    const name = await vscode.window.showInputBox({
      prompt: `Name this window (will appear as: ${emoji} Your Name)`,
      placeHolder: 'e.g. Client Portal, My Blog, API Server...',
      value: currentName ? currentName.replace(/^.\s*/, '') : '',
      validateInput: (value) => {
        if (!value) {
          return 'Please enter a name';
        }
        if (value.length > 100) {
          return 'Keep it under 100 characters';
        }
        return null;
      }
    });

    if (name === undefined) {
      return;
    }

    const fullName = `${emoji} ${name}`;
    await setName(context, fullName);
    vscode.window.showInformationMessage(`Window renamed to: ${fullName}`);
  });

  // === COMMAND: Clear Window Name ===
  const clearCmd = vscode.commands.registerCommand('renameMyWindow.clear', async () => {
    if (!currentName) {
      vscode.window.showInformationMessage('This window has no custom name.');
      return;
    }

    await clearName(context);
    vscode.window.showInformationMessage('Window name cleared! Back to default.');
  });

  // Listen for config changes
  const configListener = vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration('renameMyWindow.showStatusBar')) {
      const show = vscode.workspace.getConfiguration('renameMyWindow').get('showStatusBar', true);
      if (show) {
        statusBarItem.show();
      } else {
        statusBarItem.hide();
      }
    }
  });

  context.subscriptions.push(renameCmd, emojiCmd, clearCmd, statusBarItem, configListener);
}

/**
 * Get a unique-ish ID for the current workspace/folder
 */
function getWorkspaceId() {
  if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
    return vscode.workspace.workspaceFolders[0].uri.toString();
  }
  return '__no_workspace__';
}

/**
 * Set the window name and persist it
 * @param {vscode.ExtensionContext} context
 * @param {string} name
 */
async function setName(context, name) {
  currentName = name;
  await context.workspaceState.update('windowName', name);
  await context.globalState.update('windowName_' + getWorkspaceId(), name);
  updateStatusBar();
}

/**
 * Clear the window name and restore defaults
 * @param {vscode.ExtensionContext} context
 */
async function clearName(context) {
  currentName = undefined;
  await context.workspaceState.update('windowName', undefined);
  await context.globalState.update('windowName_' + getWorkspaceId(), undefined);
  updateStatusBar();
}

/**
 * Update the status bar item
 */
function updateStatusBar() {
  if (currentName) {
    statusBarItem.text = `$(tag) ${currentName}`;
    statusBarItem.tooltip = `Window: ${currentName}\nClick to rename`;
    statusBarItem.backgroundColor = undefined;
  } else {
    statusBarItem.text = '$(tag) Name this window';
    statusBarItem.tooltip = 'Click to give this window a custom name';
    statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
  }
}

function deactivate() {
  // Status bar item is disposed via subscriptions
}

module.exports = {
  activate,
  deactivate
};
