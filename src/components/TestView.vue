<template lang="pug">
  div
    //- v-card.mx-auto.card.mt-10(v-for="(card,j) in test.main" :key="j" elevation="2")
    //-     v-card-title {{card.title}}
    //-     v-card-subtitle {{card.subtitle}}
    //-     v-card-text {{card.text}}
    //-     v-img(:src="card.image" contain)
    v-lazy(v-for="(q,i) in this.test.questions", :key="i" :options="{ threshold: .9 }" min-height="50" transition="fade-transition" )
      v-card.mx-auto.card.mt-10(elevation="2")
        v-card-title Задание №{{i+1}}
        v-card-subtitle {{q.text}}
        v-img(v-for="path in q.image" :src="path" contain :key="path")
        v-card-text(v-if="q.type == 'radio'")
          v-radio-group(v-model="q.answer" :disabled="isFinish")
            v-radio(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" dense)
            
        v-card-text(v-else-if="q.type == 'checkbox'")
          v-checkbox.my-0(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" v-model="q.answer" dense :disabled="isFinish")

        v-card-text(v-else-if="q.type == 'text'")
          v-text-field(:label="'Введите ответ'" v-model="q.answer"  clearable :disabled="isFinish")
        v-card-actions
          v-btn(v-if="isFinish" text @click="q.show = !q.show" color="primary") Показать решение
        v-expand-transition
          div(v-show="q.show")
            v-divider
            v-card-text {{q.explanation}}
    v-row.mt-16.mb-10(v-if="!isFinish" align="center")
      v-btn.btn.mx-auto(@click="checkTest" color="primary" ) Завершить тест    
    v-data-table.mt-16.mb-10.mx-auto.elevation-2.card(v-else="isFinish" :headers='headers' :items='tableItems'
     :items-per-page="5" :footer-props="{itemsPerPageText: 'Элементов на странице', pageText: '{0}-{1} из {2}','items-per-page-all-text':'Все'}")  
          
   

</template>

<script>
import {default as tests} from "../plugins/text";
import _ from "lodash";
export default {
  name: "CardView",

  props: {
    title: null,
  },

  data: () => ({
    test:{questions:[],},
    tableItems:[],
    isFinish:false,
    headers:[
      {
      text:'Номер теста',
      sortable: false,
      value:"name",
    },
    {
      text:'Результат',
      sortable: false,
      value:"result"
    }
    ]
  }),
  created(){
    console.log("Created")
    this.randomQuest()
  },
  methods:{
    randomQuest(){
      let test = _.cloneDeep(tests)
      let arr = []
      for(let name of Object.keys(test)){
        arr.push(_.shuffle(test[name].questions)[0]) 
      }
      this.test.questions.push(..._.shuffle(arr))
    },
    checkTest(){
      this.tableItems=[]
      let i = 1;
      for (let el of this.test.questions) {
        let ans = false;
        switch (el.type) {
          case "checkbox":
            ans = this.compareArr(el.answer, el.rightAnswer)
            break;
          case "radio":
            ans = el.answer == el.rightAnswer
            break;
          case "text":
            ans = this.compareText(el.answer, el.rightAnswer)
            break;
        }
        this.tableItems.push({name:'Задание '+i++,result:ans ? "Верно":"Неверный ответ"})
      }
      this.isFinish = true
    },
     compareArr(arr,arr2){
      return arr.length == arr2.length &&  !_.difference(arr,arr2).length 
    },
    compareText(text,text2){
      return text.toLowerCase().includes(text2.toLowerCase())
    }
  },
  watch:{
    title(){
      console.log("Changed")
      this.randomQuest()
      this.tableItems=[]
      this.isFinish = false
    }
  }
};
</script>
<style scoped>
.card {
  width: 700px;
}
</style>