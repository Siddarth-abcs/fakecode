import * as types from "../actionsTypes/authActionTypes"
import fire from "../../config/firebase"

const loginUser = (payload) => {
    return {
        type: types.SIGN_IN,
        payload
    };   
}

const logoutUser = () => {
    return {
        type: types.SIGN_OUT,
    }
}
// action creator

export const signInUser = (email,password,setSuccess) => (dispatch) => {
    fire
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then((user)=> {
       dispatch(
        loginUser({
            uid: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName,
        })
       );
       setSuccess(true)
    })
    .catch((error) => {
        alert("invalid email or password!")
    })
}


export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
    email = email + "@gmail.com"
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Create a user profile
        fire
          .auth()
          .currentUser.updateProfile({
            displayName: name,
          })
          .then(() => {
            const currentUser = fire.auth().currentUser;
            dispatch(
              loginUser({
                uid: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
                // password: password,
              })
            );
            setSuccess(true);
  
            // Create a folder for the user
            const folderData = {
              createdAt: new Date(),
              name: currentUser.displayName, // Replace with the desired folder name
              userId: currentUser.uid,
              createdBy: currentUser.displayName,
              path: [],
              parent: 'root',
              lastAccessed: null,
              updatedAt: new Date(),
              password: password,
            };
  
            fire
              .firestore()
              .collection('folders')
              .add(folderData)
              .then((folderDocRef) => {
                // You can add more code here after folder creation if needed
              })
              .catch((folderError) => {
                console.error('Error creating user folder:', folderError);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          alert('Email already in use');
        }
        if (error.code === 'auth/invalid-email') {
          alert('Invalid email');
        }
        if (error.code === 'auth/weak-password') {
          alert('Weak password');
        }
      });
  };


export const signOutUser = () => (dispatch) => {
    fire
    .auth()
    .signOut()
    .then(() => {
        dispatch(logoutUser())
    })
}

export const checkIsLoggedIn = () => dispatch => {
    fire.auth().onAuthStateChanged(user =>{
        if(user){
            dispatch(loginUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            }))
        }
    })
}