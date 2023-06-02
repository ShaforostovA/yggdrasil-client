import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL + "api/v1/faculty/";

class FacultyService {
  getAllFaculty() {
    return axios.get(API_URL + 'all', { headers: authHeader() })
  }

  getAllFacultySearch(parameter, currentPage, sortField, sortDir, isActive, minDate, maxDate) {
    let data = JSON.stringify({
      "parameter": parameter,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "isActive": isActive,
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `search/all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + 'search/all', { headers: authHeader() })
  }

  getAllActiveFaculty() {
    return axios.get(API_URL + 'active/all', { headers: authHeader() })
  }

  getFaculty(facultyId) {
    return axios.get(API_URL + facultyId, { headers: authHeader() })
  }

  updateFaculty(facultyId, shortName, name, description) {
    let data = JSON.stringify({
      "id": Number(facultyId),
      "shortName": shortName,
      "name": name,
      "description": description,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'update',
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  createFaculty(shortName, name, description) {
    let data = JSON.stringify({
      "id": null,
      "shortName": shortName,
      "name": name,
      "description": description,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'create',
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }
}

export default new FacultyService();