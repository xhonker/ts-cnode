### Options

#### 属性

| 参数        | 说明                         | 类型     | 默认值 | 可选值 |
| ----------- | ---------------------------- | -------- | ------ | ------ |
| useDocument | 是否用 document 做为滚动容器 | boolean  | false  | -      |
| offset      | 距离底部多少触发加载         | number   | 50     | -      |
| loadMore    | 滚动到底部触发回调           | Function | -      | -      |

#### 示例

```html
<template>
  <div class='list'>
    <infinite-loader :loadMore="loadMore" :offset="100" useDocument> <!--放入容器底部-->
      <!-- 放入加载动画 骨架屏等 -->
    </infinite-loader>
  </div>
</template>
```

```js
import InfiniteLoader from 'InfiniteLoader';
export default {
  name: 'test',
  components: {
    InfiniteLoader,
  },
  methods: {
    loadMore() {
      // 加载更多
    },
  },
};
```
