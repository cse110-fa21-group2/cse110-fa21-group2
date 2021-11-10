

## Context and Problem Statement

We want to record architectural decision for data storage in this project.
What storage should we use ?

## Considered Options

* Local Storage (https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* Indexeddb (https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)


## Decision Outcome

Chosen option: "Local Storage", because

* Although Local Storage has limited storage room, it's very simple and fast to implement.
* Number of recipes we can display in a single page is limited since we don't want to overwhelm the users. Thus, we don't need to storage a lot of recipes
* We should put getters and sets in a single file called storage.js, if we run into issues with local storage not having enough space. we can easily switch to indexeddb.
