<template lang="pug">
  div
    //- div {{quests}}
    div {{sca}}
    v-card.mx-auto.card.mt-10(elevation="2")
        v-card-title {{text.main.title}}
        v-card-subtitle {{text.main.subtitle}}
        v-card-text {{text.main.text}}
    v-lazy(v-for="(q,i) in quests", :key="q.text" :options="{ threshold: .9 }" min-height="50" transition="fade-transition" )
      v-card.mx-auto.card.mt-10(elevation="2")
        v-card-title Задание №{{i+1}}
        v-card-subtitle {{q.text}}
        //- v-card-text {{q.answer}}  

        v-card-text(v-if="q.type == 'radio'")
          v-radio-group(v-model="q.answer")
            v-radio(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" dense)
            
        v-card-text(v-if="q.type == 'checkbox'")
          v-checkbox.my-0(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" v-model="q.answer" dense)

        v-card-text(v-if="q.type == 'text'")
          v-text-field(:label="q.text" v-model="q.answer" )         
            

</template>

<script>
import {text,questions} from "../plugins/text";
import _ from "lodash";
export default {
  name: "CardView",

  props: {
    questions: null,
  },

  data: () => ({
    text:text,
    quests:questions,
    arr:["a","b"],
    arr2:["a","b"]
  }),

  computed:{
    sca(){
     return this.arr.length == this.arr2.length &&  !_.difference(this.arr,this.arr2).length
      // return 'HNE'.toLowerCase().includes('hnE'.toLowerCase())
    }
  },

  methods:{
    checkTextAnswer(orig,text){
      return orig + text
    }
  }
};
</script>
<style scoped>
.card {
  width: 700px;
}
</style>