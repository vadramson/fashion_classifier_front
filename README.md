# Angular-Starter
Angular Starter App

### Starting the new app
	\> ng new Angular-Starter
	
### Adding a new component 
    \> ng generate component componentName	
	
### Generating a navbar component	
	\> ng g c navbar 
	
### Generating a services 	
	\> ng g s service_name

### Add path to rout
	const routes: Routes = [
	  {path: '', component: WelcomeComponent},
	  {path: 'regions', component: RegionsComponent},
	  {path: 'towns', component: TownsComponent},
	  {path: 'agency', component: AgenciesComponent}
	];