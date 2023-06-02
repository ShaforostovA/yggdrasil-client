<template>
  <div class="chapter-name text-3xl mb-6">
    Главная
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-6 flex-grow shadow-md rounded-xl items-stretch border p-6">
      <div class="info-header mb-6 flex justify-between">
        <h2 v-if="this.currentUser.roles[0] === this.tAdmin" class="wellcome text-2xl">
          Добро пожаловать, Технический Администратор!
        </h2>
        <h2 v-else-if="this.currentUser.roles[0] === this.admin" class="wellcome text-2xl">
          Добро пожаловать, Администратор!
        </h2>
        <h2 v-else class="wellcome text-2xl">
          Добро пожаловать, {{ this.currentUser.lastname + ' ' + this.currentUser.name + ' ' + this.currentUser.patronymic }}!
        </h2>
        <div v-if="this.currentUser.roles[0] !== this.admin && this.currentUser.roles[0] !== this.tAdmin" class="info-role">
          <span class="font-bold">Ваша роль:</span> {{ this.currentUser.roles[0] === this.moder ? 'Зав. кафедрой' : 'Преподаватель' }}
        </div>
      </div>
      <div class="line h-1 bg-gray-200 mb-6"></div>
      <div class="info-body">
        <div v-if="this.currentUser.roles[0] === this.tAdmin" class=" text-lg">
          Ваши возможности в системе:
          <ul class="collapsible" ref="col">
            <li>
              <div class="collapsible-header">Работа с факультетами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Факультеты</span> у вас откроется страница факультетов.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о факультетах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового факультета.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного факультета. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>. В этом же окне отображены сводные таблицы кафедр факультета и сотрудников на факультете.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с кафедрами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Кафедры</span> у вас откроется страница кафедр.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о кафедрах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания новой кафедры.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраной кафедры. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>. В этом же окне отображены сводные таблицы сотрудников на кафедре.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с сотрудниками</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Сотрудники</span> у вас откроется страница сотрудников.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о сотрудниках.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового сотрудника.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного сотрудника. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>. При нажатии на кнопку <span class=" font-bold">Изменить пароль</span> можно установить новый пароль для пользователя, если он забыл свой старый.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с студентами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Студенты</span> у вас откроется страница студентов.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о студентах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового студента.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного студента. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>. При нажатии на кнопку <span class=" font-bold">Деактивировать</span> можно изменить стаутс студента на <span class=" font-bold">"Не учится"</span> или в обратную сторону при нажатии на кнопку <span class=" font-bold">Активировать</span>.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с конструкторами шаблонов</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Конструктор шаблонов</span> у вас откроется страница с шаблонов документов и отчетов (по умолчанию отображаеются шаблоны документов).
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о шаблонах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового шаблона (документа / отчета).
                </div>
                <div class="">
                  В окне для документов, вам необходимо нажимать на интересующий вас тип поля в левой панеле, после чего у вас откроется диалоговое окно с настройками поля. После создания поля, оно отобразится ниже в списке. Если вам необходимо его отредактировать, то нажмите на него в списке созданных полей.
                </div>
                <div class="">
                  В окне для отчетов, вам необходимо заполнить все поля, добавить, если нужно, новый тип отчета или выбрать из уже имеющихся, выбрать перечень документов, которые будут использоваться в отчете и для того чтобы сохранить выбранные документов, необходимо нажать на кнопку <span class=" font-bold">Сохранить выбранный перечень</span>.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного шаблона. В ней можно отредактировать шаблон.
                </div>
                <div class="">
                  Если на основе шаблона документа / отчета есть документы / отчеты в статусе <span class=" font-bold">"Архив"</span>, то при изменении шаблона, будет создана копия и все документы / отчеты, которые не архивные, будут переведены на новый шаблон.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с разделом разное</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Разное</span> у вас откроется страница с ключевыми словами, типами документов и типами отчетов.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о них.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница для редактирования выбраной записи.
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else-if="this.currentUser.roles[0] === this.admin" class="">
          <ul class="collapsible" ref="col">
            <li>
              <div class="collapsible-header">Работа с документами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Документы</span> у вас откроется страница документов.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о документах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного документа. Также можно добавить или удалить ключевые слова. Для добавления нового ключевого слова, необходимо его ввести в поле и нажать Enter.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с отчет</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Отчеты</span> у вас откроется страница отчетов.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о отчетах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового отчета. Вам необходимо выбрать шаблон, период за который будут браться документы в статусе <span class=" font-bold">"Готов"</span> и по чему будет формироваться отчет (по кафрам или факультетам).
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного отчета. Можно псмотреть данные, которые есть в отчете, изменить статус отчета и если отчет не в статусе <span class=" font-bold">"Архив"</span>, то его можно отредактировать. Если вы изменити статус отчета на <span class=" font-bold">"Архив"</span>, то все документы, которые в отчете, будут переведены в статус <span class=" font-bold">"Архив"</span> и больше не будут возможны для редактирования.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с статистикой</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Статистика</span> у вас откроется страница статистики.
                </span>
                <div class="">
                  Здесь можно ознакомиться с статистикой на разных уровнях и за разный период.
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else-if="this.currentUser.roles[0] === this.moder" class="">
          <ul class="collapsible" ref="col">
            <li>
              <div class="collapsible-header">Работа с документами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Документы</span> у вас откроется страница ваших документов и документов кафедры (кроме документов, которые не были созданы вами и в статусе <span class=" font-bold">"Черновик"</span>).
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о документах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница создания документа. Пока вы не опубликуете документ (статус <span class=" font-bold">"Черновик"</span>), все ваши изменения будут автоматически сохраняться. Также можно добавить или удалить ключевые слова. Для добавления нового ключевого слова, необходимо его ввести в поле и нажать Enter.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного документа. Также можно добавить или удалить ключевые слова. Для добавления нового ключевого слова, необходимо его ввести в поле и нажать Enter.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Переделать</span>, статус документа будет изменен на <span class=" font-bold">"Переделать"</span>.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с отчет</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Отчеты</span> у вас откроется страница отчетов.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о отчетах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового отчета. Вам необходимо выбрать шаблон, период за который будут браться документы в статусе <span class=" font-bold">"Готов"</span>.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного отчета. Можно псмотреть данные, которые есть в отчете, изменить статус отчета и если отчет не в статусе <span class=" font-bold">"Готов"</span>, то ваш отчет будет виден для Администратора. Изменить статус отчета на <span class=" font-bold">"Архив"</span> может <span class=" font-bold">ТОЛЬКО</span> Администратор.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с сотрудниками</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Сотрудники</span> у вас откроется страница сотрудников вашей кафедры.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о сотрудниках.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового сотрудника.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного сотрудника. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>. При нажатии на кнопку <span class=" font-bold">Изменить пароль</span> можно установить новый пароль для пользователя, если он забыл свой старый.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с студентами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Студенты</span> у вас откроется страница студентов вашей кафедры.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о студентах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового студента.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного студента. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с статистикой</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Статистика</span> у вас откроется страница статистики.
                </span>
                <div class="">
                  Здесь можно ознакомиться с статистикой на разных уровнях и за разный период.
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else-if="this.currentUser.roles[0] === this.user" class="">
          <ul class="collapsible" ref="col">
            <li>
              <div class="collapsible-header">Работа с документами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Документы</span> у вас откроется страница ваших документов и документов кафедры (кроме документов, которые не были созданы вами и в статусе <span class=" font-bold">"Черновик"</span>).
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о документах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница создания документа. Пока вы не опубликуете документ (статус <span class=" font-bold">"Черновик"</span>), все ваши изменения будут автоматически сохраняться. Также можно добавить или удалить ключевые слова. Для добавления нового ключевого слова, необходимо его ввести в поле и нажать Enter.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного документа. Также можно добавить или удалить ключевые слова. Для добавления нового ключевого слова, необходимо его ввести в поле и нажать Enter.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с студентами</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Студенты</span> у вас откроется страница студентов вашей кафедры.
                </span>
                <div class="">
                  В таблице можно увидеть основную информацию о студентах.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Создать</span>, у вас откроется страница для создания нового студента.
                </div>
                <div class="">
                  При нажатии на кнопку <span class=" font-bold">Подробнее</span>, у вас откроется страница выбраного студента. В ней также можно изменить информацию при нажатии кнопку <span class=" font-bold">Редактировать</span>.
                </div>
              </div>
            </li>
            <li>
              <div class="collapsible-header">Работа с статистикой</div>
              <div class="collapsible-body">
                <span>
                  При выборе в левой панеле вкладки <span class=" font-bold">Статистика</span> у вас откроется страница статистики.
                </span>
                <div class="">
                  Здесь можно ознакомиться с статистикой.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'
import { UserRoles } from "@/types/Roles"

export default {
  name: 'HomeView',
  data: () => ({
    tAdmin: UserRoles.SuperAdmin,
    admin: UserRoles.Admin,
    moder: UserRoles.Moderator,
    user: UserRoles.User,

    col: null,
  }),
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    setTimeout(() => {
      this.col = M.Collapsible.init(this.$refs.col)
    })
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  beforeDestroy() {
    if(this.col && this.col.destroy) {
      this.col.destroy();
    }
  },
  components: {
    Sidebar
  }
}
</script>
