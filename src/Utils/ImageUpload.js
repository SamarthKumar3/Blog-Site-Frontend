import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

const ImageUpload = props => {
    const [file, setFile] = useState();

    const [previewUrl, setPreviewUrl] = useState();

    const [isValid, setIsValid] = useState(false);


    const filePickRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file])



    const pickedHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }
        else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }

    const pickImageHandler = () => {
        filePickRef.current.click();
    }

    return (
        <div className="form-control">
            <input
                // id={props.id}
                ref={filePickRef}
                style={{ display: "none" }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`justify-center'}`}>
                <div className="border rounded-full">
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Please provide an image</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>Choose an image</Button>
            </div>
            {!isValid && <p>error</p>}
        </div>
    )
}

export default ImageUpload;

