var ZotServerStartup = true;

async function startup({id, version, rootURI}) {
    Services.scriptloader.loadSubScript(rootURI+"dist/main.js");
}

async function install() {
    Zotero.debug("ZotServer installed")
}

async function shutdown() {
    Zotero.debug("Shutting down ZotServer")
}

async function uninstall() {
    Zotero.debug("Uninstalled ZotServer")
}