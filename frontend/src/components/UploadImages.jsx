import { useState } from "react";
import jwtFetch from "../store/jwt";

const UploadImages = ({ setImageUploadElement, event }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFilesUrls, setImageFilesUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    const addedImages = await jwtFetch(`/api/events/${event._id}/postImages`, {
      method: "POST",
      body: formData,
    });

    setImageUploadElement(false);
    console.log("success");
    //redirect to wherever we want
  };

  const handleFiles = (e) => {
    const files = Object.values(e.currentTarget.files);

    if (files) {
      files.map((file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          setImageFiles((prevState) => [...prevState, file]);
          setImageFilesUrls((prevState) => [...prevState, fileReader.result]);
        };
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input onChange={handleFiles} type="file" multiple />
      <button>submit</button>
    </form>
  );
};

export default UploadImages;