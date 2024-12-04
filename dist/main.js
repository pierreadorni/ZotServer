(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/endpoints/Libraries.ts
  var Libraries = class {
    constructor() {
      this.supportedMethods = ["POST"];
      this.supportedDataTypes = ["application/json"];
      this.permitBookmarklet = false;
    }
    init(request) {
      return __async(this, null, function* () {
        const libraries = yield Zotero.Libraries.getAll();
        for (const library of libraries) {
          const collectionIDs = yield Zotero.Collections.getAllIDs(library.libraryID);
          library["collections"] = Zotero.Collections.get(collectionIDs);
        }
        return [200, "application/json", JSON.stringify(libraries)];
      });
    }
  };

  // src/endpoints/Ping.ts
  var Ping = class {
    constructor() {
      this.supportedMethods = ["GET"];
    }
    init(request) {
      return __async(this, null, function* () {
        return [200, "text/plain", "ZotServer is running !"];
      });
    }
  };

  // src/endpoints/Search.ts
  var Search = class {
    constructor() {
      this.supportedMethods = ["POST"];
      this.supportedDataTypes = ["application/json"];
      this.permitBookmarklet = false;
    }
    init(request) {
      return __async(this, null, function* () {
        const searchResults = yield this.search(request.data);
        const items = yield Zotero.Items.getAsync(searchResults);
        return [200, "application/json", JSON.stringify(items)];
      });
    }
    search(conditions) {
      const s = new Zotero.Search();
      s.libraryID = Zotero.Libraries.userLibraryID;
      conditions.forEach(({ condition, operator = "contains", value, required = true }) => {
        s.addCondition(condition, operator, value, required);
      });
      return s.search();
    }
  };

  // src/zotserver.ts
  var ZotServer = class {
    start() {
      Zotero.Server.Endpoints["/zotserver/search"] = Search;
      Zotero.Server.Endpoints["/zotserver/libraries"] = Libraries;
      Zotero.Server.Endpoints["/zotserver/ping"] = Ping;
    }
  };

  // src/main.ts
  Zotero.debug("starting ZotServer");
  Zotero.ZotServer = new ZotServer();
  Zotero.ZotServer.start();
})();
