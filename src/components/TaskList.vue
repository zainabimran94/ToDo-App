<script setup>
import { Icon } from "@iconify/vue";

//defineProps is for defining props that the component expects to receive from its parent.
const props = defineProps({
  task: {
    type: Object,
    default: () => {},
  },
  index: {
    type: Number,
    default: 0,
  },
  selectedCategory: {
    type: String,
    required: true,
  },
});

//defineEmits is for defining custom events that the component can emit to communicate with its parent.
defineEmits(["edit-task", "update-task", "toggle-complete", "delete-task"]);
</script>

<template>

  <li>
    <!--This code creates a checkbox to mark tasks as completed. 
    When clicked, it sends a message to the parent component to toggle the completion status.
    It also allows editing task names, sending the new name to the parent component when edited -->

    <input type="checkbox" :value="task.isCompleted"  @input="$emit('toggle-complete', index)" />
    <div class="task">
      <input v-if="task.isEditing" type="text" :value="task.task"  @input="$emit('update-task', $event.target.value, index)" />
      <span v-else :class="{'completed-task': task.isCompleted,}">
        {{ task.task }}
      </span>
    </div>

    <div class="task-actions">
      <Icon
        v-if="task.isEditing"
        icon="ph:check-circle"
        class="icon check-icon"
        color="41b080"
        width="22"
        @click="$emit('edit-task', index)"
      />
      <Icon
        v-else
        icon="ph:pencil-fill"
        class="icon edit-icon"
        color="41b080"
        width="22"
        @click="$emit('edit-task', index)"
      />
      <Icon icon="ph:trash" 
      class="icon trash-icon" 
      color="f95e5e" 
      width="22" 
      @click="$emit('delete-task', task)"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>

li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1rem;
  background-color: #f1f1f1;
  color: black;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    margin-bottom: 1rem;

  &:hover {
    .task-actions {
      opacity: 1;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .task {
    flex: 1;

    .completed-task {
      text-decoration: line-through;
    }

    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .task-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
  
}
</style>