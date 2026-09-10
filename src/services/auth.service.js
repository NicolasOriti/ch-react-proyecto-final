import { auth } from './firebase';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  console.log('userCredential', userCredential);
  localStorage.setItem('user', JSON.stringify(userCredential.user));

  return userCredential;
};

export const register = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);

  console.log('userCredential', userCredential);
  localStorage.setItem('user', JSON.stringify(userCredential.user));

  return userCredential;
};