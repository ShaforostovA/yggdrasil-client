import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL + "api/v1/keywords/";

class KeyWordService {
  getKeyWords() {
    return axios.get(API_URL + 'all', { headers: authHeader() })
  }
  attachKeyWord(documentId, keyWords) {
    let data = JSON.stringify({
      "keyWords": keyWords,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'add/' + documentId,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }
  getDocumentKeyWords(documentId) {
    return axios.get(API_URL + 'document/'+documentId, {headers: authHeader()})
  }

  updateKeyWord(keyWordId, keyWordName) {
    let data = JSON.stringify({
      "keyWordName": keyWordName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'update/' + keyWordId,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  deleteKeyWord(keyWordId) {
    // let data = JSON.stringify({
      
    // });
    
    // let config = {
    //   method: 'delete',
    //   maxBodyLength: Infinity,
    //   url: API_URL + 'delete/' + keyWordId,
    //   headers: authHeader(),
    //   data : data
    // };
    
    // return axios.request(config);
    return axios.delete(API_URL + 'delete/' + keyWordId, { headers: authHeader() })
  }
}

export default new KeyWordService();