<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const getStarted = () => {
  router.push('/task');
};

</script>

<template>
  <main>
    <div class="home">
      <header> 
      <img src= "../assets/Task-list.svg" >
      <h1>Doingly</h1>
      </header>
      
      <button class="get-started-btn" @click="getStarted">Get Started</button>
    </div>

  </main>
</template>

<style scoped>

main {
  display: flex;
  flex-direction: column;
  max-width: 1140px;
  width: 100%;
  margin: 0px auto 0px;
  padding: 40px 16px;
  
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

header img{
  height: 300px;
}

header h1 {
  margin: 0;
  font-size: 2.3em;
  font-family: Pacifico;
  padding-top: 25px;
  margin-left: 15px;
  color: #373131;
  margin-bottom: 1rem;;
  transform: rotate(2deg);
}

.get-started-btn {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
</style>

