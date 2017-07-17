/**
 * Created by liko on 2017/6/29.
 */
import Mock from 'mockjs'
// 使用 Mock
export default Mock.mock({
  'orders|10-30': [
    {
      'id|+1': 28394857209,
      'state|1': ['已处理', '未处理','处理中'],
      'from|1': ['来电', '现场', '营业厅'],
      'fromPhone': /^1[0-9]{10}$/,
      'phone': /^1[0-9]{10}$/,
      'number': /\d{5,10}/,
      'complainant': '@cname',
      'complainantType|1': ['用户投诉', '其他投诉'],
      'type|1': ['水表问题', '服务投诉类', '污水设施处理事务', '消防栓警告阀门问题', '水管漏水'],
      'typeChild|1': ['子类别一', '子类别二', '子类别三', '子类别四'],
      'date': '@datetime',
      'viewDate': '@datetime',
      'unit|1': ['凌铁水厂', '北部水厂', '南部水厂', '中部水厂', '东部水厂', '西部水厂'],
      'respeople': '@cname',
      'address': '@county(true)',
      'describe': '@cparagraph(1)',
      'note': '@cparagraph(5)',
      'entTimeLimt|20-30': 1,
      'finishTimeLimt|20-30': 1,
      'receiver': '@cname',
      'manage|5-10': [{
        'type|1': ['工单处理', '工单结束', '信息单', '重复单', '误报单'],
        'date': '@datetime',
        'operator': '@cname',
        'note': '@cparagraph(5)',
        'content': '@cparagraph(6)'
      }]
    }
  ]
})
