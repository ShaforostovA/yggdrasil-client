export default {
  install:(app, options) => {
    app.config.globalProperties.$normaldate = function(date) {
      let newDateFormat = new Date(date);
      return `${newDateFormat.getDate() < 10 ? '0' + newDateFormat.getDate() : newDateFormat.getDate()}.${(1+newDateFormat.getMonth()) < 10 ? '0'+(1 + newDateFormat.getMonth()) : newDateFormat.getMonth()+1}.${newDateFormat.getFullYear()} / ${newDateFormat.getHours() < 10 ? '0' + newDateFormat.getHours() : newDateFormat.getHours()}:${newDateFormat.getMinutes() < 10 ? '0' + newDateFormat.getMinutes() : newDateFormat.getMinutes()}:${newDateFormat.getSeconds() < 10 ? '0' + newDateFormat.getSeconds() : newDateFormat.getSeconds()}`;
    }
    app.config.globalProperties.$onlydate = function(date) {
      let newDateFormat = new Date(date);
      return `${newDateFormat.getDate() < 10 ? '0' + newDateFormat.getDate() : newDateFormat.getDate()}.${(1+newDateFormat.getMonth()) < 10 ? '0'+(1 + newDateFormat.getMonth()) : newDateFormat.getMonth()+1}.${newDateFormat.getFullYear()}`;
    }
  }
}