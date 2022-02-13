# PaylocityChallenge

Startup instructions:
The frontend and backend are contained in the same solution folder, however they require different steps to run. I created the backend using Visual Studio 2022 and .NET 6.0. The frontend was created using the "create-react-app" TypeScript template. You will need NPM installed.

### Backend:

	1. Open the solution in Visual Studio
	2. Set the startup project to be the Paylocity.API
	3. Start
  
### Frontend:

	1. Open the frontend project, /paylocity-frontend, in VSCode, or just head to the path in a cmd tool like PowerShell
	2. Run: npm install
	3. Run: npm start



## Architecture Overview

The architecture of the backend follows a simple, generic implementation of the Clean Architecture pattern. The flow of the layers is as follows: Controller (API) -> Repository/Business -> DataAccess. The inner most reference is the Models project, which contains all of our internal domain models. The Common project is used for configuration models and interfaces used by all of the layers. DI is implemented via the built-in .NET injector, hence the need to have the WebAPI project reference all of the internals of the other layers. Automapper is used to map between the DB models and the view models, which are currently a 1-1 due to the simplicity of the current project, but are in place to show how we can create front-end views that show specific parts of a model, in the event we don't want to show the entire set of properties.
Most of the core services at each layer are marked as internal and are accessible via public facing interfaces. This loose design promotes encapsulation and allows for clean DI. 
Included was a unit testing project for the business layer. This project utilizes the Moq library for data mocking purposes, as well as NUnit for the core test runner.
Next, we'll go though each layer in more detail. At the end, I will discuss the component which are missing and would be needed in a production environment:

### API: 

The API follows a basic REST pattern utilizing the proper verbs for the type of operation. (Ex: Http DELETE for deleting models) The BaseController is a generic which takes the type parameters of the implementing controller's model and view model, as well as an IRepository<T>.  The base controller is pretty self explanatory for the most part, containing support for basic CRUD operations. (Create, Read, Update, Delete, List)
This approach keeps it simple for controllers that don't need a lot of specific logic, and since it takes TViewModel as a generic type parameter, we have built in support for multiple controllers referencing the same TModel, but different TViewModels.

### Repository: 
  The Repository layer also follows a generic approach similar to the controllers. They take a generic TModel as a type parameter as well as an IDataAccess<TModel>. They mainly just forward the requests along to the data access layer. The point of this layer is to act as an intermediary between any layer which requires data, and the data access layer. This loose coupling ensures that if we need to swap out the DB for something else, we can do so without rewiring the entire application. Not needed here, but we also have the option to build up more complex models, should something like the UI require it. We can have a repository access multiple other data accesses to create a more complex DTO.

### Data Access: 
  The Data Access layer utilizes Dapper as it's ORM and a SQLite DB for it's portability. Again, this layer follows the theme of a generic type parameter matching our domain model. While it's defined in the Common project, it makes sense to talk about it here. The main type constraint for TModel is IUniqueModel. This interface has a single property, Id, which we can use to ensure each domain model effectively maps to an integer Id Primary Key column on the data side. This makes lookups easy, as well as keeping a common interface among all of the models. It's a bit more constraining when considering View Models and partial updates, but the choice to use the package Z.Dapper.Plus was made for simplicity purposes. Ideally, we would need to write a custom mapper in the event of view models as we won't always be updating entire DB models, and the current approach does not support that as we will always update the entire model, regardless of if the user actually modified all of the properties.

### Models: 
  There is not much to discuss here as it simply contains all of our domain models.

### Common: 
  Similar to above, this project acts as a hub where we can store common interfaces and models.

### Business: 
  This layer is where we can house our business logic. For more complex operations, like running payroll, we wouldn't want to put this logic in the controller or repository, so storing it in a services project accessible by the API layer makes the most sense. It also has a reference to the Repository layer for accessing required data.

### Business.Tests: 
This is a simple Nunit testing project with Moq as the mocking framework. I use the [InternalsVisibleTo] attribute in the business project to allow the testing project to create the necessary components for testing. The flow here is to mirror the exact structure of the project the test project is based off of. In this case, it's just Services. My typical approach is to test following this approach, and then within each testing class, we would create more TestFixtures based on the operations within the class we're testing, and then Tests to support each of those.

