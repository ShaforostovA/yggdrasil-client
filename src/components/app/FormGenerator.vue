<template>
  <FullScreenLoader v-if="this.createProcess"/>
  <CreateMessage v-if="this.documentData !== ''" :structureId="this.structureId" :structureName="this.structureInfo.name" :documentId="this.documentData.data.id" :typeCreate="'Документ'"/>
  <div class="structure-info mb-5">
    <h2 class="structure-name text-2xl mb-3">Наименование: {{ this.structureInfo.name }}</h2>
    <h4 class="structure-description text-xl">Описание: {{ this.structureInfo.description }}</h4>
  </div>
  <div class="formGenerated flex-grow flex">
    <Loader v-if="this.loading" class="mx-auto my-36"/>
    <form v-else action="" class="createForm flex-grow border rounded-xl shadow-md overflow-hidden py-3 px-5 mb-6 flex-col" @submit.prevent="submitFormData">

      <div class="formField">
        <div class="formField-name mb-1 ml-5 relative">Ключевые слова:</div>
        <div class="chips"></div>
        <div class="formField-description mt-1">Укажите ключевые слова (для добавления слов необходимо выбрать их из выпадающего списка или ввести с клавиатуры и нажать enter).</div>
      </div>

      <div class="formField" v-for="(item, index) of this.structureData.data" :key="item.id">
        <div v-if="this.checkAppearance(item.id)" class="formField-name mb-1 ml-5 relative" :class="{required: (item.required)}">{{`Поле №${index+1} — ` + (item.name === '' ? 'Заполните поле:' : item.name)}}</div>
        
        <input v-if="item.type === 'text' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" v-bind:required="item.required" type="text" name="" v-bind:minlength="item.minLength" v-bind:maxlength="item.maxLength"  v-bind:placeholder="item.placeholder" v-bind:value="this.intermediateDataCheck[item.id]" class="input-text input-field">
        
        <input v-else-if="item.type === 'number' && this.checkAppearance(item.id)" @click="receiveFormData" @blur="receiveFormData" v-bind:id="item.id" v-bind:required="item.required" type="number" name="" v-bind:min="item.minValue" v-bind:max="item.maxValue" v-bind:step="item.stepValue" v-bind:value="this.intermediateDataCheck[item.id]"  v-bind:placeholder="item.placeholder" class="input-text input-field">
        
        <input v-else-if="item.type === 'date' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" v-bind:required="item.required" type="date" name=""  v-bind:placeholder="item.placeholder" :value="this.intermediateDataCheck[item.id]" class="input-text input-field">

        <div v-else-if="item.type === 'selectMultiple' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" class="input-field col s12 selectMultiple">
          <select multiple>
            <option value="" disabled selected>{{ item.placeholder }}</option>
            <option v-for="(option, optionIndex) of item.options.data" :key="option" v-bind:value="optionIndex">{{ optionIndex }}</option>
          </select>
        </div>

        <div v-else-if="item.type === 'selectSingle' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" class="input-field col s12 selectSingle">
          <select>
            <option value="" disabled selected>{{ item.placeholder }}</option>
            <option v-for="(option, optionIndex) of item.options.data" :key="option" v-bind:value="optionIndex">{{ optionIndex }}</option>
          </select>
        </div>

        <div v-else-if="item.type === 'selectMultipleImage' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" class="input-field col s12 m6 selectMultipleImage">
          <select multiple class="icons">
            <option value="" disabled selected>{{ item.placeholder }}</option>
            <option v-for="option of this.employeesList" :key="option.id" v-bind:value="option.id" v-bind:data-icon="option.imgUrl">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
          </select>
        </div>

        <!-- <div v-else-if="item.type === 'selectMultipleImage'" v-bind:id="item.id" class="input-field col s12 m6 selectMultipleImage">
          <select multiple class="icons">
            <option value="" disabled selected>{{ item.placeholder }}</option>
            <option v-for="(option, optionIndex) of item.options.data" :key="option" v-bind:value="optionIndex" v-bind:data-icon="option">{{ optionIndex }}</option>
          </select>
        </div> -->

        <div v-else-if="item.type === 'selectSingleImage' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" class="input-field col s12 m6 selectSingleImage">
          <select class="icons">
            <option value="" disabled selected>{{ item.placeholder }}</option>
            <option v-for="option of this.employeesList" :key="option.id" v-bind:value="option.id" v-bind:data-icon="option.imgUrl">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
          </select>
        </div>

        <!-- <div v-else-if="item.type === 'selectSingleImage'" v-bind:id="item.id" class="input-field col s12 m6 selectSingleImage">
          <select class="icons">
            <option value="" disabled selected>{{ item.placeholder }}</option>
            <option v-for="(option, optionIndex) of item.options.data" :key="option" v-bind:value="optionIndex" v-bind:data-icon="option">{{ optionIndex }}</option>
          </select>
        </div> -->

        <div v-else-if="item.type === 'radio' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" class="form-radio block gap-3 input-field" v-bind:name="item.id">
          <label v-for="(option, optionIndex) of item.options.data" :key="option" class="block">
            <input type="radio" v-bind:name="'group' + (item.id)" id="" v-bind:value="optionIndex" class="form-radio-item with-gap block h-5 w-5">
            <span>{{ optionIndex }}</span>
          </label>
        </div>

        <div v-else-if="item.type === 'checkbox' && this.checkAppearance(item.id)" @blur="receiveFormData" v-bind:id="item.id" class="form-checkbox block gap-3 input-field">
          <label v-for="(option, optionIndex) of item.options.data" :key="option" class="block">
            <input type="checkbox" class="form-checkbox-item filled-in" v-bind:value="optionIndex"/>
            <span>{{ optionIndex }}</span>
          </label>
        </div>

        <div class="formField-description mt-1" v-if="item.description && this.checkAppearance(item.id)">{{item.description}}</div>
      </div>
      <div class="createForm-menu py-6 flex justify-end">
        <button class="main-btn px-5 py-3 text-2xl flex items-center gap-1" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Создать
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import KeyWordService from '@/store/services/key-word.service'
import DocumentService from '@/store/services/document.servive'
import UserService from '@/store/services/user.service'
import CreateMessage from '@/components/app/CreateMessage.vue'
import messages from '@/utils/messages'
import { DocumentStatus } from '@/types/DocumentStatus'

