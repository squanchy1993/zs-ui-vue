<template>
  <el-form-item
    class="form-item"
    v-bind="formItem"
  >
    <el-input
      v-model="componentValue"
      class="item_input"
      autocomplete="off"
      :disabled="formItem.disabled"
      v-bind="formItem.options"
      @input="componentValueChange(componentValue)"
    />
  </el-form-item>
</template>

<script>
export default {
  name: 'MInput',
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    formItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      componentValue: ''
    }
  },
  computed: {
    inputValueChange() {
      // 监听输入value的变化
      return this.value
    }
  },
  watch: {
    inputValueChange: {
      immediate: true,
      handler: function(value) {
        // 延迟到组件创建完毕后再进行
        this.$nextTick(() => {
          if (value != null && this.componentValue !== value) {
            console.log('received value change: ', value)
            this.componentValue = this._.cloneDeep(value)
          }
        })
      }
    }
  },
  methods: {
    // 通知父元素已经变化
    componentValueChange(value) {
      console.log('noticed father: ', value)
      this.$emit('valueChange', value)
      this.formItem.change(value)
    }
  }
}
</script>

