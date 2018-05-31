
```
src/
└── featureName/
    ├── index.js
    ├── App.js
    ├── api/
    ├── routes/
    ├── components/
    ├── cookies.js
    ├── permissions.js
    ├── redux/
    ├── serverApi/
    ├── test/
    └── util/
```


#### index.js
* Entry point for app
* Contains BaseRoute
```javascript
const baseRoute = (
  <HomePageRoute
    path={paths.homepage(":featureId")}
    ensureLoggedIn
    component={HomePage}
  />
);

export default {
  register: callback =>
    callback(baseRoute, {
      [root.STATE_SLICES.ROOT]: reducer.default(),
    }),
};
```

#### App.js
* Where routes for the app live
* React router 4 allow routes to be defined dynamically
```javascript
export default props => (
  <BaseLayout featureId={props.match.params.featureId}>
    <Switch>
      <HomePageRoute
        path={paths.homepage(":featureId")}
        exact
        component={HomePage}
      />
      <SingleItemPageRoute
        path={paths.singleItem(":featureId", ":secondaryId")}
        exact
        component={SingleItem}
      />
    </Switch>
  </BaseLayout>
);
```

#### api.js
* Can be a file or a folder of separate files, depending on feature size
* Contains wrappers around server-side requests
* requests wrapped and exported as functions
* 

#### routes/
* index.js file defining all js routes for app
* Folders named for each page / route
* Within each folder:
  * index.js 
    * Contains only exports of components in folder
  * Component.js
    * Static component represented by route / page
  * ComponentContainer.js
    * Optional container file if props / callbacks needed

#### cookies.js
* Exports a map of all cookies
```javascript
export default {
  COOKIE_ONE: "namespace.cookie1",
  COOKIE_TWO: "namespace.cookie2",
};
```

#### redux/
* All redux related code
* Each reducer has own file
* reducer.js
  * Actions
  * Action Creators
  * Constants
  * Selectors

#### serverApi/
* Example structure
```
src/submittals/serverApi/
├── client.js
├── client.test.js
├── constants.js
├── fileUpload.js
├── poll.js
├── responseHelpers.js
├── routes.js
└── serializers
```
* client.js
  * Where all api calls live in app
  * Can be namespaced by sub-feature
  


#### tests/

#### util/