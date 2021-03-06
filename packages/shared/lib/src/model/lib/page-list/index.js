/* eslint-disable prefer-const */
/*
 * @Author: your name
 * @Date: 2021-03-15 18:47:27
 * @LastEditTime: 2022-04-14 10:07:51
 * @LastEditors: Please set LastEditors
 * @Description: 主要生成列表类
 * @FilePath: /robot-web/src/model/lib/listConstruct/index.js
 */
const _ = require('lodash')
export class MPageListModel {
  constructor({
    // api
    apiFun = null,

    // 筛选的
    query = [],

    // 列表设置
    columns = [],

    // 列表设置
    tableSetting = {},

    // 其他参数
    otherParams = null,

    // 默认筛选
    defaultSearchFormData = {},

    // 列表请求参数名和默认参数
    listSeting = new MListOptions({}),

    list = [],

    // 是否展示分页
    isShowPagination = true,

    // excel导出设置
    exportExcelOptions = new ExportExcelOptions({}),

    // 是否可选
    isSelection = false,

    // 是否自动初始化
    isAutoInit = true

  }) {
    this.apiFun = apiFun

    // 处理 query
    let searchFormData = {}
    query.map(({ prop, defaultValue }) => {
      if (prop) {
        let setValue = ''
        if (defaultValue) {
          setValue = defaultValue
        }
        _.set(searchFormData, prop, setValue)
      }
    })
    this.query = {
      formItems: query,
      searchFormData
    }

    this.columns = columns
    this.tableSetting = tableSetting
    this.otherParams = otherParams
    this.defaultSearchFormData = defaultSearchFormData
    this.listSeting = listSeting
    this.list = list
    this.totalElement = 1
    this.isShowPagination = isShowPagination
    this.exportExcelOptions = exportExcelOptions
    this.isSelection = isSelection
    this.selected = []
    this.isAutoInit = isAutoInit
  }
}

export class MListOptions {
  constructor({
    currentKeyName = 'pageIndex',
    sizeKeyName = 'pageSize',
    defalutCurrent = 1,
    defalutSize = 10
  }) {
    this.keyName = {
      currentKeyName,
      sizeKeyName
    }
    this.defaultValue = {
      current: defalutCurrent,
      size: defalutSize
    }
    this.setValue = {
      current: defalutCurrent,
      size: defalutSize
    }
  }
}

export class ExportExcelOptions {
  constructor({
    headerText = [],
    headerKey = [],
    beforeExportExcel = null
  }) {
    this.headerText = headerText
    this.headerKey = headerKey
    this.beforeExportExcel = beforeExportExcel
  }
}

export class MFormItemModel {
  constructor({
    label = '',
    prop = '', // 键名
    defaultValue = null, //  键值
    el_type = 'MInput', // 表单输入框类型
    options = {}, // 各个类型输入框的配置项
    change = new Function(), // 改变的回调
    rules = [], // 输入框的规则
    isShowItem = true, // 是否展示，value会记录
    required = true, // 是否必填
    isIgnore = false, // 是否忽略，value不计入
    itemBoxStyle = null, // 盒子的style
    itemBoxClass = null, // 盒子自定义class
    render = null, // 进行render的函数
    disabled = false
  }) {
    const requiredRules = [{ required: true, message: label + '不能为空' }]
    this.label = label
    this.prop = prop
    this.defaultValue = defaultValue
    this.el_type = el_type
    this.options = options
    this.change = change
    this.rules = !required ? rules : rules.concat(requiredRules)
    this.isShowItem = isShowItem
    this.required = required
    this.isIgnore = isIgnore
    this.itemBoxStyle = itemBoxStyle
    this.itemBoxClass = itemBoxClass
    this.render = render
    this.disabled = disabled
  }
}

export class DialogOptionModel {
  constructor({
    dialogAtter = {},
    generateFormItems = () => {
      return { originFormItems: [], originFormData: {}}
    },
    createInterceptor = (formOriginData, formData, extraData) => { },
    editInterceptor = (formOriginData, formData, extraData) => {},
    authInterceptor = (formOriginData, formData, extraData) => {},
    submitSuccess = () => {}
  }) {
    // 弹框ref
    this.ref = _.uniqueId('form_')

    // 生成表单
    this.generateFormItems = generateFormItems

    // 生成api
    this.createInterceptor = createInterceptor
    this.editInterceptor = editInterceptor
    this.authInterceptor = authInterceptor

    // 提交结束
    this.submitSuccess = submitSuccess

    // 弹框设置
    let defaultDialogAtter = {
      title: '',
      'destroy-on-close': true,
      'modal-append-to-body': false,
      'close-on-click-modal': false
    }
    this.dialogAtter = _.defaults({}, dialogAtter, defaultDialogAtter)
    console.log(this.dialogAtter)
  }
}
