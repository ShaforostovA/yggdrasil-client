import axios from 'axios';
import authHeader from './auth-header';
import Store from '../index'

const API_URL = process.env.VUE_APP_API_URL + "api/v1/students/";

class StudentService {

  getAllStudent(params, currentPage, sortField, sortDir, minDate, maxDate, departmentName, isActive) {
    let data = JSON.stringify({
      "parameter": params,
      "currentPage": currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "minDate": minDate,
      "maxDate": maxDate,
      "departmentName": departmentName,
      "isActive": isActive,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getAllFacultyStudent(params, currentPage, sortField, sortDir, minDate, maxDate, departmentName, isActive, facultyId) {
    let data = JSON.stringify({
      "parameter": params,
      "currentPage": currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "minDate": minDate,
      "maxDate": maxDate,
      "departmentName": departmentName,
      "isActive": isActive,
      "facultyId": facultyId,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `faculty/all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getAllDepartmentStudent(params, currentPage, sortField, sortDir, minDate, maxDate, departmentName, isActive, departmentId) {
    let data = JSON.stringify({
      "parameter": params,
      "currentPage": currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "minDate": minDate,
      "maxDate": maxDate,
      "departmentName": departmentName,
      "isActive": isActive,
      "departmentId": departmentId,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `department/all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  createStudent(lastName, name, patronymic, groupName, departmentId, yearStart, yearEnd, email, phone, birthday) {
    let data = JSON.stringify({
      "lastName": lastName,
      "name": name,
      "patronymic": patronymic,
      "groupName": groupName,
      "departmentId": departmentId,
      "yearStart": yearStart,
      "yearEnd": yearEnd,
      "email": email,
      "phone": phone,
      "birthday": birthday,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `create`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getStudent(studentId) {
    return axios.get(API_URL + studentId, { headers: authHeader() })
  }

  updateStudent(studentId, lastName, name, patronymic, groupName, departmentId, yearStart, yearEnd, email, phone, birthday) {
    let data = JSON.stringify({
      "studentId": studentId,
      "lastName": lastName,
      "name": name,
      "patronymic": patronymic,
      "groupName": groupName,
      "departmentId": departmentId,
      "yearStart": yearStart,
      "yearEnd": yearEnd,
      "email": email,
      "phone": phone,
      "birthday": birthday,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getAllForDocumentStudent() {
    return axios.get(API_URL + 'document/all', { headers: authHeader() })
  }

  updateStudentStatus(studentId, isTrained) {
    let data = JSON.stringify({
      "studentId": studentId,
      "isTrained": isTrained
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `status/update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  currentUser() {
    return Store.state.auth.user;
  }
}

export default new StudentService();