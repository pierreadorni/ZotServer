import EndpointInterface from '../types/EndpointInterface';


export default class Libraries implements EndpointInterface {
    supportedMethods = ['POST'];
    supportedDataTypes = ['application/json'];
    permitBookmarklet = false;

    public async init(request: any) {
        const libraries = await Zotero.Libraries.getAll();

        for (const library of libraries) {
            const collectionIDs = await Zotero.Collections.getAllIDs(library.libraryID);        
            library['collections'] = Zotero.Collections.get(collectionIDs);
        }

        return [200, 'application/json', JSON.stringify(libraries)];
    }
}
