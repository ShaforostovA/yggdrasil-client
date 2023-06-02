import axios from 'axios';
import authHeader from './auth-header';
import Store from '../index'

const API_URL = process.env.VUE_APP_API_URL + "api/v1/user/";

class UserService {
  getUserInfo() {
    return axios.get(API_URL + this.currentUser().username, { headers: authHeader() })
  }

  getEmployeeInfo(userId) {
    return axios.get(API_URL + `profile/${userId}/info`, { headers: authHeader() })
  }

  getUserFaculty(userName) {
    return axios.get(API_URL + `${userName}/faculty`, { headers: authHeader() })
  }

  getUserDepartment(userName) {
    return axios.get(API_URL + `${userName}/department`, { headers: authHeader() })
  }

  userTokenCheck() {
    console.log(authHeader());
    return axios.get(API_URL + 'token/check', { headers: authHeader() })
  }

  getAllUsers() {
    return axios.get(API_URL + 'list', { headers: authHeader() })
  }

  getAllDepartmentUsers() {
    return axios.get(API_URL + 'department/list', { headers: authHeader() })
  }

  getAllUsersFind(params, currentPage, sortField, sortDir, minDate, maxDate, departmentName, isState, userRole, isActive) {
    let data = JSON.stringify({
      "parameter": params,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "minDate": minDate,
      "maxDate": maxDate,
      "departmentName": departmentName,
      "isState": isState,
      "userRole": userRole,
      "isActive": isActive,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `list/find`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  updateProfile(userId, phone, email, imgUrl, lastName, name, patronymic, jobTitle, academicTitle, academicDegree, orcid, spinCode, birthday, isState, departmentId) {
    let data = JSON.stringify({
      "id": userId,
      "phone": phone,
      "email": email,
      "imgUrl": imgUrl,
      "lastName": lastName,
      "name": name,
      "patronymic": patronymic,
      "jobTitle": jobTitle,
      "academicTitle": academicTitle,
      "academicDegree": academicDegree,
      "orcid": orcid,
      "spinCode": spinCode,
      "birthday": birthday,
      "state": isState,
      "departmentId": departmentId
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

  checkValidUsername(username) {
    let data = JSON.stringify({
      "username": username
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'username/check',
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  createUser(lastName, name, patronymic, isState, departmentId, username, password, userRole) {
    let data = JSON.stringify({
      "lastName": lastName,
      "name": name,
      "patronymic": patronymic,
      "state": isState,
      "departmentId": Number(departmentId),
      "username": username,
      "password": password,
      "userRole": userRole
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

  updateUserStatus(userId, isActive) {
    let data = JSON.stringify({
      "userId": Number(userId),
      "isActive": isActive,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'status/update',
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  updateUserPassword(userId, password) {
    let data = JSON.stringify({
      "userId": Number(userId),
      "password": password,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + 'password/update',
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  currentUser() {
    return Store.state.auth.user;
  }
}

export default new UserService();