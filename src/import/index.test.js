import { log, change } from './foo'
import bar from './bar'

log()
change()
log()
// -----
bar.log()
bar.change()
bar.log()
