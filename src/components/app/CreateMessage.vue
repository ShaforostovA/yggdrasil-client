<template>
  <div class="document-create-message fixed w-full h-full top-0 left-0 z-40 bg-black/60 flex justify-center">
    <div class="document-message-body bg-white w-[30%] self-center rounded-xl p-6 text-center">
      <div class="document-message-img bg-[var(--color-main)] inline-block text-white rounded-full p-6 mx-auto mb-10">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-32">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <div class="document-message-text mb-10">
        <h2 class="document-message-title text-2xl mb-10">
          {{ this.typeCreate }} №{{ this.documentId }} успешно создан!
        </h2>
        <div class="document-message-description text-start">
          Исходный шаблон: №{{ this.structureId }} — {{ this.structureName }}
        </div>
      </div>
      <div class="document-message-navigate flex justify-around gap-5 flex-grow flex-wrap">
        <router-link :to="{name: 'document', params: { documentId: this.documentId, firstOpenDoc: false }}" class="document-message-button main-btn inline-flex p-3 self-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
          <div>Открыть документ</div>
        </router-link>
        <router-link :to="{name: 'documents'}" class="document-message-button main-btn inline-flex p-3 self-center w-[191.233px] justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
            <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
          <div>Закрыть</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['typeCreate', 'structureId', 'structureName', 'documentId'],
}
</script>