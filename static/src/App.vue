<template>
  <div>
    <h2>Animals</h2>
    <table>
      <tbody>
        <tr>
          <th>Animal</th>
          <th>Class</th>
        </tr>
        <tr v-for="(animal,index) in animals" :key="index">
          <td>{{animal.name}}</td>
          <td>{{animal.animal_class}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "app",
  computed:{
    animals: {
      get(){return this.$store.state.animals},
      set(value){
        this.$store.commit("setItem", {key: "animals", value})
      }
    }
  },
  methods:{
    async fetchAnimals(){
      const resp = await axios({
        method: "GET",
        url: `${process.env.API_URL}/animals`
      })
      console.log(resp)
      this.animals = resp.data
    }
  },
  mounted(){
    console.log(this.$store.state)
    if (!this.animals.length){
      this.fetchAnimals()
    }
  },
  serverPrefetch(){
    return this.fetchAnimals()
  }
}
</script>