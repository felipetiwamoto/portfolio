import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
	{path: 'projects', loadChildren: () => import('./modules/projects/projects.module').then((m) => m.ProjectsModule)},
	{
		path: 'landing-pages',
		loadChildren: () => import('./modules/landing-pages/landing-pages.module').then((m) => m.LandingPagesModule),
	},
	{path: 'resumes', loadChildren: () => import('./modules/resumes/resumes.module').then((m) => m.ResumesModule)},
	{path: '**', redirectTo: '/projects/01'},
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
