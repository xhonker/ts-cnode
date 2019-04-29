<template>
  <content-loader
    :class='$style.skeleton'
    :height='160'
    :speed='1'
    :width='400'
    primaryColor='#ebebeb'
    secondaryColor='#ffffff'
  >
    <rect height='6' rx='4' ry='4' width='117' x='70' y='15'/>
    <rect height='6' rx='3' ry='3' width='85' x='70' y='35'/>
    <rect height='6' rx='3' ry='3' width='350' x='10' y='80'/>
    <rect height='6' rx='3' ry='3' width='380' x='10' y='100'/>
    <rect height='6' rx='3' ry='3' width='201' x='10' y='120'/>

    <rect height='32' rx='0' ry='0' width='32' x='8.63' y='14.2'/> <!--头像位置-->

    <rect height='6' rx='0' ry='0' width='65' x='10' y='140'/>
    <rect height='6' rx='0' ry='0' width='65' x='153' y='140'/>
    <rect height='6' rx='0' ry='0' width='65' x='286' y='140'/>
  </content-loader>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
//@ts-ignore
import { ContentLoader } from "vue-content-loader";
@Component({
  components: {
    ContentLoader
  }
})
export default class TopicsSkeleton extends Vue {

}
</script>

<style lang='scss' module>
.skeleton {
  margin: 5px 7px;
  background-color: #fff;
  box-shadow: 1px 0.625vw 0.9375vw rgba(0, 0, 0, 0.1);
}
</style>