<template lang="pug">
v-app
  v-app-bar(app dense elevation="2" )
    v-app-bar-nav-icon(@click.stop="drawer = !drawer")
    v-toolbar-title() {{title}}

  v-navigation-drawer(app v-model="drawer")
    v-list-item
      v-list-item-content
        v-list-item-title.text-h6 Тесты
        v-list-item-subtitle по информатике
    v-divider
    v-list(dense nav)

      v-list-item-group( v-model="selectedItem" color="primary")  
        v-list-item(link @click="setTitle('main')")
          v-list-item-icon
            v-icon mdi-home  
          v-list-item-content  
            v-list-item-title Главная

        v-list-item(link @click="setTitle('test','Тест 1')")
          v-list-item-icon
            v-icon mdi-school
          v-list-item-content  
            v-list-item-title Тест 
          
        v-list-item(v-for="item in menuItems" no-action :key="item.title" @click="setTitle('text',item.title)")
          v-list-item-content
            v-list-item-title {{item.title}}
              
          //- v-list-item( v-for="(item, i) in item.items" :key="i" link @click="setTitle(item.title)")
          //-     v-list-item-title(v-text="item.title")     


  v-main
    v-container(fluid)
      v-card.mx-auto.card.mt-10(v-if="main == 'main'" elevation="2")
          v-card-title Огэ по информатике
          v-card-subtitle Тут вы можете подгодовиться к ОГЭ
          v-card-text На сайте представлено 10 тем (заданий) которые встретяться вам на ОГЭ по информатике, а также возможность пройти тест с случайным набором из этих 10 заданий.   
      TestView(v-else-if="main == 'test'" :title="title" ref="test")    
      CardView(v-else :title="title")
      

  v-footer(app)
</template>

<script>
import menuItems from "./plugins/menu"
import CardView from "./components/CardView"
import TestView from "./components/TestView"
export default {
  name: "App",

  components: {
    CardView,
    TestView,
  },

  data: () => ({
    selectedItem: 0,
    drawer: null,
    main: "main",
    menuItems: menuItems,
    title: "",
  }),
  methods: {
    setTitle(title, name) {
      switch (title) {
        case "main":
          this.main = "main"
          this.title = ""
          break
        case "test":
          if (this.main == "test") this.$refs.test.refresh()
          else {
            this.main = "test"
            this.title = name
          }

          break
        case "text":
          this.main = "text"
          this.title = name
          break
      }
    },
  },
}
</script>
<style scoped>
.card {
  width: 700px
}
</style>