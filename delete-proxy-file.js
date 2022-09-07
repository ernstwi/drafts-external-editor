function bash(script) {
    let sh = ShellScript.create(`#!/usr/bin/env bash\n${script}`);
    if (!sh.execute()) {
        throw new Error(sh.standardError);
    }
}

(function() {
    let bookmark = Bookmark.findOrCreate("proxy-files");
    let fm = FileManager.createForBookmark(bookmark);
    let file = `${fm.basePath}/${draft.uuid}.md`;

    try {
        bash(`rm ${file}`);
    } catch (e) {
        alert(e);
        return;
    }
})();
