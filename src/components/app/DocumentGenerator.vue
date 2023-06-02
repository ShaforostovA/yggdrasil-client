<template>
  <FullScreenLoader v-if="this.updateProcess" />
  <div class="documentGenerator-controller mb-5 flex justify-end">
    <button v-if="this.documentStatus === 'Готов' && this.$store.state.auth.user.roles.includes('ROLE_MODERATOR')" class="main-btn-yellow px-5 py-3 text-lg flex items-center gap-1" :disabled="!this.documentInfo.canChange" @click.prevent="remakeDocumentModal">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
      </svg>
      Переделать
    </button>
  </div>
  <div class="structure-info mb-6">
    <div v-if="this.documentStatus !== 'Архив' && !this.documentInfo.canChange && !this.loading" class="structure-info-message px-3 py-6 text-center text-yellow-600 rounded-lg border-yellow-600 border-2 mb-6 text-lg">
      Шаблон документа деактивирован. Редактирование будет возможно, когда шаблон будет вновь активен.
    </div>
    <div class="document-info flex justify-between">
      <div class="document-info-left">
        <h4 v-if="this.documentStatus === 'Готов'" class="document-status text-lg mb-3">Статус: <span class="inline-block text-white bg-green-700 py-1 px-3 rounded-lg">{{ this.documentStatus }}</span></h4>
        <h4 v-else-if="this.documentStatus === 'Переделать'" class="document-status text-lg">Статус: <span class="inline-block text-white bg-red-700 py-1 px-3 rounded-lg">{{ this.documentStatus }}</span></h4>
        <h4 v-else-if="this.documentStatus === 'Черновик'" class="document-status text-lg">Статус: <span class="inline-block text-white bg-yellow-600 py-1 px-3 rounded-lg">{{ this.documentStatus }}</span></h4>
        <h4 v-else-if="this.documentStatus === 'Архив'" class="document-status text-lg">Статус: <span class="inline-block text-white bg-gray-500 py-1 px-3 rounded-lg">{{ this.documentStatus }}</span></h4>
        <h4 class="document-type text-lg mb-3">Тип: <span>{{ this.documentType }}</span></h4>
        <h4 class="document-owner text-lg mb-3">Создал: <span class="inline-block py-1 px-3 rounded-lg bg-[var(--color-main)] text-white">{{ this.documentInfo.user ? this.documentInfo.user.id === this.$store.state.auth.user.id ? 'Вы' : `${this.documentInfo.user.lastName} ${this.documentInfo.user.name} ${this.documentInfo.user.patronymic}` : 'Пользователь' }}</span></h4>
      </div>
      <div class="document-info-right">
        <h4 class="document-owner text-lg mb-1">Дата создания: <span>{{ this.documentInfo.user ? this.$normaldate(this.documentInfo.dateCreate) : 'Пользователь' }}</span></h4>
        <h4 class="document-owner text-lg">Дата обновления: <span>{{ this.documentInfo.user ? this.$normaldate(this.documentInfo.dateUpdate) : 'Пользователь' }}</span></h4>
      </div>
    </div>
    <h2 class="structure-name text-2xl mb-3">Наименование: {{ this.structureInfo.name }}</h2>
    <h4 class="structure-description text-xl">Описание: {{ this.structureInfo.description }}</h4>
  </div>
  <div class="documentGenerator flex-grow flex">
    <Loader v-if="this.loading" :style="'margin: 0 auto; padding-top: 30px;'"/>
    <form v-else action="" class="createForm flex-grow border rounded-xl shadow-md overflow-hidden py-3 px-5 mb-6 flex-col flex">

      <div class="formField">
        <div class="formField-name mb-1 ml-5 relative">Ключевые слова:</div>
        <div class="chips" v-on:keyup.enter="submitDocumentKeyWords" v-on:keyup.delete="submitDocumentKeyWords" @click="submitDocumentKeyWords" @blur="submitDocumentKeyWords"></div>
        <div class="formField-description mt-1">Укажите ключевые слова (для добавления слов необходимо выбрать их из выпадающего списка или ввести с клавиатуры и нажать enter).</div>
      </div>

      <div class="formField" v-for="(item, index) of this.structureData.data" :key="item.id">
        <div v-if="this.checkAppearance(item.id)" class="formField-name mb-1 ml-5 relative" :class="{required: (item.required)}">{{`Поле №${index+1} — ` + (item.name === '' ? 'Заполните поле:' : item.name)}}</div>
        
        <input v-if="item.type === 'text' && this.checkAppearance(item.id)" @blur="receiveFormData" :disabled="!this.documentInfo.canChange || !this.updateMode" v-bind:id="item.id" type="text" name="" v-bind:minlength="item.minLength" v-bind:maxlength="item.maxLength"  v-bind:placeholder="item.placeholder" v-bind:value="this.intermediateDataCheck[item.id]" class="input-text input-field">
        
        <input v-else-if="item.type === 'number' && this.checkAppearance(item.id)" @click="receiveFormData" @blur="receiveFormData" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" v-bind:id="item.id" type="number" name="" v-bind:min="item.minValue" v-bind:max="item.maxValue" v-bind:step="item.stepValue" v-bind:value="this.intermediateDataCheck[item.id]"  v-bind:placeholder="item.placeholder" class="input-text input-field">
        
        <input v-else-if="item.type === 'date' && this.checkAppearance(item.id)" @blur="receiveFormData" :min="item.minValue" :max="item.maxValue" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" v-bind:id="item.id" type="date" name="" v-bind:value="this.intermediateDataCheck[item.id]" v-bind:placeholder="item.placeholder" class="input-text input-field">

        <div v-else-if="item.type === 'selectMultiple' && this.checkAppearance(item.id)" @click="receiveFormData" v-bind:id="item.id" class="input-field col s12 selectMultiple">
          <select multiple v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" @click="receiveFormData">
            <option value="" disabled>{{ item.placeholder }}</option>
            <option v-for="(option, optionIndex) of item.options.data" :key="option" v-bind:value="optionIndex" v-bind:selected="this.userResponse[item.id] !== undefined ? this.userResponse[item.id].includes(optionIndex) ? true : false : false">{{ optionIndex }}</option>
          </select>
        </div>

        <div v-else-if="item.type === 'selectSingle' && this.checkAppearance(item.id)" @click="receiveFormData" v-bind:id="item.id" class="input-field col s12 selectSingle">
          <select v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" @click="receiveFormData">
            <option value="" disabled>{{ item.placeholder }}</option>
            <option v-for="(option, optionIndex) of item.options.data" :key="option" v-bind:value="optionIndex" v-bind:selected="this.userResponse[item.id] !== undefined ? this.userResponse[item.id].includes(optionIndex) ? true : false : false">{{ optionIndex }}</option>
          </select>
        </div>

        <div v-else-if="item.type === 'selectMultipleImage' && this.checkAppearance(item.id)" @click="receiveFormData" @blur="receiveFormData" v-bind:id="item.id" class="input-field col s12 m6 selectMultipleImage">
          <select multiple class="icons" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" @click="receiveFormData">
            <option value="" disabled>{{ item.placeholder }}</option>
            <option v-for="option of this.employeesList" :key="option.id"  v-bind:value="option.id" v-bind:data-icon="option.imgUrl" v-bind:selected="this.userResponse[item.id] !== undefined ? createUserSelectMult(this.userResponse[item.id], `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})`, option.imgUrl) : false">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
          </select>
        </div>

        <div v-else-if="item.type === 'selectSingleImage' && this.checkAppearance(item.id)" @click="receiveFormData" v-bind:id="item.id" class="input-field col s12 m6 selectSingleImage">
          <select class="icons" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" @click="receiveFormData">
            <option value="" disabled>{{ item.placeholder }}</option>
            <option v-for="option of this.employeesList" :key="option.id" v-bind:value="option.id" v-bind:data-icon="option.imgUrl" v-bind:selected="this.userResponse[item.id] !== undefined && this.userResponse[item.id].imgUrl === option.imgUrl && this.userResponse[item.id].name === `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` ? true : false ">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
          </select>
        </div>