## Improvements:
  
### SQL:
  
* SQLite was used solely for it's portability. In a production grade application, I would likely swap it out for something like SQL Server for all of the obvious benefits. 
* I would also add a proper migration system. Currently I have included a script file to show the initial seed of the DB, but I would likely include a tool like DB Up, or if we use Entity Framework, perhaps the built in migrator. Depending on the architecture, we could keep migrations in a separate repository so we don't have versioning issues if multiple repositories utilize the same DB/migrations.
* Payment was kept simple by just associating a payroll table, tblPayroll, with the parent tblCompany. Obviously in the real world, payment for employees varies greatly with types of employment such as Salaried, Part-Time, hourly, Contract, Temporary, etc. We would likely associate the type of employment with the employee, the rate, as well as any other modifiers to could affect the base pay.
* Similar to payment, benefits we're also simplified greatly, just storing the required information from the project spec in tblBenefit. We would need a much more complex system of tables to store more of the rules, and special scenarios, like discounts.

### Data Access:
  
* Following the above, we would need to swap out the Sqlite approach to support SQL Server.
* Ideally a more robust system for accessing connection strings should also be present, perhaps an accessor class that we can inject into the services.
* Support for async operations would also be a must.
* Following the earlier discussion on view models and partial updates, that would also need support. Depending on the approach we take, one possible route could be using a system of mappers to map the view models to some type of service that can create the raw SQL for partial updates. Another approach is to use stored procedures to control what values are updated.

### Business logic:
  
* The biggest issue here is hardcoding the rules for discounts into the calculation. Ideally, we would create a series of tables to store this properly, based on a more real-life environment. The payroll engine can then be modified to hook into these discounts, and other rules on a per client basis.
* Obviously, a payroll engine is much more complex than the one we have here. It would likely be abstracted into several separate projects, each referencing common operations in auxiliary services.
	
### API:
  
* Currently, on all of the CRUD forms, all intended properties are shown. However, in the future, should we add properties that are only visible by users with certain permission levels, we can utilize the view model system in place. I've included a series of view models (currently just 1-1 with the DB models) which are set to map to the corresponding DB models. This way, should we add those new properties only accessible with security permissions, we can create new view models  and only update the values changed in that view model in the larger DB model. This can prevent attacks like overposting.
* Validation and model state. There is currently some client side validation, but that's is not good enough as users can disable JavaScript. For server side validation, we can use the inbuilt ModelState system, or roll our own. If we use our own, some type of system (possibly Aspect driven) can hook into some validation rule set system on a per-model basis, and cleanly return errors to the frontend.
* Some sort of standardized return payload to the frontend. This response could include the data payload, a message of sorts if needed, perhaps an internal status code if we use something like that. 
	
### General:
  
* Global error handling. We can use a global exception handler as a global attribute or middleware. From there we can hook into logging.
* Logging. For small projects, I like to use NLog, but in the production world something like Badger, Sentry, or DataDog works better. A clean abstraction that we can inject when necessary would be ideal.
* Security. Authorization and Authentication are not present here. We can handle security by attaching a system of roles and abilities to each user after they authenticate and check this on each request to make sure security context hasn't changed. I like to use attributes decorated on controllers and actions, containing the role/ability required. For login, we would want something secure like OAuth 2.0.
* Unit testing the other projects. (API, repository…)
* To increase encapsulation, core components (Data Access/Repository) were marked internal and are accessible via public facing interfaces. These are registered in the DI container by using the [InternalsVisibleTo] attribute to allow the API project to see the concrete implementations and register them. An improvement here would be using a more robust DI tool that would allow us to register the components in each project, removing the need to expose via the attribute.
* Documentation.
	
### Frontend:
  
* Unit testing should probably be included.
* Routes can be abstracted into an accessor service that can take parameters to build the routes based on what action is occurring.
* Components don't always resize when the screen does. Media queries can help with this.
* More generic components. Forms are use widely, perhaps a generic metadata driven form?
* Cleaner number formatting with decimals and commas.
* The Back button can be abstracted more cleanly, or turned into a series of breadcrumbs.
* Obvious style/UX structuring enhancements.
