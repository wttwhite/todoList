<template>
<div>
  <div v-hello="color">{{$store.getters.customStrGetter}}</div>
</div>
</template>
<script>
import {mapState, mapGetters} from 'vuex'
export default {
  name: 'custom',
  directives: {
    'hello': {
      inserted (el, bind) {
        console.log(el) //拿到当前dom
        el.style.background = bind.value
      }
    }
  },
  computed: {
    ...mapState(['color']),
    ...mapGetters([])
  },
  data () {
    return {
      isShow: false
    }
  }
}
</script>
<style lang="css" scoped>
.tran-enter-active, .tran-leave-active {
  transition: all 1.5s;
}
.tran-enter, .tran-leave-to  {
  opacity: 0;
  transform: translateX(100px);
}
.bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in 1.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  50% {
    opacity: 0.5;
    transform: translateX(70px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>