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
2. We are laso unsubscribing to the **onAuthStateChanged** callback. <br><br>
3. We observe that whenever we do an API call , the data is rendered twice , this happens because create-react-app wrapps our ***index.js*** around the **Strict Mode** , this because renders our components twice to check if there is any inconsistency in the render cycle of our components.<br><br>
4. The thing to be noted is that this twice rendering happens only in development phase and not in the **prod** phase , once the application is in the production phase , it calls it only once or as intended.<br><br>

5. **movieReducer (or any reducer)** : This is a function automatically created by createSlice. It listens for specific actions (like adding now playing movies) and updates the movie part of your state accordingly.

6. We will make the fetchMovieData into a custom hook rather than doing it in the **Browse.js** coz we want that only render logic is in the component.<br><br>

7. For passing the **Video_id** of the trailer's youtube link , we have 2 methods , first is to use make **state** variable and set it and pass it directly and second is to store this **video_id** in a redux store and then fetch it wherever required.<br><br>


