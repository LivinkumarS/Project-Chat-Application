import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getFirestore,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-application-3e250.firebaseapp.com",
  projectId: "chat-application-3e250",
  storageBucket: "chat-application-3e250.appspot.com",
  messagingSenderId: "289400416848",
  appId: "1:289400416848:web:a8f6a7d35b9060342f3f55",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const domain = email.split("@")[1];
    const usernameLower = username.toLowerCase();

    const usernameRegex = /^[a-zA-Z0-9_]{8,}$/;
    if (!usernameRegex.test(usernameLower)) {
      toast.error(
        "Username must be at least 8 characters long and can only contain letters, numbers, and underscores."
      );
      return;
    }

    const emailQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const emailSnapshot = await getDocs(emailQuery);
    if (!emailSnapshot.empty) {
      toast.error("An account with this email already exists.");
      return;
    }

    const usernameQuery = query(
      collection(db, "users"),
      where("username", "==", usernameLower)
    );
    const usernameSnapshot = await getDocs(usernameQuery);

    let usernameExistsInDomain = false;
    usernameSnapshot.forEach((doc) => {
      const user = doc.data();
      if (user.email.split("@")[1] === domain) {
        usernameExistsInDomain = true;
      }
    });

    if (usernameExistsInDomain) {
      toast.error(
        "An account with this username already exists in your domain."
      );
      return;
    }

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: usernameLower,
      email,
      name: "",
      avatar: "",
      bio: "Hey there, I'm using chat application!",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });

    toast.success("User registered successfully!");
  } catch (err) {
    console.error(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (err) {
    console.error(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logout successful!");
  } catch (err) {
    console.error(err);
    toast.error(err.code.split("/")[1].split("-").join(" "));
  }
};

export { signup, login, logout, auth, db };
