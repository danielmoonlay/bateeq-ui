import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../rest-service';
 
const serviceUri = require('../../host').inventory + '/docs/efr-kb-rtf';  
const serviceSearch = require('../../host').inventory + '/docs/efr-kb-rtp';

 
export class Service extends RestService{

  constructor(http, aggregator) {
    super(http, aggregator);
  }

  search(keyword) {
    return super.get(serviceUri);
  }

  getById(id)
  {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  } 

  create(data)
  {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }   
  
  getEFRKBRTPByCode(code) 
  {
      var endpoint = `${serviceSearch}?keyword=${code}`;
      return super.get(endpoint);
  }

  getModuleConfig() {
    var endpoint = require('../../host').core + '/modules?keyword=EFR-KB/RTF';
    return super.get(endpoint)
      .then(results => {
        if (results && results.length == 1)
          return Promise.resolve(results[0].config);
        else
          return Promise.resolve(null);
      });
  }
  
  getStorageById(id) {
    var endpoint = `${require('../../host').inventory + '/storages'}/${id}`;
    return super.get(endpoint);
  }

  getDataInventory(storageId,articleVariantId)
  {
    var endpoint = `${require('../../host').inventory + '/storages/' + storageId + '/inventories/'+articleVariantId}`;
    return super.get(endpoint);
  }
}
