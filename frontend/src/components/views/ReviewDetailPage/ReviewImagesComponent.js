import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ReviewImagesComponent = ({ imageIds }) => {
    console.log(imageIds);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async (imageIds) => {
            console.log(imageIds);
            try {
                if (imageIds && imageIds.length > 0) {
                    const response = await axios.get(
                        `/api/review/images/${imageIds.join(",")}`
                    );
                    console.log(response);
                    setImages(response.data);
                }
            } catch (error) {
                console.error(error);
                return [];
            }
        };

        fetchImages(imageIds);
    }, [imageIds]);
    console.log(images);

    return (
        <ImageBox>
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={`data:${image.contentType};base64,${image.data}`}
                    alt={`Review ${index}`}
                />
            ))}
        </ImageBox>
    );
};

export default ReviewImagesComponent;

const ImageBox = styled.div`
    display: flex;
    width: 100px;
    height: 100px;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
`;
