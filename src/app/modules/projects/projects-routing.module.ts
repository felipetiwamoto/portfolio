import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
	{
		path: 'projects',
		children: [
			{
				path: '01',
				loadChildren: () => import('./modules/project01/project01.module').then((m) => m.Project01Module),
			},
		],
	},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ProjectsRoutingModule {}
