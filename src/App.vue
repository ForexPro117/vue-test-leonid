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
        v-list-item(link @click="setTitle('Home')")
          v-list-item-icon
            v-icon mdi-home  
          v-list-item-content  
            v-list-item-title Home
          
        v-list-group(v-for="item in menuItems" no-action :key="item.title" :prepend-icon="item.action")
          template( v-slot:activator)
              v-list-item-content
                v-list-item-title {{item.title}}
              
          v-list-item( v-for="(item, i) in item.items" :key="i" link @click="setTitle(item.title)")
              v-list-item-title(v-text="item.title")     


        //- v-list-group( :value="0"  no-action  sub-group )
        //-   template( v-slot:activator)
        //-     v-list-item-content
        //-       v-list-item-title Midle

          
  

  <!-- Sizes your content based upon application components -->
  v-main
    <!-- Provides the application the proper gutter -->
    v-container(fluid)
      CardView( :questions="title")

  v-footer(app)
</template>

<script>
import menuItems from "./plugins/menu";
import CardView from "./components/CardView"
export default {
  name: "App",
  
  components: {
    CardView,
  },


  data: () => ({
    selectedItem:0,
    drawer:null,
    menuItems: menuItems,
    title:""
  }),
  methods:{
    setTitle(title){
      this.title = title
    }
  }
};
</script>
