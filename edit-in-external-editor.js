let EDITOR = '', TERM_INIT = '';

// ---- CONFIGURATION ----
// Set EDITOR to the application (note: not shell command) you want to use.
// Below are some examples.
//
// TERM_INIT is used for setup of the shell used to open the application. I
// found this was necessary for Neovim Qt to function properly but it should
// generally not be needed.

// TextEdit
EDITOR = 'TextEdit'

// Visual Studio Code
// EDITOR = 'Visual Studio Code'

// Neovim Qt
// EDITOR = 'nvim-qt'
// TERM_INIT = 'export LC_CTYPE="en_US.UTF-8"'
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
        bash(`${TERM_INIT}\nopen -n -W -a "${EDITOR}" ${file}`);
        draft.content = fm.readString(`/${draft.uuid}.md`);
        draft.update();
        bash(`rm ${file}`);
    } catch (e) {
        alert(e);
        return;
    }
})();