<!-- -------------------------------- -->
        <div v-else-if="item.type === 'selectMultipleStudent' && this.checkAppearance(item.id)" @click="receiveFormData" @blur="receiveFormData" v-bind:id="item.id" class="input-field col s12 m6 selectMultipleStudent">
          <select multiple class="icons" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" @click="receiveFormData">
            <option value="" disabled>{{ item.placeholder }}</option>
            <option v-for="option of this.studentList" :key="option.id"  v-bind:value="option.id" v-bind:data-icon="option.imgUrl" v-bind:selected="this.userResponse[item.id] !== undefined ? createStudentSelectMult(this.userResponse[item.id], `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})`) : false">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
          </select>
        </div>

        <div v-else-if="item.type === 'selectSingleStudent' && this.checkAppearance(item.id)" @click="receiveFormData" v-bind:id="item.id" class="input-field col s12 m6 selectSingleStudent">
          <select class="icons" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" @click="receiveFormData">
            <option value="" disabled>{{ item.placeholder }}</option>
            <option v-for="option of this.studentList" :key="option.id" v-bind:value="option.id" v-bind:data-icon="option.imgUrl" v-bind:selected="this.userResponse[item.id] !== undefined && this.userResponse[item.id].name === `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` ? true : false ">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
          </select>
        </div>
