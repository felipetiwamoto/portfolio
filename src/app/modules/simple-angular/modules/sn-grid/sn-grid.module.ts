import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {SnRowDirective} from './directives/sn-row/sn-row.directive'
import {SnColumnDirective} from './directives/sn-column/sn-column.directive'
import {SnOffsetDirective} from './directives/sn-offset/sn-offset.directive'
import {SnPushDirective} from './directives/sn-push/sn-push.directive'
import {SnOrderDirective} from './directives/sn-order/sn-order.directive'

@NgModule({
	declarations: [SnRowDirective, SnColumnDirective, SnOffsetDirective, SnPushDirective, SnOrderDirective],
	imports: [CommonModule],
	exports: [SnRowDirective, SnColumnDirective, SnOffsetDirective, SnPushDirective, SnOrderDirective],
})
export class SnGridModule {}
