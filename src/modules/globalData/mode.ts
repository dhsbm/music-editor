import { ref } from 'vue'
import { Mode } from './Interface'

// 模式 1-选择 2-添加 3-裁剪 4-删除
const mode = ref(Mode.Select)

export default mode
