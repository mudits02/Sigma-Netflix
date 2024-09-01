# General Docs of the project

1. ***useRef()*** -> **useRef()** is a React Hook that lets you reference a value that’s not needed for rendering.<br><br>
2. It basically returns an object of the information where it is referenced to , and inside the () , we provide the initial value to be put inside it.<br><br>

## Deployment on Google Firebase

1. Install firebase CLI 
```
npm install -g firebase-tools
```

2. Firebase login 
```
firebase login
```

3. Initialize Firebase 

```
firebase init
```

4. Deploy command
```
firebase deploy
```

## General Logic changes

1. We have put the **useEffect()** inside the **header** because we want to navigate after the user is authenticated and for that we needed to use **navigate** just after we authenticate and that was possible only inside the useEffect() but for that needs to be under under routes , so we did under the **header** coz its a route declared in the body component.<br><br>
2. 
