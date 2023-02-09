<template lang="pug">
  div()
    //- div {{test}}
    //- div {{sca}}
    v-card.mx-auto.card.mt-10(elevation="2")
        v-card-title {{test.main.title}}
        v-card-subtitle {{test.main.subtitle}}
        v-card-text {{test.main.text}}
    v-lazy(v-for="(q,i) in test.questions", :key="q.text" :options="{ threshold: .9 }" min-height="50" transition="fade-transition" )
      v-card.mx-auto.card.mt-10(elevation="2")
        v-card-title Задание №{{i+1}}
        v-card-subtitle {{q.text}}
        //- v-card-text {{q.answer}}  

        v-card-text(v-if="q.type == 'radio'")
          v-radio-group(v-model="q.answer")
            v-radio(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" dense)
            
        v-card-text(v-else-if="q.type == 'checkbox'")
          v-checkbox.my-0(v-for="(option,i) in q.options" :key="option.text" :label="option.text" :value="i" v-model="q.answer" dense)

        v-card-text(v-else-if="q.type == 'text'")
          v-text-field(:label="'Введите ответ'" v-model="q.answer" )         
   

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
    arr:["a","b"],
    arr2:["a","b"]
  }),

  computed:{
    sca(){
     return this.arr.length == this.arr2.length &&  !_.difference(this.arr,this.arr2).length
      // return 'HNE'.toLowerCase().includes('hnE'.toLowerCase())
    }
  },
  created(){
    console.log("Created")
    this.test = tests[this.title]
    // console.log(tests[this.title])
  },
  methods:{
    checkTextAnswer(orig,text){
      return orig + text
    }
  },
  watch:{
    title(){
      console.log("Changed")
      this.test = tests[this.title]
    }
  }
};
</script>
<style scoped>
.card {
  width: 700px;
}
</style>