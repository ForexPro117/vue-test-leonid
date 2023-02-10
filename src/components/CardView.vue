<template lang="pug">
  div
    v-card.mx-auto.card.mt-10(v-for="(card,j) in test.main" :key="j" elevation="2")
        v-card-title {{card.title}}
        v-card-subtitle {{card.subtitle}}
        v-card-text {{card.text}}
        v-img(v-if="card.image" :src="card.image" contain)
    v-lazy(v-for="(q,i) in test.questions", :key="q.text" :options="{ threshold: .9 }" min-height="50" transition="fade-transition" )
      v-card.mx-auto.card.mt-10(elevation="2")
        v-card-title Задание №{{i+1}}
        v-card-subtitle {{q.text}}
        v-img(v-for="path in q.image" :src="path" contain :key="path")
        v-card-text(v-if="q.type == 'radio'")
          v-radio-group(v-model="q.answer" :disabled="q.checkAnswer")
            v-radio(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" dense)
            
        v-card-text(v-else-if="q.type == 'checkbox'")
          v-checkbox.my-0(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" v-model="q.answer" dense :disabled="q.checkAnswer")

        v-card-text(v-else-if="q.type == 'text'")
          v-text-field(:label="'Введите ответ'" v-model="q.answer"  clearable :disabled="q.checkAnswer")
        v-card-actions
          v-btn(text @click="checkTest(q)"  color="primary" :disabled="q.checkAnswer") Проверить
          div.ml-5(v-html="q.userText")
          v-spacer
          v-btn(v-if="q.checkAnswer" text @click="q.show = !q.show" color="primary") Показать решение
          
        v-expand-transition
          div(v-show="q.show")
            v-divider
            v-card-text {{q.explanation}}
  
          
   

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
    test:null,
  }),
  created(){
    console.log("Created")
    this.randomQuest()
  },
  methods:{
    randomQuest(){
      this.test = _.cloneDeep(tests[this.title])
      // this.test.questions = _.shuffle(this.test.questions)
    },
    checkTest(el){
      let ans = false
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
      el.checkAnswer = true
      if(ans)
        el.userText = "<div style='color:green'>Ответ верный!</div>"
      else  
        el.userText  = "<span style='color:red'>Неправильный ответ!</span>   Верный ответ: "+this.answerToString(el)
      
    },
    answerToString(el){
      let ans = null
      switch (el.type) {
        case "checkbox":
          ans = el.rightAnswer.map((num)=>num+1)
          break;
        case "radio":
          ans = (el.rightAnswer+1) 
          break;
        case "text":
          ans = el.rightAnswer
          break;
      }
      return ans.toString()
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
    }
  }
};
</script>
<style scoped>
.card {
  width: 700px;
}
</style>