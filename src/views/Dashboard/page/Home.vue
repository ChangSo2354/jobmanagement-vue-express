<script setup>
import JobLineChart from '../component/JobLineChart.vue';
import CardDashboard from '../component/CardDashboard.vue';
import JobOverView from '../component/JobOverView.vue';

</script>

<template>
  <div class="my-0">
    <!-- Dashboard Title -->
    <p class="text-3xl my-4 font-bold mt-7">Dashboard</p>

    <!-- Dashboard Cards -->

     <CardDashboard/>


    <div class="flex mt-5 justify-between">
      <div class="w-[64%] h-[370px]">
        <JobLineChart/>
      </div>
      <div class="w-[34%] h-[370px] ">
        <JobOverView/>
      </div>
    </div>
  </div>
</template>
