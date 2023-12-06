import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findUser } from "../../../_actions/user_action";
import axios from "axios";

const CommentList = ({ comments }) => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    // 유저 데이터를 가져오기
    useEffect(() => {
        axios
            .get("/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <p>
                        {users.find((user) => user._id === comment.author)
                            ? users.find((user) => user._id === comment.author)
                                  .nickname
                            : "unkown"}
                    </p>
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    );
};
export default CommentList;
