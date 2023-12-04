import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview } from "../../../_actions/review_action";

function PostReviewPage() {
    const useInputs = (initialValue) => {
        const [values, setValues] = useState(initialValue);
        const onChange = (event) => {
            setValues((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        };
        return [values, onChange, setValues];
    };

    const [isbn, onChangeIsbn] = useInputs("");
    const [title, onChangeTitle] = useInputs("");
    const [review, onChangeReview] = useInputs("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const data = {
        title: title,
        isbn: isbn,
        review: review,
    };

    const onSubmit = () => {
        dispatch(addReview(data)).then((response) => {
            if (response.payload.success) {
                navigate("/");
            }
        });
    };

    return (
        <>
            <NavBar />
            <FormContainer>
                <Form onSubmit={onSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                    >
                        <Form.Label>작품 선택</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>이미지</Form.Label>
                        <Form.Control type="file" accept="image/*" />
                        <Form.Control type="file" accept="image/*" />
                        <Form.Control type="file" accept="image/*" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>설명</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button>작성</Button>
                </Form>
            </FormContainer>
            <Footer />
        </>
    );
}

export default PostReviewPage;

const FormContainer = styled.div`
    margin: 0 auto;
    width: 80%;
`;
