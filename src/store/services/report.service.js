import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL + "api/v1/reports/";

class ReportService {
  getReport(reportId) {
    return axios.get(API_URL + reportId, { headers: authHeader() })
  }

  getAllReports(params, currentPage, sortField, sortDir, statusName, minDate, maxDate, reportType) {
    let data = JSON.stringify({
      "parameter": params,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "statusName": statusName,
      "minDate": minDate,
      "maxDate": maxDate,
      "reportType": reportType
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + 'all', { headers: authHeader() })
  }

  getAllReportStructures(parameter, currentPage, sortField, sortDir, isActive, minDate, maxDate, reportTypeName) {
    let data = JSON.stringify({
      "parameter": parameter,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "isActive": isActive,
      "minDate": minDate,
      "maxDate": maxDate,
      "reportTypeName": reportTypeName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `structures/all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + 'structures/all', { headers: authHeader() })
  }

  getAllActiveReportStructures() {
    return axios.get(API_URL + 'structures/active/all', { headers: authHeader() })
  }

  getReportStructureById(repoerStructureId) {
    return axios.get(API_URL + 'structures/' + repoerStructureId, { headers: authHeader() })
  }

  getAllReportTypes() {
    return axios.get(API_URL + 'types/all', { headers: authHeader() });
  }

  checkReportTypeName(ReportTypeName) {
    let data = JSON.stringify({
      "name": ReportTypeName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `types/check`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  createReportType(ReportTypeName) {
    let data = JSON.stringify({
      "name": ReportTypeName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `types/create`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  checkReportStructure(reportStructureId) {
    return axios.get(API_URL + `structures/${reportStructureId}/check`, { headers: authHeader() });
  }

  createReportStructure(id, name, description, reportTypeId, structureData) {
    let data = JSON.stringify({
      "id": id,
      "name": name,
      "description": description,
      "reportTypeId": reportTypeId,
      "structureData": JSON.stringify(structureData)
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `structures/create`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  updateStatusReportStructure(id, isActive) {
    let data = JSON.stringify({
      "id": id,
      "isActive": Boolean(isActive)
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `structures/status/update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  updateReportStructure(id, name, description, reportTypeId, structureData) {
    let data = JSON.stringify({
      "id": id,
      "name": name,
      "description": description,
      "reportTypeId": reportTypeId,
      "structureData": JSON.stringify(structureData)
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `structures/update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getNewReportStructures(oldReportStructureId) {
    let data = JSON.stringify({
      "oldReportStructureId": oldReportStructureId
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `structures/new/all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  createReport(reportData, dateStart, dateEnd, reportStructureId, userId, reportStatusId) {
    let data = JSON.stringify({
      "reportData": JSON.stringify(reportData),
      "dateStart": dateStart,
      "dateEnd": dateEnd,
      "reportStructureId": reportStructureId,
      "userId": userId,
      "reportStatusId": reportStatusId,
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

  updateReport(reportId, reportData, dateStart, dateEnd, reportStructureId, userId, reportStatusId) {
    let data = JSON.stringify({
      "reportId": reportId,
      "reportData": JSON.stringify(reportData),
      "dateStart": dateStart,
      "dateEnd": dateEnd,
      "reportStructureId": reportStructureId,
      "userId": userId,
      "reportStatusId": reportStatusId,
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

  updateReportStatus(reportId, statusId) {
    let data = JSON.stringify({
      "reportId": reportId,
      "statusId": statusId
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

  updateReportChange(reportId, canChange) {
    let data = JSON.stringify({
      "reportId": reportId,
      "canChange": canChange
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `change/update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  deleteReport(reportId) {
    return axios.delete(API_URL + 'delete/' + reportId, { headers: authHeader() })
  }

  updateReportType(reportTypeId, reportTypeName) {
    let data = JSON.stringify({
      "reportTypeName": reportTypeName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `types/update/` + reportTypeId,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }
}

export default new ReportService();