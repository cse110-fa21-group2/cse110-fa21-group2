## Current State
Currently the steps of our pipeline proceed as followed after a programmer begins working on an issue
1. code, actually programming a solution to an issue
 
### Continuous Integration
2. After programming a solution, our developers are expected to lint their code by running the command 'npm run lint', a command we have scripted to run both ESLint and StyleLint.
3. Push these code changes onto a new branch with the naming scheme issue#-issue-name
4. Once a pull request is made our pipeline will check to make sure there are at least 2 human reviewers (we did not add an automated code quality checker as we believe there are too many ways to get around it, however we did play around with some), unit tests are run, and finally linting using the command mentioned before (npm run lint) is run once more just to check whether or not it meets standards.
 
### Continuous Deployment
5. We have a bot that will stage all changes onto Netify so that we can see how the code changes will affect the product.
6. If it passes all of the above tests from our workflow and has the approval from at least one human reviewer, then it can be merged into main.
7. Main is then deployed onto Netify.

### Image of our current workflow
 
![Team H2O Pipeline Diagram](admin/PipelineDiagram.JPG)
 
# In Progress
Currently we are working on:
- Automating E2E Testing
- Automating documentation using JSDoc, we are doing this by adding it into our workflow on Github actions
 
## End State Goal
We hope to get our pipeline to follow this flow:
 
1. code, actually programming a solution to an issue
 
### Continuous Integration
2. After programming a solution, our developers are expected to lint their code by running the command 'npm run lint', a command we have scripted to run both ESLint and StyleLint.
3. Push these code changes onto a new branch with the naming scheme issue#-issue-name
4. Once a pull request is made our pipeline will check to make sure there are at least 2 human reviewers (we did not add an automated code quality checker as we believe there are too many ways to get around it, however we did play around with some), unit tests are run, E2E testing is run, linting using the command mentioned before (npm run lint) is run once more just to check whether or not it meets standards, and if all other tests pass then the functions in any added JS files will be documented using JSDoc in the workflow.
 
### Continuous Deployment
5. We have a bot that will stage all changes onto Netify so that we can see how the code changes will affect the product.
6. If it passes all of the above tests from our workflow and has the approval from at least one human reviewer, then it can be merged into main.
7. Main is then deployed onto Netify.
