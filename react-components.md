## Component Declaraction

### Functional Component Declaration
```javascript
function TestComponent(props) {
  return <div>Hello, {props.name}</div>;
}
```

### Function Expression Component Declaration
```javascript
const TestComponent = (props) => (
  <div>Hello, {props.name}</div>
);
```

### ES6 Class Component Declaraction
```javascript
class TestComponent extends React.Component {
  render() {
    return <div>Hello, {this.props.name}</div>
  }
}
```

- State only available to components defined as classes
- Props accessed via 'this' rather than passed into function
- Class based components have access to lifecycle methods
- Using ES6 classes, need to bind context in constructor

### PropTypes
```javascript
TestComponent.propTypes = {
  stringProp: React.PropTypes.string,
  funcProp: React.PropTypes.func,
}
```

### Default Props
```javascript
TestComonent.defaultProps = {
  stringProp: 'Default Value',
}
```

### State Initialization
class TestComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      stateAttr: 'Default Value',
    };
  } 
  ...
};

### Context Binding
```javascript
class TestComponent extends React.Component {
  constructor() {
    super();
    this._handleClick = this._handleClick.bind(this);
  }
  ...
};
```

### Context Binding V2 - Base Component
```javascript
class BaseComponent extends React.Component {
  _bind(...methods) {
    methods.forEach(method => this[method] = this[method].bind(this));
  }
};
class TestComponent extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleClick', '_handleFoo');
  }
  ...
};
```

### Component Rendering
```javascript
ReactDOM.render(
  <TestComponent name={"ElementName"} />,
  document.getElementById('root')
);
```


## Lifecycle Hooks and Use Cases

### componentWillMount()
- Use constructor for most things
- Use to initialize external API connections on root component (e.g. Firebase)
- Nothing has changed since component's constructor was called
- DO NOT use for fetching AJAX data

### componentDidMount()
- Initialize AJAX requests - guarranteed to have component
- Add event listeners
- Initialie 3rd party libraries that rely on DOM (e.g. D3)
- Drawing on newly rendered <canvas> elements
- Can call setState

### componentWillReceiveProps(nextProps)
- Check to see which props are changing
- Take action based on props changing to trigger state
- Not called on initial render
- Can calculate complex state based on multiple props
- Can call setState

### shouldComponentUpdate(nextProps, nextState)
- Use to improve performance, prevent unnecessary re-renders
- Returns boolean to determine whether to re-render

### componentWillUpdate(nextProps, nextState)
- Functionally similar to componentWillReceiveProps
- Relatively unused
- Last thing called before render
- Can start animations
- Can dispatch events
- Can't call setState

### componentDidUpdate(prevProps, prevState)
- Can do same things we do in componentDidMount
- When you need something to absolutely be last thing executed after render
- Auto-saving state updates from data entry
- Redraw / rearrange layout after DOM rendering finishes
- Update 3rd party library states (e.g. D3)
- Use componentWillReceiveProps to efficiently redraw <canvas> since you know how component will update

### componentWillUnmount()
- Remove event listeners
- Cancel network requests
- Invalidate timers


## Lifecycle Changes React 17

### componentWillMount() - REMOVED
- Use constructor

### componentWillReceiveProps(nextProps) - REMOVED
- Use getDerivedStateFromProps

### componentWillUpdate(nextProps, nextState) - REMOVED
- Use getSnapshotBeforeUpdate

### getDerivedStateFromProps(nextProps, prevState) - NEW
- Can replace both componentWillRecieveProps and componentDidUpdate
- Static function
- Called both after component is created and when it receives a new prop
- Returns object to update state in response to prop changes
- Return null for no state change

### getSnapshotBeforeUpdate(prevProps, prevState) - NEW
- Can replace both componentWillUpdate and componentDidUpdate
- Called right before DOM updated
- Value returned is passed to componentDidUpdate
- Use for resizing window during async rendering
- Can return single value or hash, meaning up to implementor

### componentDidUpdate(prevProps, prevState, snapshot)
- Now passed snapshot returned by getSnapshotBeforeUpdate
- Snapshot can be null

### componentDidCatch(error, info)
- Only use for recovering from unexpected errors, not control flow
- Place at top level of sub tree that you wish to guard against uncaught errors

