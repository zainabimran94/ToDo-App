<template>
  <main>
    <button class="tiny-button" @click="goToHomePage">
       <Icon icon="ep:home-filled" style="color: #175f64" />
    </button>

      <div class="wrap">
      <h2 class="tasks-heading">Your Task's for Today</h2>
       <p v-if="pendingTaskCount > 0" class="tasks-pending">
      <Icon class="bell" icon="emojione-v1:ringing-bell" />
      <span class="pending">You have {{ pendingTaskCount }} pending tasks</span>
       </p>
      </div>
      
  
     <!-- TaskForm -->
  <TaskForm class="task-form" @create-task="createTask" />
     <!--TaskList-->
  <ul class="task-list" v-if="taskList.length > 0">
      <TaskList
        v-for="(task, index) in taskList"
        :task="task"
        :index="index"
        :category="task.category"
        
        @edit-task="toggleEditTask"
        @update-task="updateTask"
        @toggle-complete="toggleTaskComplete"
        @delete-task="deleteTask"
      />
    </ul>
    <!--Task-Msgs-->
    <p v-else class="tasks-msg">
      <Icon icon="noto-v1:sad-but-relieved-face" />
      <span>You have no task's to complete! Add one!</span>
    </p>
    <p v-if="tasksCompleted && taskList.length > 0" class="tasks-msg">
      <Icon icon="noto-v1:party-popper" />
      <span>You have completed all your tasks!</span>
    </p>
   
    
  </main>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { uid } from 'uid';
import {ref, watch, computed} from 'vue';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import {useRouter} from 'vue-router';
import { useSelectedCategory } from "@/composables/useSelectedCategory";


const taskList = ref([]);

const { selectedCategory } = useSelectedCategory();

watch( taskList, () => {
    setTaskListLocalStorage (); },
   { deep: true },
);

const pendingTaskCount = computed(() => {
  return taskList.value.filter(task => !task.isCompleted).length;
});
const tasksCompleted = computed(() => {
  return taskList.value.every((task) => task.isCompleted);
});


const fetchTaskList = () => {
  const savedTaskList = JSON.parse(localStorage.getItem("taskList"));
  if (savedTaskList) {
    taskList.value = savedTaskList;
  }
}

fetchTaskList();

const setTaskListLocalStorage = () => {
  localStorage.setItem("taskList", JSON.stringify(taskList.value));
};


const createTask = (task, category) => {
  taskList.value.push ({
  id: uid(),
  task,
  isCompleted: false,
  isEditing: null,
  category,
  });
  };

  const toggleEditTask = (taskPos) => {
  taskList.value[taskPos].isEditing = !taskList.value[taskPos].isEditing;
};

  

const updateTask = (taskVal, taskPos) => {
taskList.value[taskPos].task = taskVal; 
};

const toggleTaskComplete = (taskPos) => {
taskList.value[taskPos].isCompleted = !taskList.value[taskPos].isCompleted;
};

const deleteTask = (task) => {
  taskList.value = taskList.value.filter(
    (taskFilter) => taskFilter.id !== task.id
  );
  
};

const router = useRouter();

const goToHomePage = () => {
  router.push('/');
};

</script>

<style scoped lang="scss">

main {
  display: flex;
  flex-direction: column;
  margin: 0px auto 0px;
  max-width: 1140px;
  min-height: 100%;
  padding: 40px 16px;
  }

 .tiny-button {
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  border: none;
  padding: 10px auto 10px; /* Adjust padding as needed */
  display: inline-flex; /* Use inline-flex to align icon */
  align-items: center; /* Align icon vertically */
  justify-content: center; /* Center icon horizontally */
  font-size: 20px;
  cursor: pointer;
}


.tiny-button:focus,
.tiny-button:active {
  outline: none;
}

.tiny-button:hover {
  opacity: 0.8;
}


.tasks-heading{
  display: flex;
  text-align: center;
  font-size: 1.3rem;
  font-family: cinzel;
  padding: 1rem;
 }

.bell {
  position: relative;
  padding: 5px;
  font-size: 30px;
  
}
.pending {
  margin-left: 10px;
  font-size: 18px;
  color: #333;

}

</style>

