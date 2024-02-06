# React Learnings

* For global state use Redux
  * **Always** use `useSelector` & `dispatch` without `useState` when using react 
* **Never return in a renderer**
* ~~Do not `useState` from `useEffect`, normally we do not need to~~
* ~~Order all custom hooks and react hooks at start of renderer function~~
* Do not `useRef`
* `useMemo` carefully because of garbage collection issues and general performance ???
* Always f. update the given object using its setter, read using its getter: `[test, setTest] = useState<string>("test")`
  * Given `image` use `setImage`, never update partially or else selector won't properly run
  * Given `prompt` use `setPrompt` never update partially or else selector won't properly run
  * Check when reading that you only use the getter, when a value is set using set<XYZ> and if both just check if the instances match either shallow or deep
* Always check your dependency array for useless renders
* Given `useEffect` make sure when syncing data using `dispatch(setSomeValue(...))` that there is some `isEqual` check or similar that avoids rendering loop. 