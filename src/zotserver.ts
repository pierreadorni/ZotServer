import Libraries from './endpoints/Libraries';
import Ping from './endpoints/Ping';
import Search from './endpoints/Search';

export default class ZotServer {

    public start() {
        Zotero.Server.Endpoints['/zotserver/search'] = Search
        Zotero.Server.Endpoints['/zotserver/libraries'] = Libraries
        Zotero.Server.Endpoints['/zotserver/ping'] = Ping
    }

}
