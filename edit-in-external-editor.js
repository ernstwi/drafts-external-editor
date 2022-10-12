let EDITOR = '';

// ---- CONFIGURATION ----
// Set EDITOR to the application (note: not shell command) you want to use.
// Below are some examples.

// TextEdit
EDITOR = 'TextEdit'

// Visual Studio Code
// EDITOR = 'Visual Studio Code'

// Neovim Qt
// EDITOR = 'nvim-qt'
// -----------------------

function bash(script) {
    let sh = ShellScript.create(`#!/usr/bin/env bash\n${script}`);
    if (!sh.execute()) {
        throw new Error(sh.standardError);
    }
}

(function() {
    let bookmark = Bookmark.findOrCreate("proxy-files");
    let fm = FileManager.createForBookmark(bookmark);

    // TODO: Get file extension from draft
    if (!fm.writeString(`/${draft.uuid}.md`, draft.content)) {
        alert("Error: Couldn't write file");
        return;
    }

    let file = `${fm.basePath}/${draft.uuid}.md`;

    try {
        bash(`open -n -W -a "${EDITOR}" ${file}`);
        draft.content = fm.readString(`/${draft.uuid}.md`);
        draft.update();
        bash(`rm ${file}`);
    } catch (e) {
        alert(e);
        return;
    }
})();