<!-- -------------------------------- -->
        <div v-else-if="item.type === 'radio' && this.checkAppearance(item.id)" @click="receiveFormData" v-bind:id="item.id" class="form-radio inline-block gap-3 input-field" v-bind:name="item.id">
          <label v-for="(option, optionIndex) of item.options.data" :key="option" class="block">
            <input type="radio" v-bind:name="'group' + (item.id)" v-bind:checked="optionIndex === this.userResponse[item.id]" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" id="" v-bind:value="optionIndex" class="form-radio-item with-gap block h-5 w-5">
            <span>{{ optionIndex }}</span>
          </label>
        </div>

        <div v-else-if="item.type === 'checkbox' && this.checkAppearance(item.id)" @click="receiveFormData" v-bind:id="item.id" class="form-checkbox inline-block gap-3 input-field">
          <label v-for="(option, optionIndex) of item.options.data" :key="option" class="block">
            <input type="checkbox" class="form-checkbox-item filled-in" v-bind:checked="this.userResponse[item.id] !== undefined ? this.userResponse[item.id].includes(optionIndex) ? true : false : false" v-bind:disabled="!this.documentInfo.canChange || !this.updateMode" v-bind:value="optionIndex"/>
            <span>{{ optionIndex }}</span>
          </label>
        </div>

        <div class="formField-description mt-1" v-if="item.description && this.checkAppearance(item.id)">{{item.description}}</div>
      </div>
      <div class="document-generator-menu py-6 flex justify-end flex-grow items-end">
        <button v-if="this.documentStatus !== 'Черновик' && this.updateMode" @click.prevent="rajectChangesModal" class="main-btn-red px-5 py-3 text-2xl flex items-center gap-1" type="submit" v-bind:disabled="(!this.documentInfo.canChange && !this.updateMode)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          Отменить
        </button>
        <button v-if="!this.updateMode && this.documentStatus !== 'Архив'" class="main-btn px-5 py-3 text-2xl flex items-center gap-1" @click.prevent="changeOperationMode" v-bind:disabled="(!this.documentInfo.canChange && !this.updateMode) || (!this.roles.includes(this.currentUser.roles[0]))">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
          Изменить
        </button>
        <button v-else-if="this.updateMode" class="main-btn px-5 py-3 text-2xl flex items-center gap-1" @click.prevent="saveDocumentData(); clickButtonUpdate()" v-bind:disabled="(!this.documentInfo.canChange && !this.updateMode)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Сохранить
        </button>
        <button v-if="(this.documentStatus === 'Черновик' || (this.documentStatus === 'Переделать' && this.updateMode)) && this.documentFullReady" class="main-btn px-5 py-3 text-2xl flex items-center gap-1" @click.prevent="publication" v-bind:disabled="(!this.documentInfo.canChange && !this.updateMode)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Опубликовать
        </button>
      </div>
    </form>
    <div id="downStatus" class="modal modal-fixed-footer modalDown">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-6 text-center">Не все запрашиваемые поля заполнены, статус вашего документа будет изменен на "Черновик".</p>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите применить изменения к документу №{{ this.documentId }}?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn-red inline-block px-5 py-3 w-[150px] text-center text-xl" @click="saveChanges">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
    <div id="remakeStatus" class="modal modal-fixed-footer modalRemake">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-6 text-center">Не все запрашиваемые поля заполнены, статус документа сотрудника будет изменен на "Переделать".</p>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите применить изменения к документу №{{ this.documentId }}?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn-red inline-block px-5 py-3 w-[150px] text-center text-xl" @click="saveChangesRemake">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
    <div id="remakeApproval" class="modal modal-fixed-footer modalRemakeApproval">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите изменить статус документа №{{ this.documentId }} на "Переделать"?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl" @click="remakeDocument">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
    <div id="raject" class="modal modal-fixed-footer modalRaject">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите отменить изменения документа №{{ this.documentId }}?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn-yellow inline-block px-5 py-3 w-[150px] text-center text-xl" @click="rajectChanges">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
    <div id="updateDocumentData" class="modal modal-fixed-footer modalUpdateDocumentData">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите измененить документ №{{ this.documentId }}?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl" @click="saveDocumentDataRev">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
  </div>
</template>
<script>
import KeyWordService from '@/store/services/key-word.service'
import DocumentService from '@/store/services/document.servive'
import UserService from '@/store/services/user.service'
import CreateMessage from '@/components/app/CreateMessage.vue'
import messages from '@/utils/messages'
import keyWordService from '@/store/services/key-word.service'
import { DocumentStatus } from '@/types/DocumentStatus'
import { UserRoles } from "@/types/Roles"
import studentService from '@/store/services/student.service'

