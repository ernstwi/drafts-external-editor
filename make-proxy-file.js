(function() {
    let bookmark = Bookmark.findOrCreate("proxy-files");
    let fm = FileManager.createForBookmark(bookmark);

    // TODO: Get file extension from draft
    if (!fm.writeString(`/${draft.uuid}.md`, draft.content)) {
        alert("Error: Couldn't write file");
        return;
    }

    let file = `${fm.basePath}/${draft.uuid}.md`;
    app.setClipboard(file);
})();
