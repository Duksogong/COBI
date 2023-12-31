// CommentInput.js
import React, { useState } from "react";
import styled from "styled-components";

const CommentInput = ({ onPostComment }) => {
    const [commentInput, setCommentInput] = useState("");

    const postComment = () => {
        if (commentInput.trim() === "") {
            // Add validation if needed
            return;
        }

        onPostComment(commentInput);
        setCommentInput(""); // Clear the comment input
    };

    return (
        <InputBox>
            <Textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="댓글을 작성하여 주세요"
            />
            <Button onClick={postComment}>작성</Button>
        </InputBox>
    );
};

export default CommentInput;
const InputBox = styled.div`
    display: flex;
`;
const Textarea = styled.textarea`
    border: solid #a9b388;
    border-radius: 10px;
    width: 80%;
    height: 50px;
`;
const Button = styled.button`
    width: 20%;
    background-color: #a9b388;
    border: none;
    border-radius: 10px;
    height: 50px;
    color: #fff;
`;