export default {
  name: "DocumentGenerator",
  props: ['documentId'],
  data: () => ({
    formSelect: null,
    formChips: null,
    modalDown: null,
    modalRemake: null,
    modalRemakeApproval: null,
    modalUpdateDocumentData: null,
    modalRaject: null,
    chipsData: {},
    chipsIdMap: {},
    structureData: {}, // Информация о структуре
    employeesList: [], // Сотрудники
    message: '', // Сообщение об ошибке
    structureInfo: {}, // Информация о структуре документа
    updateProcess: false, // Идет ли процесс обновления
    updateMode: false, // Включен ли режим редактирования
    documentData: '', // Информация о сохраненном документе
    departmentData: '', // Информации кафедры + все сотрудники
    documentInfo: {}, // Вся информация документа
    documentDataDB: '',
    userKeyWords: [],
    userResponse: {},
    documentStatus: '',
    documentType: '',
    loading: true,
    documentFullReady: false, // Когда все поля, котоыре появились и имеют параметр required - true, документ полностью готов
    appearanceField: {}, // Запрашиваемые значения для появления полей
    intermediateData: { 'userResponse': [] }, // Промежуточные данные
    intermediateDataCheck: {}, // Данные для появления полей
    requiredFieldMap: {}, // id поля и является ли оно обязательным
    clickSave: true,
    clickUpdate: false,
    isPublicate: false,
    roles: [UserRoles.User, UserRoles.Moderator],
    showMess: true,
    studentList: [],
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
    );
    await DocumentService.getDocument(this.documentId).then(
      (response) => {
        this.documentInfo = response.data;
        this.structureInfo.name = response.data.documentStructure.name;
        this.documentStatus = this.documentInfo.documentStatus.name;
        this.documentType = this.documentInfo.documentStructure.documentType.name;
        this.structureInfo.description = response.data.documentStructure.description;
        this.structureData = response.data.documentStructure.structure;
        while(typeof this.structureData === 'string') {
          this.structureData = JSON.parse(this.structureData);
        }
        this.documentDataDB = JSON.parse(response.data.documentData);
        // console.log(typeof this.documentDataDB === 'st');
        while(typeof this.documentDataDB === 'string') {
          this.documentDataDB = JSON.parse(this.documentDataDB)
        }
        // console.log(this.documentDataDB);
        // console.log(this.structureData.data);
        for(let dataItem of this.structureData.data) {
          this.requiredFieldMap[dataItem.id] = dataItem.required;
          let findVel;
          for(let dItem of this.documentDataDB.userResponse) {
            if (Object.keys(dItem)[0] === dataItem.id) findVel = dItem[dataItem.id];
          }
          this.intermediateDataCheck[dataItem.id] = findVel;
          if (typeof dataItem.externalDependency !== undefined) {
            this.appearanceField[dataItem.id] = dataItem.externalDependency;
          }
        }
        // console.log(this.intermediateDataCheck);
        // console.log(this.appearanceField);
        for(let keyWord of this.documentInfo.keyWords) {
          this.userKeyWords.push({tag: keyWord.name})
        }
        for(let item of this.documentDataDB.userResponse) {
          for(let key in item) {
            this.userResponse[key] = item[key];
          }
        }
        // console.log(this.userResponse);
        let canPublic;
        // console.log(this.documentDataDB);
        for(let req of this.documentDataDB.userResponse) {
          canPublic = true;
          if (this.requiredFieldMap[Object.keys(req)[0]] && (req[Object.keys(req)[0]] === "" || req[Object.keys(req)[0]] === [] || req[Object.keys(req)[0]] === null || req[Object.keys(req)[0]] === '' || (typeof req[Object.keys(req)[0]] === 'object' && req[Object.keys(req)[0]].length === 0))) {
            canPublic = false;
            break;
          }
        }
        this.documentFullReady = canPublic;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    );
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
    );
    await studentService.getAllForDocumentStudent().then(
      (response) => {
        this.studentList = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    await UserService.getUserDepartment(this.$store.state.auth.user.username).then(
      (response) => {
        this.departmentData = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    );
    // let canPublic = false;
    // for(let req of this.intermediateData.userResponse) {
    //   canPublic = true;
    //   console.log(req[Object.keys(req)[0]] );
    //   if (this.requiredFieldMap[Object.keys(req)[0]] && (req[Object.keys(req)[0]] === "" || req[Object.keys(req)[0]] === [] || req[Object.keys(req)[0]] === null || req[Object.keys(req)[0]] === '' || (typeof req[Object.keys(req)[0]] === 'object' && req[Object.keys(req)[0]].length === 0))) {
    //     canPublic = false;
    //     break;
    //   }
    // }
    // this.documentFullReady = canPublic;
    setTimeout(() => {
      this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
      this.formChips = M.Chips.init(document.querySelectorAll('.chips'), {
        limit: Infinity,
        data: this.userKeyWords,
        placeholder: 'Введите ключевые слова',
        secondaryPlaceholder: '+Слово',
        autocompleteOptions: {
          data: this.chipsData,
          limit: Infinity,
          minLength: 0
        }
      });
      this.modalDown = M.Modal.init(document.querySelector('.modalDown'), {});
      this.modalRemake = M.Modal.init(document.querySelector('.modalRemake'), {});
      this.modalRemakeApproval = M.Modal.init(document.querySelector('.modalRemakeApproval'), {});
      this.modalRaject = M.Modal.init(document.querySelector('.modalRaject'), {});
      this.modalUpdateDocumentData = M.Modal.init(document.querySelector('.modalUpdateDocumentData'), {});
    }, 0);
    // Добавил проверку возможности публикации, надо тестить
    
    // console.log(this.documentFullReady);
    // -----------------------------------------------------
    this.updateMode = this.documentStatus === 'Черновик' || this.updateMode;
    this.loading = false;
    if (this.$route.query.message === 'documentChange') {
      this.$message(messages[this.$route.query.message])
      this.updateMode = true;
    }
  },
  methods: {
    async remakeDocument() {
      this.updateProcess = true;
      await this.updateDocumentStatus(DocumentStatus.Remake);
      this.updateProcess = false;
      this.$emit("updateParent")
      this.isPublicate = true
    },
    remakeDocumentModal() {
      this.modalRemakeApproval.open();
    },
    async publication() {
      this.updateProcess = true;
      await this.submitFormData();
      await this.updateDocumentStatus(DocumentStatus.Ready);
      this.updateProcess = false;
      this.$router.push(`/document/${this.documentId}`)
      this.$emit("updateParent")
      this.isPublicate = true
    },
    clickButtonUpdate() {
      this.clickUpdate = true;
    },
    async saveChanges() {
      this.updateProcess = true;
      await this.submitFormData();
      await this.updateDocumentStatus(DocumentStatus.Draft);
      this.$router.push(`/document/${this.documentId}`)
      this.updateProcess = false;
      this.$emit("updateParent")
    },
    async saveChangesRemake() {
      this.updateProcess = true;
      await this.submitFormData();
      await this.updateDocumentStatus(DocumentStatus.Remake);
      this.$router.push(`/document/${this.documentId}`)
      this.updateProcess = false;
      this.$emit("updateParent")
    },
    async changeOperationMode() {
      this.updateMode = true;
      this.$router.push(`/document/${this.documentId}?message=documentChange`)
      this.$emit("updateParent")
    },
    rajectChanges() {
      this.modalRaject.close();
      this.updateMode = false;
      this.loading = true;
      this.$message('Отмена изменений');
      this.$router.push(`/document/${this.documentId}`)
      
      setTimeout(() => {
        window.location.reload()
      }, 1300)
    },
    rajectChangesModal() {
      this.modalRaject.open();
    },
    checkAppearance(fieldId) {
      if (this.appearanceField[fieldId] === undefined) {
        return true;
      } else if (this.intermediateDataCheck[this.appearanceField[fieldId].id] === undefined) {
        return false;
      }  
      
      if(Array.isArray(this.userResponse[this.appearanceField[fieldId].id])) {
        return this.userResponse[this.appearanceField[fieldId].id].includes(this.appearanceField[fieldId].value)
      }
      return this.intermediateDataCheck[this.appearanceField[fieldId].id].toString() === this.appearanceField[fieldId].value.toString();
    },
    createUserSelectMult(userList, name, imgUrl) {
      for(let arrItem of userList) {
        if (arrItem.name === name && arrItem.imgUrl === imgUrl) {
          return true;
        }
      }
      return false;
    },
    createStudentSelectMult(studentList, name) {
      for(let arrItem of studentList) {
        if (arrItem.name === name) {
          return true;
        }
      }
      return false;
    },
    async submitDocumentKeyWords() {
      setTimeout(() => {
        let element = document.querySelectorAll('.chip');
        if (element != null) {
          let keyWords = [];
          for(let chipsItem of element) {
            keyWords.push(chipsItem.textContent.trim());
            if(this.chipsData[chipsItem.textContent] === undefined) {
              this.chipsData[chipsItem.textContent] = null;
            }
          }
          keyWordService.attachKeyWord(this.documentId, keyWords)
        } 
      }, 0)
    },
    async receiveFormData() {
      this.intermediateData = { userResponse: [] };
      let element = document.querySelectorAll('.input-field');

      for(let item of element) {
        if(item.localName === 'input') {
          let obj = {};
          obj[item.id] = item.value.trim();
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = item.value.trim();
        } else if (item.classList.contains('selectMultiple')) {
          let listSelectMultiple = [];
          for(let el of item.querySelectorAll('.selected')) {
            listSelectMultiple.push(el.textContent);
          }
          let obj = {};
          obj[item.id] = listSelectMultiple;

          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = listSelectMultiple;
        } else if (item.classList.contains('selectSingle')) {
          let selectSingle = item.querySelector('.selected').textContent || '';
          if(item.querySelector('.selected').classList.contains('disabled')) {
            selectSingle = '';
          }
          let obj = {};
          obj[item.id] = selectSingle;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = selectSingle;
        } else if (item.classList.contains('selectMultipleImage')) {
          let listSelectMultipleImage = [];
          for(let el of item.querySelectorAll('.selected')) {
            if(el.classList.contains('disabled')){
              continue;
            }
            let obj = {};
            obj['name'] = el.textContent;
            obj['imgUrl'] = el.childNodes[0].localName === 'img' ? el.childNodes[0].attributes['src'].value : '';
            listSelectMultipleImage.push(obj);
          }

          let obj = {};
          obj[item.id] = listSelectMultipleImage;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = listSelectMultipleImage;
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
          this.intermediateDataCheck[item.id] = selectSingle;
        } else if (item.classList.contains('selectMultipleStudent')) {
          let listSelectMultipleImage = [];
          for(let el of item.querySelectorAll('.selected')) {
            if(el.classList.contains('disabled')){
              continue;
            }
            let obj = {};
            obj['name'] = el.textContent;
            obj['imgUrl'] = el.childNodes[0].localName === 'img' ? el.childNodes[0].attributes['src'].value : '';
            listSelectMultipleImage.push(obj);
          }

          let obj = {};
          obj[item.id] = listSelectMultipleImage;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = listSelectMultipleImage;
        } else if (item.classList.contains('selectSingleStudent')) {
          let selectSingle = {};
          let querySelectSinglImage = item.querySelector('.selected');
          if(!querySelectSinglImage.classList.contains('disabled')) {
            selectSingle.name = querySelectSinglImage.textContent;
            selectSingle.imgUrl = querySelectSinglImage.childNodes[0].localName === 'img' ? querySelectSinglImage.childNodes[0].attributes['src'].value : '';
          }
          let obj = {};
          obj[item.id] = selectSingle;
          this.intermediateData.userResponse.push(obj);
          this.intermediateDataCheck[item.id] = selectSingle;
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
          this.intermediateDataCheck[item.id] = radioValue;
          // userFormData.userResponse.push(obj);
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
          this.intermediateDataCheck[item.id] = checkboxValue;
        } else if (item.classList.contains('chips')){

        } else {
          // console.log(item);
        }
      }
      // console.log(this.intermediateData);
      if(this.documentStatus === 'Черновик') {
        this.submitFormData();
      }

      setTimeout(() => {
        let canPublic;
        // console.log(this.intermediateData.userResponse);
        for(let req of this.intermediateData.userResponse) {
          // console.log(typeof req[Object.keys(req)[0]] );
          if (this.requiredFieldMap[Object.keys(req)[0]] && (req[Object.keys(req)[0]] === "" || req[Object.keys(req)[0]] === [] || req[Object.keys(req)[0]] === null || req[Object.keys(req)[0]] === '' || (typeof req[Object.keys(req)[0]] === 'object' && req[Object.keys(req)[0]].length === 0))) {
            canPublic = false;
            // console.log(canPublic);
            break;
          }
          canPublic = true;
        }
        this.documentFullReady = canPublic;
      }, 300)

      setTimeout(() => {
        this.intermediateData = { userResponse: [] };
        let element = document.querySelectorAll('.input-field');

        for(let item of element) {
          if(item.localName === 'input') {
            let obj = {};
            obj[item.id] = item.value.trim();
            this.intermediateData.userResponse.push(obj);
            this.intermediateDataCheck[item.id] = item.value.trim();
          } else if (item.classList.contains('selectMultiple')) {
            let listSelectMultiple = [];
            for(let el of item.querySelectorAll('.selected')) {
              listSelectMultiple.push(el.textContent);
            }
            // if(item.querySelector('.selected').classList.contains('disabled')) {
            //   listSelectMultiple = [];
            // }
            let obj = {};
            obj[item.id] = listSelectMultiple;
            this.intermediateData.userResponse.push(obj);
            this.intermediateDataCheck[item.id] = listSelectMultiple;
          } else if (item.classList.contains('selectSingle')) {
            let selectSingle = item.querySelector('.selected').textContent || '';
            if(item.querySelector('.selected').classList.contains('disabled')) {
              selectSingle = '';
            }
            let obj = {};
            obj[item.id] = selectSingle;
            this.intermediateData.userResponse.push(obj);
            this.intermediateDataCheck[item.id] = selectSingle;
          } else if (item.classList.contains('selectMultipleImage')) {
            let listSelectMultipleImage = [];
            for(let el of item.querySelectorAll('.selected')) {
              if(el.classList.contains('disabled')){
                continue;
              }
              let obj = {};
              obj['name'] = el.textContent;
              obj['imgUrl'] = el.childNodes[0].localName === 'img' ? el.childNodes[0].attributes['src'].value : '';
              listSelectMultipleImage.push(obj);
            }

            let obj = {};
            obj[item.id] = listSelectMultipleImage;
            this.intermediateData.userResponse.push(obj);
            this.intermediateDataCheck[item.id] = listSelectMultipleImage;
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
            this.intermediateDataCheck[item.id] = selectSingle;
          } else if (item.classList.contains('selectMultipleStudent')) {
            let listSelectMultipleImage = [];
            for(let el of item.querySelectorAll('.selected')) {
              if(el.classList.contains('disabled')){
                continue;
              }
              let obj = {};
              obj['name'] = el.textContent;
              obj['imgUrl'] = el.childNodes[0].localName === 'img' ? el.childNodes[0].attributes['src'].value : '';
              listSelectMultipleImage.push(obj);
            }

            let obj = {};
            obj[item.id] = listSelectMultipleImage;
            this.intermediateData.userResponse.push(obj);
            this.intermediateDataCheck[item.id] = listSelectMultipleImage;
          } else if (item.classList.contains('selectSingleStudent')) {
            let selectSingle = {};
            let querySelectSinglImage = item.querySelector('.selected');
            if(!querySelectSinglImage.classList.contains('disabled')) {
              selectSingle.name = querySelectSinglImage.textContent;
              selectSingle.imgUrl = querySelectSinglImage.childNodes[0].localName === 'img' ? querySelectSinglImage.childNodes[0].attributes['src'].value : '';
            }
            let obj = {};
            obj[item.id] = selectSingle;
            this.intermediateData.userResponse.push(obj);
            this.intermediateDataCheck[item.id] = selectSingle;
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
            this.intermediateDataCheck[item.id] = radioValue;
            // userFormData.userResponse.push(obj);
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
            this.intermediateDataCheck[item.id] = checkboxValue;
          } else if (item.classList.contains('chips')){

          }
        }
        let canPublic;
        // console.log(this.intermediateData.userResponse);
        for(let req of this.intermediateData.userResponse) {
          // console.log(typeof req[Object.keys(req)[0]] );
          if (this.requiredFieldMap[Object.keys(req)[0]] && (req[Object.keys(req)[0]] === "" || req[Object.keys(req)[0]] === [] || req[Object.keys(req)[0]] === null || req[Object.keys(req)[0]] === '' || (typeof req[Object.keys(req)[0]] === 'object' && req[Object.keys(req)[0]].length === 0))) {
            canPublic = false;
            // console.log(canPublic);
            break;
          }
          canPublic = true;
        }
        this.documentFullReady = canPublic;
      }, 300)
    },
    async submitFormData() {
      this.updateProcess = true;
      if(this.documentStatus !== 'Черновик' || this.clickSave) {
        this.clickSave = false;
        this.receiveFormData();
      }
      
      await DocumentService.updateDocumentData(this.documentId, this.intermediateData).then(
        (response) => {
          // console.log(this.documentInfo);
          this.documentInfo = response.data;
          this.structureInfo.name = response.data.documentStructure.name;
          this.documentStatus = this.documentInfo.documentStatus.name;
          this.documentType = this.documentInfo.documentStructure.documentType.name;
          this.structureInfo.description = response.data.documentStructure.description;
          this.structureData = response.data.documentStructure.structure;
          while(typeof this.structureData === 'string') {
            this.structureData = JSON.parse(this.structureData);
          }
          this.documentDataDB = JSON.parse(response.data.documentData);
          // console.log(typeof this.documentDataDB === 'st');
          while(typeof this.documentDataDB === 'string') {
            this.documentDataDB = JSON.parse(this.documentDataDB)
          }
          // console.log(this.documentDataDB);
          // console.log(this.structureData.data);
          for(let dataItem of this.structureData.data) {
            this.requiredFieldMap[dataItem.id] = dataItem.required;
            let findVel;
            for(let dItem of this.documentDataDB.userResponse) {
              if (Object.keys(dItem)[0] === dataItem.id) findVel = dItem[dataItem.id];
            }
            this.intermediateDataCheck[dataItem.id] = findVel;
            if (typeof dataItem.externalDependency !== undefined) {
              this.appearanceField[dataItem.id] = dataItem.externalDependency;
            }
          }
          // console.log(this.intermediateDataCheck);
          for(let keyWord of this.documentInfo.keyWords) {
            this.userKeyWords.push({tag: keyWord.name})
          }
          for(let item of this.documentDataDB.userResponse) {
            for(let key in item) {
              this.userResponse[key] = item[key];
            }
          }

          this.documentData = response;
          if (this.showMess) {
            this.$message(`Документ №${this.documentId} обновлен`);
            this.showMess = false;
          } else {
            this.showMess = true;
          }
          
          let canPublic = true;
          for(let req of this.intermediateData.userResponse) {
            if (this.requiredFieldMap[Object.keys(req)[0]] && (req[Object.keys(req)[0]].length === 0 || req[Object.keys(req)[0]] === "" || req[Object.keys(req)[0]] === [] || req[Object.keys(req)[0]] === null || req[Object.keys(req)[0]] === '' || (typeof req[Object.keys(req)[0]] === 'object' && req[Object.keys(req)[0]].length === 0))) {
              canPublic = false;
              break;
            }
          }
          this.documentFullReady = canPublic;
          this.clickSave = true;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      await DocumentService.getDocument(this.documentId).then(
        (response) => {
          // console.log(response.data);
          this.documentInfo = response.data;
          this.structureInfo.name = response.data.documentStructure.name;
          this.documentStatus = this.documentInfo.documentStatus.name;
          this.documentType = this.documentInfo.documentStructure.documentType.name;
          this.structureInfo.description = response.data.documentStructure.description;
          this.structureData = response.data.documentStructure.structure;
          while(typeof this.structureData === 'string') {
            this.structureData = JSON.parse(this.structureData);
          }
          this.documentDataDB = JSON.parse(response.data.documentData);
          // console.log(typeof this.documentDataDB === 'st');
          while(typeof this.documentDataDB === 'string') {
            this.documentDataDB = JSON.parse(this.documentDataDB)
          }
          // console.log(this.documentDataDB);
          // console.log(this.structureData.data);
          for(let dataItem of this.structureData.data) {
            this.requiredFieldMap[dataItem.id] = dataItem.required;
            let findVel;
            for(let dItem of this.documentDataDB.userResponse) {
              if (Object.keys(dItem)[0] === dataItem.id) findVel = dItem[dataItem.id];
            }
            this.intermediateDataCheck[dataItem.id] = findVel;
            if (typeof dataItem.externalDependency !== undefined) {
              this.appearanceField[dataItem.id] = dataItem.externalDependency;
            }
          }
          // console.log(this.intermediateDataCheck);
          // console.log(this.appearanceField);
          for(let keyWord of this.documentInfo.keyWords) {
            this.userKeyWords.push({tag: keyWord.name})
          }
          for(let item of this.documentDataDB.userResponse) {
            for(let key in item) {
              this.userResponse[key] = item[key];
            }
          }
          // console.log(this.userResponse);
          let canPublic;
          // console.log(this.documentDataDB);
          for(let req of this.documentDataDB.userResponse) {
            canPublic = true;
            if (this.requiredFieldMap[Object.keys(req)[0]] && (req[Object.keys(req)[0]] === "" || req[Object.keys(req)[0]] === [] || req[Object.keys(req)[0]] === null || req[Object.keys(req)[0]] === '' || (typeof req[Object.keys(req)[0]] === 'object' && req[Object.keys(req)[0]].length === 0))) {
              canPublic = false;
              break;
            }
          }
          this.documentFullReady = canPublic;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      if (this.documentFullReady && this.documentStatus === 'Готов') {
        this.updateMode = false;
      }
      this.updateProcess = false;
      // this.$router.push(`/document/${this.documentId}`)
      // window.location.reload()
      if (this.clickUpdate) {
        this.$router.replace(this.$route.path)
        this.clickUpdate = false;
        this.$emit("updateParent")
      }
      
      // window.location.reload()
    },
    async updateDocumentStatus(statusId) {
      this.updateProcess = true;
      await DocumentService.updateDocumentStatus(this.documentId, statusId).then(
        (response) => {
          this.documentData = response;
          this.$message(`Статус документа №${this.documentId} изменен на ${DocumentStatus[statusId]}`);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      this.updateProcess = false;
    },
    async saveDocumentData() {
      if (this.documentStatus === DocumentStatus[DocumentStatus.Ready] && !this.documentFullReady && this.documentInfo.user.id === this.$store.state.auth.user.id) {
        this.modalDown.open();
      } else if (this.documentStatus === DocumentStatus[DocumentStatus.Ready] && !this.documentFullReady && this.documentInfo.user.id !== this.$store.state.auth.user.id) {
        this.modalRemake.open();
      } else if (this.documentStatus !== DocumentStatus[DocumentStatus.Draft]) {
        this.modalUpdateDocumentData.open();
      } else {
        await this.submitFormData();
        this.$forceUpdate();
      }
    },
    async saveDocumentDataRev() {
    await this.submitFormData();
        this.$forceUpdate();
    }
  },
  beforeDestroy() {
    if(this.formSelect && this.formSelect.destroy) {
      this.formSelect.destroy()
    }
    if(this.formChips && this.formChips.destroy) {
      this.formChips.destroy()
    }
    if(this.modalDown && this.modalDown.destroy) {
      this.modalDown.destroy()
    }
    if(this.modalRemake && this.modalRemake.destroy) {
      this.modalRemake.destroy()
    }
    if(this.modalRemakeApproval && this.modalRemakeApproval.destroy) {
      this.modalRemakeApproval.destroy()
    }
    if(this.modalRaject && this.modalRaject.destroy) {
      this.modalRaject.destroy()
    }
    if(this.modalUpdateDocumentData && this.modalUpdateDocumentData.destroy) {
      this.modalUpdateDocumentData.destroy()
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  components:{
    CreateMessage
  }
}
</script>