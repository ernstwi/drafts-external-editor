# drafts-external-editor

Scripts for using [Drafts](https://getdrafts.com) with an external text editor.

Drafts stores its notes (drafts) in a database, so they can't be opened in an external editor directly. These scripts offer two possible workarounds.

The first option is a Drafts action (`edit-in-external-editor`) which writes a file, opens the file in a specified editor, waits for the editor to quit, and reads back the edited file. This action is blocking in the sense that no other Draft actions can be invoked while the external editor is open, so is best for quick edits.

The second option is more involved and uses several actions as well as a macOS "shortcut". It works like this:

1. Invoke the `make-proxy-file` action. This writes a copy ("proxy file") of the current draft to a user-specified directory and copies its path to the system clipboard.
2. Edit the proxy file using your editor of choice.
3. Invoke the shortcut `drafts-proxy`, e.g. using the terminal: `shortcuts run drafts-proxy`. This goes through all proxy files and writes them back to their corresponding draft.
4. Finally, when you are done, invoke the `delete-proxy-file` action.

To simplify this workflow there is also an action `make-proxy-file-and-edit-in-external-editor` whose purpose should be clear from the name.

You'd probably want to set up your editor so that step 3 is handled automatically. For example with Vim you could add the following autocommand:

```
autocmd! BufWritePost <your proxy file directory>/* silent !shortcuts run drafts-proxy &
```

Actions are available from the Drafts directory:

- [Edit in External Editor](https://directory.getdrafts.com/a/2Cp)
- [Make Proxy File](https://directory.getdrafts.com/a/2Cq)
- [Delete Proxy File](https://directory.getdrafts.com/a/2Cr)
- [Make Proxy File and Edit in External Editor](https://directory.getdrafts.com/a/2Cs)
