import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-toastify"; // Import React Toastify
import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify

const upload = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now() + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Initialize toast for progress tracking
    const toastId = toast("Upload is 0% done", {
      progress: 0,
      autoClose: false,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        // Update the toast with current progress
        toast.update(toastId, {
          render: `Upload is ${progress.toFixed(2)}% done`,
          progress: progress / 100,
        });

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        toast.update(toastId, {
          render: "Upload failed",
          type: "error",
          autoClose: 2000,
        });
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.update(toastId, {
            render: "Upload complete!",
            type: "success",
            autoClose: 2000,
            progress: undefined,
          });
          resolve(downloadURL);
        });
      }
    );
  });
};

export const uploadDP = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${Date.now() + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    const toastId = toast("Upload is 0% done", {
      progress: 0,
      autoClose: false,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.update(toastId, {
          render: `Upload is ${progress.toFixed(2)}% done`,
          progress: progress / 100,
        });

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        toast.update(toastId, {
          render: "Upload failed",
          type: "error",
          autoClose: 2000,
        });
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.update(toastId, {
            render: "Upload complete!",
            type: "success",
            autoClose: 2000,
            progress: undefined,
          });
          resolve(downloadURL);
        });
      }
    );
  });
};

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${Date.now() + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    const toastId = toast("Upload is 0% done", {
      progress: 0,
      autoClose: false,
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.update(toastId, {
          render: `Upload is ${progress.toFixed(2)}% done`,
          progress: progress / 100,
        });

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload failed:", error);
        toast.update(toastId, {
          render: "Upload failed",
          type: "error",
          autoClose: 2000,
        });
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.update(toastId, {
            render: "Upload complete!",
            type: "success",
            autoClose: 2000,
            progress: undefined,
          });
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
