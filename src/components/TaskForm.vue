<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const emit = defineEmits(["create-task"]);

const task = ref({
  task: "",
  invalid: false,
  errMsg: "",
});
const selectedCategory= ref('');

// Function to create a task, emitting an event with task details if valid; 
// otherwise, sets error messages and flags.

const createTask = () => {
  task.value.invalid = false;
  if (task.value.task !== '' && selectedCategory.value !== '') {
  emit('create-task',task.value.task, selectedCategory.value);
  task.value.task = '';
  selectedCategory.value = '';
  return;
  }
  if (selectedCategory.value === '') {
    task.value.errMsg = 'Please select a category!';
    } else {
    task.value.errMsg = 'Task value cannot be empty!';
    }
  task.value.invalid = true;
  return;
  
}; 

</script>

<template>

<div class="container">
  <div class="form" :class="{ 'form-err': task.invalid }">
    <input type="text" v-model="task.task" placeholder="What do you want to do today?" @keyup.enter="createTask" />
    
    <h4>Pick a category</h4>
    <div class="category">
      <label class="work">
      <Icon class="icon" icon="streamline-emojis:briefcase" />
        <input 
        type="radio"
        name="category"
        value="work"
        v-model="selectedCategory" 
        @keyup.enter="createTask"/>
        <div >work</div>
      </label>

      <label class="personal">
        <Icon class="icon" icon="emojione:notebook-with-decorative-cover" />
        <input 
        type="radio"
        name="category"
        value="personal"
        v-model="selectedCategory" 
        @keyup.enter="createTask" />
         <div>personal</div>
      </label>

      <label class="shopping">
        <Icon class="icon" icon="twemoji:shopping-cart" />
       <input 
        type="radio"
        name="category"
        value="shopping"
        v-model="selectedCategory" 
        @keyup.enter="createTask"/>
        <div>shopping</div>
      </label>
      
    </div> 
    <p class="err-msg" v-if="task.invalid">{{ task.errMsg }}</p>
    
  </div>
  <button class="button"  @click="createTask">Add</button>

  
</div>

</template>

<style lang="scss" scoped>

.container {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}

input:not([type="radio"]),button {
	appearance: none;
	border: none;
	outline: none;
	background: none;
	cursor: initial;
}

.form input[type="text"] {
	display: block;
	width: 100%;
	font-size: 1.125rem;
	padding: 1rem 1.5rem;
	color: black;
	background-color: #ffffff57;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-top: 1.8rem;
	margin-bottom: 1.8rem;

	&.form-err {
    border-color: red;
  }
}
h4 {
  color: var(--grey);
	font-size: 0.875rem;
	font-weight: 700;
	margin-bottom: 0.5rem;
}
.category {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 1rem;
	margin-bottom: 1.5rem;
}

.category label {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: whitesmoke;
	padding: 1.5rem;
	border-radius: 0.5rem;
  z-index: 0;
  cursor: pointer;
  transition: 0.5s;
}

label.work:hover{
  background: rgb(136, 215, 136);
  box-shadow: 0 0 35px rgb(136, 215, 136);
}

label.personal:hover{
  background: rgb(196, 135, 196);
  box-shadow: 0 0 35px rgb(196, 135, 196);
}

label.shopping:hover{
  background: rgb(191, 193, 98);
  box-shadow: 0 0 35px rgb(191, 193, 98);
}
input[type="radio"]{
	visibility: hidden
}

.category label div {
	color: black;
	font-size: 1.125rem;
	margin-top: 1rem;
}

.icon{
  font-size: 1.5em;
}

button {
	display: block;
	width: 100%;
  margin: auto;
  font-size: 1.5rem;
	padding: 1rem 1.5rem;
  margin-bottom: 1rem;
	color: #FFF;
	font-weight: 700;
	background: linear-gradient(
    #35c6f2, #6498d7, #4547af
  );
	box-shadow: 0 0 35px #35c6f2, #6498d7, #4547af;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: 0.2s ease-out;
}

button:hover {
	opacity: 0.75;
  background: rgb(109, 208, 209);
  box-shadow: 0 0 35px rgb(74, 148, 149);
}
.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
.work { color: #ff5733; }
.personal { color: #33ff57; }
.shopping { color: #5733ff; }



</style>