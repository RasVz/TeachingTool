<template>
  <svg :class="svgClass" v-bind="$attrs">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script setup>


import { computed } from "vue";

const props = defineProps({
  name: {
      type:String,
      required: false
    },
    
})

const iconName = computed(()=>`#icon-${props.name}`);
const svgClass = computed(()=> {
 
  if (props.name) {
        return `svg-icon icon-${props.name}`
      }
      return 'svg-icon'
});
</script>

<style lang='scss'>
.svg-icon {
  width: 1.5em;
  height: 1.5em;
  fill: currentColor;
  vertical-align: middle;
  
}
</style>