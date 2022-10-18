# drafts-external-editor

Scripts for using [Drafts](https://getdrafts.com) with an external text editor.

Drafts stores its notes (drafts) in a database, so they can't be opened in an external editor directly. These scripts offer two possible workarounds.

## Option 1: Edit in External Editor (recommended)

Components:

- [Edit in External Editor](https://directory.getdrafts.com/a/2Cp)

This action writes the current draft to file, opens the file in a specified editor, waits for the editor to quit, and reads back the edited file. This action is blocking in the sense that no other Draft actions can be invoked while the external editor is open, so is best for quick edits.

## Option 2: Make Proxy File

Components:

- [Make Proxy File](https://directory.getdrafts.com/a/2Cq)
- [drafts-proxy.shortcut](https://github.com/ernstwi/drafts-external-editor/blob/main/drafts-proxy.shortcut)
- [Delete Proxy File](https://directory.getdrafts.com/a/2Cr)
- [Make Proxy File and Edit in External Editor](https://directory.getdrafts.com/a/2Cs)

This second option is more involved and uses several actions as well as a macOS "shortcut". It works like this:

1. Invoke the [Make Proxy File](https://directory.getdrafts.com/a/2Cq) action. This writes a copy ("proxy file") of the current draft to a user-specified directory and copies its path to the system clipboard.
2. Edit the proxy file using your editor of choice.
3. Invoke the shortcut [drafts-proxy](https://github.com/ernstwi/drafts-external-editor/blob/main/drafts-proxy.shortcut), e.g. using the terminal: `shortcuts run drafts-proxy`. This goes through all proxy files and writes them back to their corresponding drafts.
4. Finally, when you are done, invoke the [Delete Proxy File](https://directory.getdrafts.com/a/2Cr) action.

To simplify this workflow there is also an action [Make Proxy File and Edit in External Editor](https://directory.getdrafts.com/a/2Cs) whose purpose should be clear from the name.

You probably want to set up your editor so that step 3 is handled automatically. For example with Vim you could add the following autocommand:

```
autocmd! BufWritePost <your proxy file directory>/* silent !shortcuts run drafts-proxy &
```
