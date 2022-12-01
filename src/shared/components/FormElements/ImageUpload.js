import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";
import "./Input.css";

import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);



  const filePickerRef = useRef();

  useEffect(() => {
    if(!file) {
        return;
    }
    const fileReader = new FileReader(); //helps read files
    fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  }, [file])

  const pickHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1){
        pickedFile = e.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
    }else {
        setIsValid(false);
        fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid)
   
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={pickHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Por favor escolha uma imagem</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Escolha uma imagem
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
