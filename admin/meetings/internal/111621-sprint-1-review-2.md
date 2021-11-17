Date: 11/14/2021

Time: 6:30PM - 7PM

Topic: First Sprint Review Round 2

Type: In Person

MM author: Kaiwen Tsou

# In Attendance:

All members present. Alex, Faris, and Misha had to leave at about the 10 minute mark.

# Context

We had finished Sprint Review 1 during our last internal meeting Sunday, but our supervisor found it inadequate and asked that we do it again. This meeting more thoroughly goes over each person's progress, and reveals some holes in our plan. 

# Meeting result
We are calling a Mob Programming Session ASAP to address these issues and get on the same page as a team. 

# Agenda

1. Role call for everyone's current and completed tasks, as some tasks that were issued were done so verbally and not over GitHub Issues.
2. Review Project Architecture and plans.

# Meeting Minutes

## Status of each member/subteam

1. Misha and Laurence- currently working on Detailed Recipe Page. Misha has some commits on the page, and says it is close to being done. 
2. Alex and Faris- Currently working on Recipe Info (recipe cards that populate search page), and Saved Recipes page. Majority of work is completed. Faris had also done some management work, reviewing, and installed some additional tools to the project. 
3. Antonia and Jon- Finished with the front end of the site. Currently awaiting tasks, will be assigned some ASAP so they are not idle (not that they are generally idle, but they want to contribute to the project). 
4. Robert- Close to done with API Helper functions. Will get documentation to testing team soon. Other teams working on .js are dependent on this to reach MVP stage.
5. Fred and Harry- Expect to finish localStorage helpers tonight and get documentation to testing team. Other teams working on .js are also dependent on this to reach MVP stage.
6. Britney and Kaiwen- Waiting on function documentation to write meaningful tests. In the meantime, Kaiwen laid out some documentation on the GitHub Wiki (possibly moving to a /docs folder) and Britney worked on checking the linter and thinking up test cases, but no tests have yet been written. 

## Observations by team

1. We did not plan enough. People were assigned vague tasks, and on questioning, almost nobody had an answer to "what will it look like when your project is done". 
2. Too many dependencies floating around. There are multiple chains of dependencies that are leading to production bottlenecks. i.e. testing team needs documentation, script writers need helper functions
3. We need to refactor. There are many redundant files floating around the repo, and the folder layout is not being observed.

# Conclusions

1. We will need to have a clearer overarching plan if we all want to contribute fairly to the project, rather than a single person at the last second spaghetti-coding to a MVP. 
2. Tasks (via GitHub Issues) will have to be decomposed better and be more clear.
3. We will hold an emergency Mob Programming Session ASAP to refactor.