export default {
  name: "FormGenerator",
  props: ['structureId'],
  data: () => ({
    formSelect: null,
    chipsData: {},
    chipsIdMap: {},
    structureData: {}, // Данные структуры документа
    employeesList: [], // сотрудники
    message: '', // сообщение об ошибке
    structureInfo: {}, // Название документа и описание
    createProcess: false,
    documentData: '', // Получение создданного документа
    departmentData: '', // Информация о кафедре
    loading: true,
    appearanceField: {}, // Запрашиваемые значения для появления полей
    intermediateData: { userResponse: [] }, // Промежуточные данные
    intermediateDataCheck: {}, // Данные для появления полей
    keyWordList:[]
  }),
  async mounted() {
    await KeyWordService.getKeyWords().then(
      (response) => {
        for(let item of response.data) {
          this.chipsData[item.name] = null;
          this.chipsIdMap[item.name] = item.id;
        }
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    await DocumentService.getDocumentStructure(this.structureId).then(
      (response) => {
        this.structureInfo.name = response.data.name;
        this.structureInfo.description = response.data.description;
        this.structureData = JSON.parse(response.data.structure);

        for(let dataItem of this.structureData.data) {
          this.intermediateDataCheck[dataItem.id] = typeof dataItem.defaultValue === undefined ? "" : dataItem.defaultValue === undefined ? "" : dataItem.defaultValue;
          if (typeof dataItem.externalDependency !== undefined) {
            this.appearanceField[dataItem.id] = dataItem.externalDependency;
          }
        }
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    await UserService.getUserDepartment().then(
      (response) => {
        this.departmentData = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    await UserService.getAllUsers().then(
      (response) => {
        this.employeesList = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    
    setTimeout(() => {
      this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
      this.formChips = M.Chips.init(document.querySelectorAll('.chips'), {
        limit: Infinity,
        data: [
          // {tag: 'Text', image: ''},//Значение по умолчанию
        ],
        placeholder: 'Введите ключевые слова',
        secondaryPlaceholder: '+Слово',
        autocompleteOptions: {
          data: this.chipsData,
          limit: Infinity,
          minLength: 0
        }
      });
    }, 0)
    this.loading = false;
  },
  methods: {
    checkAppearance(fieldId) {
      if (this.appearanceField[fieldId] === undefined) {
        return true;
      }
      if(Array.isArray(this.intermediateDataCheck[this.appearanceField[fieldId].id])) {
        return this.intermediateDataCheck[this.appearanceField[fieldId].id].includes(this.appearanceField[fieldId].value)
      }
      // return this.appearanceField[fieldId] === undefined || this.intermediateDataCheck[this.appearanceField[fieldId].id].toString() === this.appearanceField[fieldId].value.toString();
      return this.intermediateDataCheck[this.appearanceField[fieldId].id].toString() === this.appearanceField[fieldId].value.toString();
    },
    receiveFormData() {
      this.intermediateData = { userResponse: [] };
      let element = document.querySelectorAll('.input-field');

      for(let item of element) {
        if(item.localName === 'input') {
          let obj = {};
          obj[item.id] = item.value;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else if (item.classList.contains('chips')) {
          let listValue = item.querySelectorAll('.chip');
          for(let chipsItem of listValue) {
            this.keyWordList.push(chipsItem.textContent);
          }
        } else if (item.classList.contains('selectMultiple')) {
          let listSelectMultiple = [];
          for(let el of item.querySelectorAll('.selected')) {
            listSelectMultiple.push(el.textContent);
          }
          if(item.querySelector('.selected').classList.contains('disabled')) {
            listSelectMultiple = [];
          }
          let obj = {};
          obj[item.id] = listSelectMultiple;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else if (item.classList.contains('selectSingle')) {
          let selectSingle = item.querySelector('.selected').textContent || '';
          if(item.querySelector('.selected').classList.contains('disabled')) {
            selectSingle = '';
          }
          let obj = {};
          obj[item.id] = selectSingle;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else if (item.classList.contains('selectMultipleImage')) {
          let listSelectMultipleImage = [];
          for(let el of item.querySelectorAll('.selected')) {
            let obj = {};
            obj['name'] = el.textContent;
            obj['imgUrl'] = el.childNodes[0].localName === 'img' ? el.childNodes[0].attributes['src'].value : '';
            listSelectMultipleImage.push(obj);
          }
          if(item.querySelector('.selected').classList.contains('disabled')) {
            listSelectMultipleImage = [];
          }
          let obj = {};
          obj[item.id] = listSelectMultipleImage;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else if (item.classList.contains('selectSingleImage')) {
          let selectSingle = {};
          let querySelectSinglImage = item.querySelector('.selected');
          if(!querySelectSinglImage.classList.contains('disabled')) {
            selectSingle.name = querySelectSinglImage.textContent;
            selectSingle.imgUrl = querySelectSinglImage.childNodes[0].localName === 'img' ? querySelectSinglImage.childNodes[0].attributes['src'].value : '';
          }
          let obj = {};
          obj[item.id] = selectSingle;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else if (item.classList.contains('form-radio')) {
          let listRadioValue = item.querySelectorAll('.form-radio-item');
          let radioValue = '';
          for (let itemRadio of listRadioValue) {
            if (itemRadio.checked) {
              radioValue = itemRadio.value;
              break;
            }
          }
          let obj = {};
          obj[item.id] = radioValue;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else if (item.classList.contains('form-checkbox')) {
          let listCheckboxValue = item.querySelectorAll('.form-checkbox-item');
          let checkboxValue = [];
          for (let itemCheckbox of listCheckboxValue) {
            if (itemCheckbox.checked) {
              checkboxValue.push(itemCheckbox.value);
            }
          }
          let obj = {};
          obj[item.id] = checkboxValue;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value;
        } else {
          // console.log(item);
        }
      }
    },
    async submitFormData() {
      this.createProcess = true;
      await DocumentService.createDocument(this.$store.state.auth.user.username, this.structureId, DocumentStatus.Ready, 1, this.intermediateData/*, this.keyWordList*/).then(
      (response) => {
        this.documentData = response;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )}
  },
  beforeDestroy() {
    if(this.formSelect && this.formSelect.destroy) {
      this.formSelect.destroy()
    }
    if(this.formChips && this.formChips.destroy) {
      this.formChips.destroy()
    }
  },
  components:{
    CreateMessage
  }
}
</script>