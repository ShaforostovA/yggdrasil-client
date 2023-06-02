import axios from 'axios';
import authHeader from './auth-header';
import Store from '../index'

const API_URL = process.env.VUE_APP_API_URL + "api/v1/department/";

class DepartmentService {
  getUserDepartmentAllUsers(departmentId) {
    return axios.get(API_URL + `users/list/${departmentId}`, { headers: authHeader() })
  }
  // currentUser() {
  //   return Store.state.auth.user;
  // }
  getDepartmentsAll() {
    return axios.get(API_URL + 'all', { headers: authHeader() })
  }

  getDepartmentsAllSearch(parameter, currentPage, sortField, sortDir, facultyName, isActive, minDate, maxDate) {
    let data = JSON.stringify({
      "parameter": parameter,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "facultyName": facultyName,
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

  getDepartmentsActiveAll() {
    return axios.get(API_URL + 'active/all', { headers: authHeader() })
  }

  updateDepartment(departmentId, shortName, name, description, facultyId) {
    let data = JSON.stringify({
      "id": departmentId,
      "shortName": shortName,
      "name": name,
      "description": description,
      "facultyId": Number(facultyId)
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

  createDepartment(departmentId, shortName, name, description, facultyId) {
    let data = JSON.stringify({
      "id": departmentId,
      "shortName": shortName,
      "name": name,
      "description": description,
      "facultyId": Number(facultyId)
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

export default new DepartmentService();