<template>
  <qrcode-drop-zone @decode='onDecode'>
    <qrcode-stream @decode='onDecode' @init='onInit'></qrcode-stream>
  </qrcode-drop-zone>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'; // TODO:qrcode 打包有点大，待优化
//@ts-ignore
import { QrcodeStream, QrcodeDropZone } from "vue-qrcode-reader";
import { Action } from "vuex-class";
import { toast } from "@/components/toast";
import { USER__LOGIN } from "@/store/user/type";

const QRCODE_ERROR: Object = Object.freeze({
  "NotAllowedError": "请授权相机使用权",
  "NotFoundError": "没有相机",
  "NotSupportedError": "域名必须为(localhost or HTTPS)",
  "NotReadableError": "相机没有准备好",
  "OverconstrainedError": "相机不匹配",
  "StreamApiNotSupportedError": "浏览器不支持Stream Api"
})

@Component({
  components: {
    QrcodeStream,
    QrcodeDropZone
  }
})
export default class QrcodeLogin extends Vue {
  @Action(USER__LOGIN) userLogin!: (accessToken: string) => never;

  onDecode(res: string) {
    if (res.length < 36) return toast.show('accessToken不对');
    this.userLogin(res);
    this.$router.go(-1);
  }
  async onInit(promise: Promise<any>) {
    try {
      await promise;
    } catch (error) {
      console.error("TCL: QrcodeLogin -> onInit -> error %o", error)
      //@ts-ignore
      toast.show(QRCODE_ERROR[error.name]);
      this.$router.go(-1);
    }
  }
}
</script>

<style lang='scss'>
</style>