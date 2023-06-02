<template>
  <div v-if="this.createMode" class="chapter-name text-3xl mb-6">
    Конструктор шаблона — Документы
  </div>
  <div v-else class="chapter-name text-3xl mb-6">
    Просмотр шаблона документов — №{{ this.$route.query.documnetStructure }}
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="w-full flex flex-col mb-6">
      <div class="menu-top mb-6 flex justify-between">
        <button class="main-btn py-3 px-5 inline-flex" @click.prevent="leavingPage">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>

        <div class="flex justify-between gap-5">

          <button v-if="!this.createMode && !this.updateMode && this.documnetStructureActive" class="main-btn-yellow px-5 py-3 text-lg flex items-center gap-1" @click.prevent="updateDocumentStatus">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
            Деактивировать
          </button>

          <button v-if="!this.createMode && !this.updateMode && !this.documnetStructureActive" class="main-btn px-5 py-3 text-lg flex items-center gap-1" @click.prevent="revActivationDocumentStructure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            Активировать
          </button>

          <button v-if="this.createMode" class="main-btn py-3 px-5 inline-flex" @click.prevent="createNewDocumentStructure" :disabled="this.structureLits.length === 0 || this.nameStructure === '' || this.typesDocuments.length === 0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Опубликовать
          </button>

          <button v-if="!this.canWritePoles && !this.updateMode" class="main-btn py-3 px-5 inline-flex" @click.prevent="onUpdateMode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
            Изменить
          </button>

          <button v-if="this.updateMode" class="main-btn-red py-3 px-5 flex items-center gap-1" @click.prevent="rajectChangesStructure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Отменить
          </button>

          <button v-if="this.updateMode" class="main-btn py-3 px-5 flex items-center gap-1" @click.prevent="modalupdateDocumentStructure" v-bind:disabled="(!this.updateMode) || this.listReadyPoles.length === 0 || this.nameStructure === ''">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Сохранить
          </button>
        </div>

        <div id="myModel" class="modal modal-fixed-footer" ref="modal">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-3 text-center">При уходе с этой страницы данные будет потеряны.</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <button @click.prevent="back" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Уйти</button>
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Остаться</a>
          </div>
        </div>

        <div id="updateStatusModel" class="modal modal-fixed-footer" ref="updateStatusModel">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-10 text-left">При деактивации шаблона, все документы на его основе будут заблокированы для редактирования.</p>
            <p class="text-2xl mb-3 text-center">Применить изменения?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Нет</a>
            <button @click.prevent="revActivationDocumentStructure" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Да</button>
          </div>
        </div>

        <div id="updateStructureModel" class="modal modal-fixed-footer" ref="updateStructureModel">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-xl mb-5 text-left">Так как вы убрали или добавили новые поля (даже если вы удалили старое поле и заново создали его или добавили новое поле и убрали его), статусы всех документы (которые созданы на основе этого шаблона), чей статус является "Готов" будут переведены в статус "Переделать".</p>
            <p class="text-xl mb-10 text-left">Если на основе данного шаблона есть документы в статусе "Архив", то данный шаблон будет деактивирован, а на его основе будет создан обновленный шаблон и все документы, кроме архивных будут переведены на новый шаблон и их статус будет изменен на "Переделать".</p>
            <p class="text-2xl mb-3 text-center">Применить изменения?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
            <button @click.prevent="updateDocumentStructure" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Да</button>
          </div>
        </div>

        <div id="createTypeModel" class="modal modal-fixed-footer" ref="typeCreateModel">
          <div class="modal-content flex flex-col">
            <div class="profile-data-input mb-3">
              <label for="" class="relative required">Название типа документа:</label>
              <div class="flex gap-3">
                <div class="w-full">
                  <input v-model.trim="typeName" v-on:input="checkDocumentTypeName" :class="{invalid: (v$.typeName.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Название типа документа" title="Введите название типа документа">
                  <div class="input-errors max-w-xl" v-for="error of v$.typeName.$errors" :key="error.$uid">
                    <div class="helper-text">{{  error.$message === "This field should be at least 1 characters long" ? "Длина этого поля должна составлять не менее 1 символа" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
                  </div>
                </div>
                <div v-if="this.typeName" class="self-center">
                  <div class="" v-if="this.validTypeName" title="Название свободено.">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-600">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="" v-else title="Тип документа с таким названием уже существует!">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-700">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отменить</a>
            <button @click.prevent="createDocumentType" :disabled="!this.validTypeName" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Сохранить</button>
          </div>
        </div>
          
        <form id="modelCreateStructure" class="modal modal-fixed-footer" ref="createStructureModal" @submit.prevent="saveStructurePole">
          <div class="modal-content flex flex-col">
            <div v-if="!this.modPole" class="modelCreateStructure-title text-2xl font-bold mb-3">
              Создание поля
            </div>
            <div v-else class="modelCreateStructure-title text-2xl font-bold mb-3">
              Редактирование поля
            </div>
            <div class="type-pole mb-6">
              <div v-if="this.typePole === 'text'" class="type-pole-select flex">
                <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-8 h-6 mr-2">
                  <path d="M16,6a1,1,0,0,0-1-1H3A1,1,0,0,0,3,7H8V18a1,1,0,0,0,2,0V7h5A1,1,0,0,0,16,6Zm5,5H15a1,1,0,0,0,0,2h2v5a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"/>
                </svg>
                Текстовое поле
              </div>
              <div v-if="this.typePole === 'number'" class="type-pole-select flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Числовое поле
              </div>
              <div v-if="this.typePole === 'select'" class="type-pole-select flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
                Выпадающий список
              </div>
              <div v-if="this.typePole === 'radio'" class="type-pole-select flex">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                  </g>
                </svg>
                Один вариант
              </div>
              <div v-if="this.typePole === 'checkbox'" class="type-pole-select flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-2">
                  <title>ionicons-v5-l</title>
                  <polyline points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                  <rect x="64" y="64" width="384" height="384" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/>
                </svg>
                Несколько вариантов
              </div>
              <div v-if="this.typePole === 'date'" class="type-pole-select flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                Дата
              </div>
              <div v-if="this.typePole === 'employees'" class="type-pole-select flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Выпадающий список сотрудников
              </div>
              <div v-if="this.typePole === 'students'" class="type-pole-select flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                Выпадающий список студентов
              </div>
            </div>
            <div class="profile-data-input mb-3">
              <label for="" class="relative required">Наименование поля:</label>
              <input v-model.trim="namePole" minlength="1" maxlength="100" required type="text" name="namePole" id="" class="input-text" placeholder="Наименование поля" title="Введите наименование поля" :disabled="!this.canWritePoles">
            </div>
            <div class="profile-data-input mb-3">
              <label for="" class="">Описание поля:</label>
              <input v-model.trim="descriptionPole" minlength="1" maxlength="255" type="text" name="descriptionPole" id="" class="input-text" placeholder="Описание поля" title="Введите описание поля" :disabled="!this.canWritePoles">
            </div>
            <div v-if="this.typePole !== 'date'" class="profile-data-input mb-3">
              <label for="" class="relative required">Текст внутри поля (placeholder):</label>
              <input v-model.trim="placeholderPole" minlength="1" maxlength="70" required type="text" name="placeholderPole" id="" class="input-text" placeholder="Текст внутри поля" title="Введите текст внутри поля" :disabled="!this.canWritePoles">
            </div>
            <div class="profile-data-input p-2">
              <label class="inline-flex self-center">
                <input v-model="this.requiredPole" type="checkbox" class="form-checkbox-item filled-in" v-bind:disabled="!this.canWritePoles"/>
                <span>Обязательное поле</span>
              </label>
            </div>
            <div class="menu-ling w-full h-1 rounded-lg bg-gray-300 block my-5"></div>
            <div class="">
              <div v-if="this.typePole === 'select' || this.typePole === 'employees' || this.typePole === 'students'" class="profile-data-input p-2">
                <label class="inline-flex self-center">
                  <input v-model="this.multiSelectPole" type="checkbox" class="form-checkbox-item filled-in" v-bind:disabled="!this.canWritePoles"/>
                  <span>Множественный выбор</span>
                </label>
              </div>
              <div v-if="this.typePole === 'select'" class="profile-data-input mb-3">
                <div class="flex justify-end mb-5">
                  <button @click.prevent="addSelectValue" class="main-btn inline-block px-2 py-2 text-center text-lg flex" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Добавить поле
                  </button>
                </div>
                <div v-if="!this.listSelects.length" class="mes text-gray-400 text-center select-none">Поля не добавлены</div>
                <label for="" class="flex gap-3 mb-2" v-for="(item, index) in this.listSelects" :key="index">
                  <span class=" w-[10%] self-center">Поле №{{ index + 1 }}:</span>
                  <input v-model.trim="this.listSelects[index]" minlength="0" maxlength="100" type="text" name="" id="" class="input-text" placeholder="Значение поля" title="Введите значение поля" :disabled="!this.canWritePoles">
                  <button @click.prevent="deleteSelectItem(index)" class="main-btn-red inline-block px-3 py-2 text-center text-lg flex" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </label>
              </div>
              <div v-if="this.typePole === 'radio'" class="profile-data-input mb-3">
                <div class="flex justify-end mb-5">
                  <button @click.prevent="addRadioValue" class="main-btn inline-block px-2 py-2 text-center text-lg flex" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Добавить поле
                  </button>
                </div>
                <div v-if="!this.listRadios.length" class="mes text-gray-400 text-center select-none">Поля не добавлены</div>
                <label for="" class="flex gap-3 mb-2" v-for="(item, index) in this.listRadios" :key="index">
                  <span class=" w-[10%] self-center">Поле №{{ index + 1 }}:</span>
                  <input v-model.trim="this.listRadios[index]" minlength="0" maxlength="100" type="text" name="" id="" class="input-text" placeholder="Значение поля" title="Введите значение поля" :disabled="!this.canWritePoles">
                  <button @click.prevent="deleteRadioItem(index)" class="main-btn-red inline-block px-3 py-2 text-center text-lg flex" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </label>
              </div>
              <div v-if="this.typePole === 'checkbox'" class="profile-data-input mb-3">
                <div class="flex justify-end mb-5">
                  <button @click.prevent="addCheckboxValue" class="main-btn inline-block px-2 py-2 text-center text-lg flex" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                    Добавить поле
                  </button>
                </div>
                <div v-if="!this.listCheckbox.length" class="mes text-gray-400 text-center select-none">Поля не добавлены</div>
                <label for="" class="flex gap-3 mb-2" v-for="(item, index) in this.listCheckbox" :key="index">
                  <span class=" w-[10%] self-center">Поле №{{ index + 1 }}:</span>
                  <input v-model.trim="this.listCheckbox[index]" minlength="0" maxlength="100" type="text" name="" id="" class="input-text" placeholder="Значение поля" title="Введите значение поля" :disabled="!this.canWritePoles">
                  <button @click.prevent="deleteCheckboxItem(index)" class="main-btn-red inline-block px-3 py-2 text-center text-lg flex" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </label>
              </div>
              <div v-if="this.typePole === 'text'"  class="profile-data-input mb-3">
                <label for="" class="">Минимальная длина строки:</label>
                <input v-model.trim="minLengthPole" min="0" max="1000" :disabled="!this.canWritePoles" type="number" name="" placeholder="Введите минимальную длину строки" class="input-text input-field">
              </div>
              <div v-if="this.typePole === 'text'" class="profile-data-input mb-3">
                <label for="" class="">Максимальная длина строки:</label>
                <input v-model.trim="maxLengthPole" min="0" max="1000" :disabled="!this.canWritePoles" type="number" name="" placeholder="Введите максимальную длину строки" class="input-text input-field">
              </div>
              <div v-if="this.typePole === 'number'" class="profile-data-input mb-3">
                <label for="" class="">Минимальное значение:</label>
                <input v-model.trim="minValuePole" :disabled="!this.canWritePoles" type="number" name="" placeholder="Введите минимальное значение" class="input-text input-field">
              </div>
              <div v-if="this.typePole === 'number'" class="profile-data-input mb-3">
                <label for="" class="">Максильное значение:</label>
                <input v-model.trim="maxValuePole" :disabled="!this.canWritePoles" type="number" name="" placeholder="Введите максильное значение" class="input-text input-field">
              </div>
              <div v-if="this.typePole === 'text' || this.typePole === 'number'" class="profile-data-input mb-3">
                <label for="" class="">Значение по умолчанию:</label>
                <input v-model.trim="defaultValuePole" minlength="0" maxlength="255" type="text" name="" id="" class="input-text" placeholder="Значение по умолчанию" title="Введите значение по умолчанию" :disabled="!this.canWritePoles">
              </div>
              <div v-if="this.typePole === 'date'" class="status-data-menu-date flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период дат с</div>
                <input type="date" v-model="minValueDatePole" :max="this.maxValueDatePole" class="input-text status-data-menu-date-input" :disabled="!this.canWritePoles">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input type="date" v-model="maxValueDatePole" :min="this.minValueDatePole" class="input-text status-data-menu-date-input" :disabled="!this.canWritePoles">
              </div>
            </div>
            <div class="menu-ling w-full h-1 rounded-lg bg-gray-300 block my-5"></div>
            <div class="bottom-menu mb-3">
              <div class="bottom-menu-title text-xl mb-1">Условие появления:</div>
              <!-- <div class="input-field col s12 selectSingle w-full">
                <select>
                  <option value="" disabled selected>Выберите поле</option>
                  <option v-for="(option) of this.structureLits" :key="option.id" v-bind:value="option.id">{{ option.name }}</option>
                </select>
              </div> -->
              <div class="flex justify-between items-center gap-5">
                <SelectVue v-if="!this.modPole" :selected="true" :content="this.structureLits" :message="'Выберите поле'" :multy="false" :disabled="!this.canWritePoles" :equalId="-1" :key="this.keySelectVis" class="fix-widtd-5-12 selected-condition-field"/>
                <SelectVue v-else :selected="this.poyavPoleId === ''" :content="this.usechArr" :message="'Выберите поле'" :multy="false" :disabled="!this.canWritePoles" :equalId="this.poyavPoleId" :key="this.keyModSelectVis" class="fix-widtd-5-12 selected-condition-field"/>
                <span class=" text-2xl font-bold select-none">=</span>
                <div class="profile-data-input w-5/12">
                  <!-- <label for="" class="">Значение по умолчанию:</label> -->
                  <input v-model.trim="poyavValue" minlength="0" maxlength="255" type="text" name="" id="" class="input-text" placeholder="Значение равенства" title="Введите значение при котором поле появится" :disabled="!this.canWritePoles">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex justify-evenly relative z-10">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
            <button v-if="!this.modPole" type="submit" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl" :disabled="!this.canWritePoles">Добавить</button>
            <button v-else type="submit" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl" :disabled="!this.canWritePoles">Обновить</button>
          </div>
        </form>
      </div>
      <div class="flex gap-5">
        <div class="object-panel w-1/5">
          <div class="object-panel-title text-2xl mb-3">
            Создание полей:
          </div>
          <ul class="object-panel-list">
            <li class="object-panel-item">
              <button class="flex items-center" @click.prevent="createTextPole">
                <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-8 h-6 mr-2">
                  <path d="M16,6a1,1,0,0,0-1-1H3A1,1,0,0,0,3,7H8V18a1,1,0,0,0,2,0V7h5A1,1,0,0,0,16,6Zm5,5H15a1,1,0,0,0,0,2h2v5a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"/>
                </svg>
                Текстовое поле
              </button>
            </li>
            <li class="object-panel-item" @click.prevent="createNumberPole">
              <button class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Числовое поле
              </button>
            </li>
            <li class="object-panel-item">
              <button class="flex items-center" @click.prevent="createSelectPole">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
                Выпадающий список
              </button>
            </li>
            <li class="object-panel-item">
              <button class="flex items-center" @click.prevent="createRadioPole">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                  </g>
                </svg>
                Один вариант
              </button>
            </li>
            <li class="object-panel-item">
              <button class="flex items-center" @click.prevent="createCheckboxPole">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-2">
                  <title>ionicons-v5-l</title>
                  <polyline points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                  <rect x="64" y="64" width="384" height="384" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/>
                </svg>
                Несколько вариантов
              </button>
            </li>
            <li class="object-panel-item" @click.prevent="createDatePole">
              <button class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                Дата
              </button>
            </li>
            <li class="object-panel-item">
              <button class="flex items-center" @click.prevent="createEmployeePole">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                Выпадающий список сотрудников
              </button>
            </li>
            <li class="object-panel-item">
              <button class="flex items-center" @click.prevent="createStudentPole">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                Выпадающий список студентов
              </button>
            </li>
          </ul>
        </div>
        <div class="structure-vue w-4/5 shadow-md rounded-xl border p-4">
          <div v-if="this.createMode === false" class="">
            <div class="mb-3">
              <div class="active">Статус: <span v-if="this.isActive" class="text-green-600">Активный</span><span v-else class="disables text-yellow-600">Деактивированный</span></div>
            </div>
            <div class="date-block flex justify-end mb-3">
              <div class="date-body">
                <div class="date-create">Дата создания: {{ this.$normaldate(this.dateCreate) }}</div>
                <div class="date-create">Дата обновления: {{ this.$normaldate(this.dateUpdate) }}</div>
              </div>
            </div>
            <div v-if="this.oldStructureDocument !== null" class="old-document-structure mb-3">
              <div class="old-document-structure-title">Шаблон основан на:</div>
              <router-link class="p-1 main-btn inline-block" :to="'/constructors/document/create?documnetStructure=' + this.oldStructureDocument.id">
                {{ this.oldStructureDocument.name + " №(" + this.oldStructureDocument.id + ")" }}
              </router-link>
            </div>
            <div v-if="this.listNewDocumentStructures.length !== 0" class="list-new-documnet-structure mb-3 flex gap-3">
              <div class="list-new-documnet-structure-title w-1/5">Шаблоны основанные на этом шаблоне:</div>
              <ul class="newDocumentStructuresList flex flex-wrap gap-2 w-4/5">
                <li v-for="item of this.listNewDocumentStructures" :key="item.id" class="newDocumentStructuresList-item">
                  <router-link class="p-1 main-btn block" :to="'/constructors/document/create?documnetStructure=' + item.id">
                    {{ item.name + " №(" + item.id + ")" }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="structure-top-header mb-8">
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Название шаблона:</label>
              <input v-model.trim="nameStructure" :class="{invalid: (v$.nameStructure.$errors.length)}" minlength="1" maxlength="255" required type="text" name="nameStructure" id="" class="input-text" placeholder="Название шаблона" title="Введите название шаблона" :disabled="!this.canWritePoles">
              <div class="input-errors max-w-xl" v-for="error of v$.nameStructure.$errors" :key="error.$uid">
                <div class="helper-text">{{  error.$message === "This field should be at least 1 characters long" ? "Длина этого поля должна составлять не менее 1 символа" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="">Описание шаблона:</label>
              <textarea v-model.trim="descriptionStructure" :class="{invalid: (v$.descriptionStructure.$errors.length)}" name="descriptionStructure" id="" class="input-text" maxlength="500" placeholder="Описание шаблона" :disabled="!this.canWritePoles"></textarea>
              <div class="input-errors max-w-xl" v-for="error of v$.descriptionStructure.$errors" :key="error.$uid">
                <div class="helper-text">{{ error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Тип документа:</label>
              <div class="flex gap-3">
                <div class="input-field col s12 selectSingle w-full document-type-select">
                  <!-- <select>
                    <option value="" disabled>Выберите тип документа</option>
                    <option v-for="(option) of this.typesDocuments" :key="option.id" v-bind:value="option.id">{{ option.name }}</option>
                  </select> -->
                  <SelectVue :selected="false" :content="this.typesDocuments" :message="'Выберите тип документа'" :multy="false" :disabled="!this.canWritePoles" :equalId="this.selectTypeInLoadStucture" :key="this.keySelectDocumentTypes"/>
                </div>
                <button class="main-btn py-3 px-5 flex self-start" @click.prevent="createType" :disabled="!this.canWritePoles">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Добавить
                </button>
              </div>
            </div>
          </div>
          <div class="structure-vue-title text-xl mb-6">Структура шаблона:</div>
          <div v-if="this.listReadyPoles.length !== 0" class="structure-vue-body">
            <ul class="structure-vue-body-list">
              <li v-for="(value, index) in this.listReadyPoles" :key="index" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)" class="structure-vue-body-item w-full py-3 px-12 border rounded-lg flex justify-between items-center">
                <div class="structure-item-left">
                  <div class="structure-item-title text-xl mb-1" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    {{ this.listReadyPoles[index].name }}
                  </div>
                  <div v-if="this.listReadyPoles[index].type === 'text'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" class="w-8 h-6 mr-2">
                      <path d="M16,6a1,1,0,0,0-1-1H3A1,1,0,0,0,3,7H8V18a1,1,0,0,0,2,0V7h5A1,1,0,0,0,16,6Zm5,5H15a1,1,0,0,0,0,2h2v5a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"/>
                    </svg>
                    Текстовое поле
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'number'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Числовое поле
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'select'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                    Выпадающий список
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'radio'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2">
                      <g>
                        <path fill="none" d="M0 0h24v24H0z"/>
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
                      </g>
                    </svg>
                    Один вариант
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'checkbox'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-6 h-6 mr-2">
                      <title>ionicons-v5-l</title>
                      <polyline points="352 176 217.6 336 160 272" style="fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
                      <rect x="64" y="64" width="384" height="384" rx="48" ry="48" style="fill:none;stroke:#000;stroke-linejoin:round;stroke-width:32px"/>
                    </svg>
                    Несколько вариантов
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'date'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                    Дата
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'employees'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    Выпадающий список сотрудников
                  </div>
                  <div v-else-if="this.listReadyPoles[index].type === 'students'" class="structure-item-type flex items-center" @click.self="modificationPole(this.listReadyPoles[index] !== undefined ? this.listReadyPoles[index].id : 0)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    Выпадающий список студентов
                  </div>
                </div>
                <div class="structure-item-right">
                  <!-- <button class="p-3 text-red-600 duration-100 rounded-lg hover:bg-red-100 block" @click.stop="this.deleteItemInlistReadyPoles(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button> -->
                  <button class="main-btn-red inline-block px-2 py-2 text-center text-lg flex" @click.stop="this.deleteItemInlistReadyPoles(index)" :disabled="!this.canWritePoles">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="no-pole-mes text-gray-400 text-center select-none py-6">
            Пока что полей нет
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'
import SelectVue from '@/components/app/Select.vue'
import FullScreenLoader from '@/components/app/FullScreenLoader.vue'
import DocumentServive from '@/store/services/document.servive'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { nanoid } from 'nanoid'

export default {
  name: 'ConstructorDocumentView',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    dateCreate: '',
    dateUpdate: '',
    selectReqValue: null,
    modal: null,
    typeModel: null,
    createInputModel: null,
    createStructureModal: null,
    updateStructureModel: null,
    updateStatusModel: null,
    select: null,
    loading: true,
    updateMode: false,
    createMode: false,
    content: [],
    typesDocuments: [],
    inputTypeName: false,
    typeName: '',
    validTypeName: false,
    structureLits: [],
    listReadyPoles: [],
    nameStructure: '',
    descriptionStructure: '',
    keySelectVis: 1,
    keySelectDocumentTypes: 1,
    keyModSelectVis: 1,
    selectTypeInLoadStucture: -1,
    // Для форму создания полей
    idPole: '',
    typePole: '',
    namePole: '',
    descriptionPole: '',
    placeholderPole: '',
    defaultValuePole: '',
    requiredPole: true,
    minLengthPole: 0,
    maxLengthPole: '',
    minValuePole: '',
    maxValuePole: '',
    stepValuePole: '',
    multiSelectPole: false,
    optionListPole: {data: {}},
    externalDependencyPole: {id: '', value: ''},
    listSelects: [''],
    listRadios: [''],
    listCheckbox: [''],
    minValueDatePole: '',
    maxValueDatePole: '',

    poyavPoleId: '',
    poyavValue: '',

    usechArr: [],

    modPole: false,

    replaceStatusDocuments: false,

    documnetStructureActive: true,

    isActive: true,

    listNewDocumentStructures: [],

    oldStructureDocument: null
  }),
  validations() {
    return {
      typeName: {required, minLength: minLength(1), maxLength: maxLength(50)},
      namePole: {required, minLength: minLength(1), maxLength: maxLength(100)},
      descriptionPole: {minLength: minLength(1), maxLength: maxLength(255)},
      placeholderPole: {required, minLength: minLength(1), maxLength: maxLength(255)},
      requiredPole: {required},
      nameStructure: {required, minLength: minLength(1), maxLength: maxLength(255)},
      descriptionStructure: {maxLength: maxLength(500)},
      poyavValue: {maxLength: maxLength(255)},
    }
  },
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    if (this.$route.query.documnetStructure === undefined) {
      this.createMode = true;
      setTimeout(() => {
        this.updateComp();
      })
    } else {
      await DocumentServive.checkDocumentStructure(this.$route.query.documnetStructure).then(
        (response) => {
          if (!response.data) {
            this.$router.go(-1);
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      
      await DocumentServive.getDocumentStructure(this.$route.query.documnetStructure).then(
        (response) => {
          this.nameStructure = response.data.name;
          this.descriptionStructure = response.data.description;
          this.selectTypeInLoadStucture = response.data.documentType.id;
          this.documnetStructureActive = response.data.isActive;
          this.dateCreate = response.data.dateCreate;
          this.dateUpdate = response.data.dateUpdate;
          this.isActive = response.data.isActive;
          let resStract = response.data.structure;
          if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
            DocumentServive.getDocumentStructure(response.data.oldStructureId).then(
              (innerResponse) => {
                this.oldStructureDocument = innerResponse.data;
                this.updateComp();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          } else {
            this.oldStructureDocument = null;
          }
          while(typeof resStract === 'string') {
            resStract = JSON.parse(resStract);
          }
          this.structureLits = resStract.data;
          // console.log(this.structureLits);
          this.listReadyPoles = [];
          
          for(let item of this.structureLits) {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            if (item.type === 'text' || item.type === 'number' || item.type === 'date' || item.type === 'radio' || item.type === 'checkbox') {
              obj.type = item.type;
            } else if (item.type === 'selectMultiple' || item.type === 'selectSingle') {
              obj.type = 'select';
            } else if (item.type === 'selectMultipleImage' || item.type === 'selectSingleImage') {
              obj.type = 'employees';
            } else if (item.type === 'selectMultipleStudent' || item.type === 'selectSingleStudent') {
              obj.type = 'students';
            }
            this.listReadyPoles.push(obj);
          }
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      await DocumentServive.getNewDocumentStructures(this.$route.query.documnetStructure).then(
        (response) => {
          this.listNewDocumentStructures = response.data;
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      this.updateComp();
    }

    await DocumentServive.getAllDocumentTypes().then(
      (response) => {
        this.typesDocuments = response.data;
        setTimeout(() => {
          this.updateComp();
        })
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    );

    setTimeout(() => {
      this.modal = M.Modal.init(this.$refs.modal);
      this.typeModel = M.Modal.init(this.$refs.typeCreateModel);
      this.updateStructureModel = M.Modal.init(this.$refs.updateStructureModel);
      this.updateStatusModel = M.Modal.init(this.$refs.updateStatusModel);
      this.createStructureModal = M.Modal.init(this.$refs.createStructureModal, {
        onCloseEnd: () => {
          this.idPole = '',
          this.typePole = '',
          this.namePole = '',
          this.descriptionPole = '',
          this.placeholderPole = '',
          this.defaultValuePole = '',
          this.requiredPole = true,
          this.minLengthPole = 0,
          this.maxLengthPole = '',
          this.minValuePole = '',
          this.maxValuePole = '',
          this.stepValuePole = '',
          this.multiSelectPole = false,
          this.optionListPole = {data: {}},
          this.externalDependencyPole = {id: '', value: ''},
          this.listSelects = [''],
          this.listRadios = [''],
          this.listCheckbox = [''],
          this.minValueDatePole = '',
          this.maxValueDatePole = '',
          this.modPole = false,
          this.poyavPoleId = '',
          this.poyavValue = ''
        }
      });
      this.select = M.FormSelect.init(document.querySelectorAll('select'), {});
      this.updateComp();
    }, 0)
    this.loading = false;
  },
  methods: {
    updateDocumentStatus() {
      this.updateStatusModel.open();
    },
    async revActivationDocumentStructure() {
      this.loading = true;
      this.updateStatusModel.close();
      await DocumentServive.updateStatusDocumentStructure(this.$route.query.documnetStructure, !this.documnetStructureActive).then(
        (response) => {
          if (!this.documnetStructureActive) {
            this.$message(`Шаблон №${this.$route.query.documnetStructure} активирован`);
          } else {
            this.$message(`Шаблон №${this.$route.query.documnetStructure} деактивирован`);
          }
          this.documnetStructureActive = !this.documnetStructureActive;
          this.isActive = !this.isActive;
        }
      ),
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
      this.loading = false;
    },
    async rajectChangesStructure() {
      this.loading = true;
      await DocumentServive.getDocumentStructure(this.$route.query.documnetStructure).then(
        (response) => {
          this.nameStructure = response.data.name;
          this.descriptionStructure = response.data.description;
          this.selectTypeInLoadStucture = response.data.documentType.id;
          if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
            DocumentServive.getDocumentStructure(response.data.oldStructureId).then(
              (innerResponse) => {
                this.oldStructureDocument = innerResponse.data;
                this.updateComp();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          } else {
            this.oldStructureDocument = null;
          }

          let resStract = response.data.structure;
          while(typeof resStract === 'string') {
            resStract = JSON.parse(resStract);
          }
          this.structureLits = resStract.data;
          this.listReadyPoles = [];
          
          for(let item of this.structureLits) {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            if (item.type === 'text' || item.type === 'number' || item.type === 'date' || item.type === 'radio' || item.type === 'checkbox') {
              obj.type = item.type;
            } else if (item.type === 'selectMultiple' || item.type === 'selectSingle') {
              obj.type = 'select';
            } else if (item.type === 'selectMultipleImage' || item.type === 'selectSingleImage') {
              obj.type = 'employees';
            } else if (item.type === 'selectMultipleStudent' || item.type === 'selectSingleStudent') {
              obj.type = 'students';
            }
            this.listReadyPoles.push(obj);
          }
          this.updateComp();
          this.replaceStatusDocuments = false;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      this.loading = false;
      this.updateMode = false;
      this.updateComp();
      this.$message('Изменения отменены');
    },
    modalupdateDocumentStructure() {
      this.updateStructureModel.open();
      // if (this.replaceStatusDocuments) {
      //   this.updateStructureModel.open();
      // } else {
      //   this.updateDocumentStructure();
      // }
    },
    async updateDocumentStructure() {
      this.loading = true;
      let listLiItems = document.querySelector('.document-type-select').querySelectorAll('li');
      let selectTypeDocument = '';
      let structureDocumentFinal = {data: []};
      structureDocumentFinal.data = this.structureLits;
      for (let item of listLiItems) {
        if (item.classList.value.includes('selected')) {
          let arList = item.textContent.split(' ');
          selectTypeDocument = arList[arList.length-1].replace(/^.|.$/g,"");
          break;
        }
      }

      await DocumentServive.updateDocumentStructure(this.$route.query.documnetStructure, this.nameStructure, this.descriptionStructure, selectTypeDocument, structureDocumentFinal).then(
        (response) => {
          DocumentServive.updateStatusDocumentsByStructureId(this.$route.query.documnetStructure).then(
            (response) => {

            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          );
          this.$message(`Обновлен Шаблон документов №${response.data.id}`);
          this.updateStructureModel.close();
          this.replaceStatusDocuments = false;
          this.updateMode = false;
          this.updateComp();
        }
      ),
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }

      await DocumentServive.getDocumentStructure(this.$route.query.documnetStructure).then(
        (response) => {
          this.nameStructure = response.data.name;
          this.descriptionStructure = response.data.description;
          this.selectTypeInLoadStucture = response.data.documentType.id;
          this.documnetStructureActive = response.data.isActive;
          this.dateCreate = response.data.dateCreate;
          this.dateUpdate = response.data.dateUpdate;
          this.isActive = response.data.isActive;
          if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
            DocumentServive.getDocumentStructure(response.data.oldStructureId).then(
              (innerResponse) => {
                this.oldStructureDocument = innerResponse.data;
                this.updateComp();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          } else {
            this.oldStructureDocument = null;
          }
          let resStract = response.data.structure;
          while(typeof resStract === 'string') {
            resStract = JSON.parse(resStract);
          }
          this.structureLits = resStract.data;
          // console.log(this.structureLits);
          this.listReadyPoles = [];
          
          for(let item of this.structureLits) {
            let obj = {};
            obj.id = item.id;
            obj.name = item.name;
            if (item.type === 'text' || item.type === 'number' || item.type === 'date' || item.type === 'radio' || item.type === 'checkbox') {
              obj.type = item.type;
            } else if (item.type === 'selectMultiple' || item.type === 'selectSingle') {
              obj.type = 'select';
            } else if (item.type === 'selectMultipleImage' || item.type === 'selectSingleImage') {
              obj.type = 'employees';
            } else if (item.type === 'selectMultipleStudent' || item.type === 'selectSingleStudent') {
              obj.type = 'students';
            }
            this.listReadyPoles.push(obj);
          }
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      await DocumentServive.getNewDocumentStructures(this.$route.query.documnetStructure).then(
        (response) => {
          this.listNewDocumentStructures = response.data;
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      this.loading = false;
    },
    createTextPole() {
      this.typePole = 'text';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createNumberPole() {
      this.typePole = 'number';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createSelectPole() {
      this.typePole = 'select';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createRadioPole() {
      this.typePole = 'radio';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createCheckboxPole() {
      this.typePole = 'checkbox';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createDatePole() {
      this.typePole = 'date';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createEmployeePole() {
      this.typePole = 'employees';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    createStudentPole() {
      this.typePole = 'students';
      this.replaceStatusDocuments = true;
      this.createStructureModal.open();
    },
    saveStructurePole() {
      if (!this.modPole) {
        this.idPole = nanoid();
      }
      let obj = {};
        obj.id = this.idPole;
        obj.name = this.namePole;
        obj.description = this.descriptionPole;
        obj.required = this.requiredPole;
        obj.placeholder = this.placeholderPole;
      if (this.typePole === 'text') {
        obj.type = "text";
        obj.minLength = this.minLengthPole;
        obj.maxLength = this.maxLengthPole !== '' || Number(this.maxLengthPole) > Number(this.minLengthPole) ? Number(this.maxLengthPole) : this.maxLengthPole === "" ? 255 : Number(this.maxLengthPole) + Number(this.minLengthPole) + 1;
        obj.defaultValue = this.defaultValuePole;
      } else if (this.typePole === 'number') {
        obj.type = "number";
        obj.stepValue = 1;
        obj.defaultValue = this.defaultValuePole;
        obj.minValue = this.minValuePole;
        obj.maxValue = obj.maxValuePole = this.minValuePole !== '' && Number(this.maxValuePole) > Number(this.minValuePole) ? Number(this.maxValuePole) : this.maxValuePole === "" ? '' : Number(this.maxValuePole) + Number(this.minValuePole) + 1;
      } else if (this.typePole === 'select') {
        if (this.multiSelectPole) {
          obj.type = 'selectMultiple';
        } else {
          obj.type = 'selectSingle';
        }
        for (let item of this.listSelects) {
          if (item !== '') {
            this.optionListPole.data[item] = null;
          }
        }
        if (Object.keys(this.optionListPole.data).length === 0) {
          this.$error('Должно присутствовать минимум 1 заполненное поле');
          return;
        }
        obj.options = this.optionListPole;
      } else if (this.typePole === 'radio') {
        obj.type = 'radio';
        for (let item of this.listRadios) {
          if (item !== '') {
            this.optionListPole.data[item] = null;
          }
        }
        if (Object.keys(this.optionListPole.data).length === 0) {
          this.$error('Должно присутствовать минимум 1 заполненное поле');
          return;
        }
        obj.options = this.optionListPole;
      } else if (this.typePole === 'checkbox') {
        obj.type = 'checkbox';
        for (let item of this.listCheckbox) {
          if (item !== '') {
            this.optionListPole.data[item] = null;
          }
        }
        if (Object.keys(this.optionListPole.data).length === 0) {
          this.$error('Должно присутствовать минимум 1 заполненное поле');
          return;
        }
        obj.options = this.optionListPole;
      } else if (this.typePole === 'date') {
        obj.type = 'date';
        obj.minValue = this.minValueDatePole;
        obj.maxValue = this.maxValueDatePole;
      } else if (this.typePole === 'employees') {
        if (this.multiSelectPole) {
          obj.type = 'selectMultipleImage';
        } else {
          obj.type = 'selectSingleImage';
        }
      } else if (this.typePole === 'students') {
        if (this.multiSelectPole) {
          obj.type = 'selectMultipleStudent';
        } else {
          obj.type = 'selectSingleStudent';
        }
      }

      let listLiItems = document.querySelector('.selected-condition-field').querySelectorAll('li');
      for (let item of listLiItems) {
        if (item.classList.value.includes('disabled') && item.classList.value.includes('selected')) {
          break;
        } else if (item.classList.value.includes('selected')) {
          let arList = item.textContent.split(' ');
          this.poyavPoleId = arList[arList.length - 1].replace(/^.|.$/g,"");
          obj.externalDependency = {};
          obj.externalDependency.id = this.poyavPoleId;
          obj.externalDependency.value = this.poyavValue;
          break;
        }
      }

      if (!this.modPole) {
        let innerObj = {};
        innerObj.id = obj.id;
        innerObj.type = this.typePole;
        innerObj.name = obj.name;
        this.listReadyPoles.push(innerObj);
        this.structureLits.push(obj)
        this.$message('Поле добавлено');
      } else {
        for (let index = 0; index < this.structureLits.length; ++index) {
          if (this.structureLits[index].id === this.idPole) {
            this.structureLits[index] = obj;
            this.listReadyPoles[index].name = obj.name;
            this.$message('Поле обновлено');
            break;
          }
        }
      }

      this.keySelectVis += 1;
      this.keyModSelectVis += 1;
      // console.log(this.structureLits);
      this.idPole = '';
      this.namePole = '';
      this.descriptionPole = '';
      this.placeholderPole = '';
      this.multiSelectPole = false;
      this.optionListPole = {data: {}};
      this.createStructureModal.close();
      this.listSelects = [''];
      this.listRadios = [''];
      this.listCheckbox = [''];
      this.minValueDatePole = '';
      this.maxValueDatePole = '';
      this.poyavPoleId = '';
      this.poyavValue = '';
    },
    modificationPole(uid) {
      for (let item of this.structureLits) {
        if (item.id === uid) {
          this.keyModSelectVis += 1;
          this.idPole = item.id,
          this.namePole = item.name;
          this.descriptionPole = item.description;
          this.requiredPole = item.required;
          this.placeholderPole = item.placeholder;
          this.poyavPoleId = item.externalDependency !== undefined ? item.externalDependency.id : '';
          this.poyavValue = item.externalDependency !== undefined ? item.externalDependency.value : '';
          this.usechArr = [];
          for (let arrItem of this.structureLits) {
            if (arrItem.id !== item.id) {
              this.usechArr.push(arrItem)
            } else {
              break;
            }
          }
          if (item.type === 'text') {
            this.typePole = 'text';
            this.minLengthPole = item.minLength;
            this.maxLengthPole = item.maxLength;
            this.defaultValuePole = item.defaultValue;
          } else if (item.type === 'number') {
            this.typePole = 'number';
            this.minValuePole = item.minValue;
            this.maxValuePole = item.maxValue;
            this.defaultValuePole = item.defaultValue;
          } else if (item.type === 'selectMultiple' || item.type === 'selectSingle') {
            this.typePole = 'select';
            this.multiSelectPole = item.type === 'selectMultiple';
            this.listSelects = Object.keys(item.options.data);
          } else if (item.type === 'radio') {
            this.typePole = 'radio';
            this.listRadios = Object.keys(item.options.data);
          } else if (item.type === 'checkbox') {
            this.typePole = 'checkbox';
            this.listCheckbox = Object.keys(item.options.data);
          } else if (item.type === 'date') {
            this.typePole = 'date';
            this.minValueDatePole = item.minValue;
            this.maxValueDatePole = item.maxValue;
          } else if (item.type === 'selectMultipleImage' || item.type === 'selectSingleImage') {
            this.typePole = 'employees';
            this.multiSelectPole = item.type === 'selectMultipleImage';
          } else if (item.type === 'selectMultipleStudent' || item.type === 'selectSingleStudent') {
            this.typePole = 'students';
            this.multiSelectPole = item.type === 'selectMultipleStudent';
          }
          this.modPole = true;
          this.createStructureModal.open();
          break;
        }
      }
    },
    async createDocumentType() {
      this.loading = true;
      await DocumentServive.createDocumentType(this.typeName).then(
        (response) => {
          this.typeName = '';
          DocumentServive.getAllDocumentTypes().then(
            (response) => {
              this.typesDocuments = response.data;
              // this.keySelectDocumentTypes += 1;
              this.updateComp();
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
          this.typeModel.close();
          this.$message(`Тип документа №${response.data.id} создан`);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      this.loading = false;
    },
    async createNewDocumentStructure() {
      this.loading = true;
      let listLiItems = document.querySelector('.document-type-select').querySelectorAll('li');
      let selectTypeDocument = '';
      let structureDocumentFinal = {data: []};
      structureDocumentFinal.data = this.structureLits;
      for (let item of listLiItems) {
        if (item.classList.value.includes('selected')) {
          let arList = item.textContent.split(' ');
          selectTypeDocument = arList[arList.length - 1].replace(/^.|.$/g,"");
          break;
        }
      }

      // console.log(structureDocumentFinal);
      await DocumentServive.createDocumentStructure('', this.nameStructure, this.descriptionStructure, selectTypeDocument, structureDocumentFinal).then(
        (response) => {
          this.$message(`Создан Шаблон документов №${response.data.id}`);
          this.nameStructure = '';
          this.descriptionStructure = '';
          this.structureLits = [];
          this.listReadyPoles = [];
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      this.loading = false;
    },
    async checkDocumentTypeName() {
      await DocumentServive.checkDocumentTypeName(this.typeName).then(
        (response) => {
          if (response.data || this.typeName === '') {
            this.validTypeName = false;
          } else {
            this.validTypeName = true;
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },
    addCheckboxValue() {
      this.listCheckbox.push('');
    },
    deleteCheckboxItem(index) {
      this.listCheckbox = this.deleteItemInArr(this.listCheckbox, index);
    },
    addRadioValue() {
      this.listRadios.push('');
    },
    deleteRadioItem(index) {
      this.listRadios = this.deleteItemInArr(this.listRadios, index);
    },
    addSelectValue() {
      this.listSelects.push('');
    },
    deleteSelectItem(index) {
      this.listSelects = this.deleteItemInArr(this.listSelects, index);
    },
    createType() {
      this.typeModel.open();
    },
    leavingPage() {
      if (this.canWritePoles) {
        this.modal.open();
      } else {
        this.back();
      }
    },
    back() {
      this.$router.go(-1);
    },
    deleteItemInlistReadyPoles(index) {
      this.keySelectVis += 1;
      this.keyModSelectVis += 1;
      for (let i = 0; i < this.structureLits.length; ++i) {
        if (this.structureLits[i].externalDependency !== undefined && this.structureLits[i].externalDependency.id === this.listReadyPoles[index].id) {
          delete this.structureLits[i].externalDependency;
        }
        // console.log(this.structureLits[i]);
      }
      this.listReadyPoles = this.deleteItemInArr(this.listReadyPoles, index);
      this.structureLits = this.deleteItemInArr(this.structureLits, index);
      this.replaceStatusDocuments = true;
      // console.log(this.structureLits);
    },
    onUpdateMode() {
      this.updateMode = true;
      this.updateComp();
    },
    deleteItemInArr(arr, ...args){
      var set = new Set(args); 
      return arr.filter((v, k) => !set.has(k));
    },
    updateComp() {
      this.keySelectVis += 1;
      this.keyModSelectVis += 1;
      this.keySelectDocumentTypes += 1;
    },
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
    if (this.typeModel && this.typeModel.destroy) {
      this.typeModel.destroy();
    }
    if (this.createStructureModal && this.createStructureModal.destroy) {
      this.createStructureModal.destroy();
    }
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
    if (this.updateStructureModel && this.updateStructureModel.destroy) {
      this.updateStructureModel.destroy();
    }
    if (this.updateStatusModel && this.updateStatusModel.destroy) {
      this.updateStatusModel.destroy();
    }
  },
  computed: {
    canWritePoles() {
      return this.updateMode || this.createMode;
    }
  },
  watch: {
    async $route() {
      this.loading = true;
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
      if (this.$route.query.documnetStructure === undefined) {
        this.createMode = true;
        setTimeout(() => {
          this.updateComp();
        })
      } else {
        await DocumentServive.checkDocumentStructure(this.$route.query.documnetStructure).then(
          (response) => {
            if (!response.data) {
              this.$router.go(-1);
            }
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        );
        
        await DocumentServive.getDocumentStructure(this.$route.query.documnetStructure).then(
          (response) => {
            this.nameStructure = response.data.name;
            this.descriptionStructure = response.data.description;
            this.selectTypeInLoadStucture = response.data.documentType.id;
            this.documnetStructureActive = response.data.isActive;
            this.dateCreate = response.data.dateCreate;
            this.dateUpdate = response.data.dateUpdate;
            this.isActive = response.data.isActive;
            if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
              DocumentServive.getDocumentStructure(response.data.oldStructureId).then(
                (innerResponse) => {
                  this.oldStructureDocument = innerResponse.data;
                  this.updateComp();
                },
                (error) => {
                  this.message = (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  this.$error(messages[this.message] || 'Что-то пошло не так');
                }
              );
            } else {
              this.oldStructureDocument = null;
            }
            let resStract = response.data.structure;
            while(typeof resStract === 'string') {
              resStract = JSON.parse(resStract);
            }
            this.structureLits = resStract.data;
            // console.log(this.structureLits);
            this.listReadyPoles = [];

            for(let item of this.structureLits) {
              let obj = {};
              obj.id = item.id;
              obj.name = item.name;
              if (item.type === 'text' || item.type === 'number' || item.type === 'date' || item.type === 'radio' || item.type === 'checkbox') {
                obj.type = item.type;
              } else if (item.type === 'selectMultiple' || item.type === 'selectSingle') {
                obj.type = 'select';
              } else if (item.type === 'selectMultipleImage' || item.type === 'selectSingleImage') {
                obj.type = 'employees';
              } else if (item.type === 'selectMultipleStudent' || item.type === 'selectSingleStudent') {
                obj.type = 'students';
              }
              this.listReadyPoles.push(obj);
            }
            this.updateComp();
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        );

        await DocumentServive.getNewDocumentStructures(this.$route.query.documnetStructure).then(
          (response) => {
            this.listNewDocumentStructures = response.data;
            this.updateComp();
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        );

        this.updateComp();
      }

      await DocumentServive.getAllDocumentTypes().then(
        (response) => {
          this.typesDocuments = response.data;
          setTimeout(() => {
            this.updateComp();
          })
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      this.loading = false;
    },
  },
  components: {
    Sidebar,
    FullScreenLoader,
    SelectVue
}
}
</script>
