import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL + "api/v1/documents/";

class DocumentService {
  getDocument(documentId) {
    return axios.get(API_URL + `${documentId}`, { headers: authHeader() })
  }
  getDocuments(typeSearch, params, currentPage, sortField, sortDir, statusName, minDate, maxDate, documentType) {
    let data = JSON.stringify({
      "typeSearch": typeSearch,
      "parameter": params,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "statusName": statusName,
      "minDate": minDate,
      "maxDate": maxDate,
      "documentType": documentType
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.post(API_URL + 'all', { headers: authHeader() });
  }
  getDocumentStructures() {
    return axios.get(API_URL + 'structures/short', { headers: authHeader() })
  }
  getDocumentStructure(structureId) {
    return axios.get(API_URL + `structures/${structureId}`, { headers: authHeader() })
  }
  createDocument(username, documentStructureId, documentStatusId, documentData) {
    let data = JSON.stringify({
      "documentData": JSON.stringify(documentData),
      "documentStatusId": Number(documentStatusId),
      "documentStructureId": Number(documentStructureId),
      "username": username
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
  deleteDocument(documentId) {
    return axios.delete(API_URL + 'delete/'+documentId, { headers: authHeader() })
  }
  // updateDocumentStatus(documentId, documentStatusId) {
  //   return axios.post(API_URL + `${documentId}/status/update`, { data: Number(documentStatusId), headers: authHeader() })
  // }
  
  updateDocumentStatus(documentId, documentStatusId) {
    let data = JSON.stringify({
      "documentStatusId": JSON.stringify(documentStatusId),
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `${documentId}/status/update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  updateDocumentData(documentId, documentData) {
    let data = JSON.stringify({
      "documentData": JSON.stringify(documentData),
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `${documentId}/data/update`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getUserStatistics(userId, minDate, maxDate) {
    let data = JSON.stringify({
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `statistic/user/${userId}`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + `statistic/user/${userId}`, { headers: authHeader() })
  }

  getDepartmentStatistics(departmentId, minDate, maxDate) {
    let data = JSON.stringify({
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `statistic/department/${departmentId}`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + `statistic/department/${departmentId}`, { headers: authHeader() })
  }

  getFacultayStatistics(facultyId, minDate, maxDate) {
    let data = JSON.stringify({
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `statistic/faculty/${facultyId}`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + `statistic/faculty/${facultyId}`, { headers: authHeader() })
  }

  getAllStatistics(minDate, maxDate) {
    let data = JSON.stringify({
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `statistic/all`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + `statistic/all`, { headers: authHeader() })
  }

  getAllDocumentTypes() {
    return axios.get(API_URL + 'types/all', { headers: authHeader() });
  }

  checkDocumentTypeName(documentTypeName) {
    let data = JSON.stringify({
      "name": documentTypeName,
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

  createDocumentType(documentTypeName) {
    let data = JSON.stringify({
      "name": documentTypeName,
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

  getAdminDocumentStructures(parameter, currentPage, sortField, sortDir, isActive, minDate, maxDate, documentTypeName) {
    let data = JSON.stringify({
      "parameter": parameter,
      "currentPage" : currentPage,
      "sortField": sortField,
      "sortDir": sortDir,
      "isActive": isActive,
      "minDate": minDate,
      "maxDate": maxDate,
      "documentTypeName": documentTypeName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `structures/short/admin`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
    // return axios.get(API_URL + 'structures/short/admin', { headers: authHeader() })
  }

  createDocumentStructure(id, name, description, documentTypeId, structureData) {
    let data = JSON.stringify({
      "id": id,
      "name": name,
      "description": description,
      "documentTypeId": documentTypeId,
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

  updateDocumentStructure(id, name, description, documentTypeId, structureData) {
    let data = JSON.stringify({
      "id": id,
      "name": name,
      "description": description,
      "documentTypeId": documentTypeId,
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

  updateStatusDocumentStructure(id, isActive) {
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

  checkDocumentStructure(documentStructureId) {
    return axios.get(API_URL + `structures/${documentStructureId}/check`, { headers: authHeader() });
  }

  updateStatusDocumentsByStructureId(id) {
    let data = JSON.stringify({
      "id": id
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `status/update/remake`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  getNewDocumentStructures(oldDocumentStructureId) {
    let data = JSON.stringify({
      "oldDocumentStructureId": oldDocumentStructureId
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

  getAllFacultyDocuments(documentStructureId, facultyId, minDate, maxDate) {
    let data = JSON.stringify({
      "documentStructureId": documentStructureId,
      "facultyId": facultyId,
      "minDate": minDate,
      "maxDate": maxDate,
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

  getAllDepartmentDocuments(documentStructureId, departmentId, minDate, maxDate) {
    let data = JSON.stringify({
      "documentStructureId": documentStructureId,
      "departmentId": departmentId,
      "minDate": minDate,
      "maxDate": maxDate,
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

  archivingDocuments(documentStructureId, documentStatusId, minDate, maxDate) {
    let data = JSON.stringify({
      "documentStructureId": documentStructureId,
      "documentStatusId": documentStatusId,
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `archiving`,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }

  documentExportToExcel(documentStructures, facultyId, departmentId, minDate, maxDate) {
    let data = JSON.stringify({
      "documentStructures": documentStructures,
      "facultyId": facultyId,
      "departmentId": departmentId,
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `export`,
      headers: authHeader(),
      responseType: 'blob',
      data : data
    };
    
    return axios.request(config);
  }

  documentCombinedExportToExcel(documentStructures, facultyList, departmentList, minDate, maxDate) {
    let data = JSON.stringify({
      "documentStructures": documentStructures,
      "facultyList": facultyList,
      "departmentList": departmentList,
      "minDate": minDate,
      "maxDate": maxDate,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `combined/export`,
      headers: authHeader(),
      responseType: 'blob',
      data : data
    };
    
    return axios.request(config);
  }

  updateDocumentType(documentTypeId, documentTypeName) {
    let data = JSON.stringify({
      "documentTypeName": documentTypeName,
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: API_URL + `types/update/` + documentTypeId,
      headers: authHeader(),
      data : data
    };
    
    return axios.request(config);
  }
}

export default new DocumentService();