import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectBookmark } from "../../../_actions/bookmark_action";
import { deselectBookmark } from "../../../_actions/bookmark_action";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Card from "react-bootstrap/Card";
import { FaRegCommentDots } from "react-icons/fa6";
import { HiMiniBookmark, HiOutlineBookmark } from "react-icons/hi2";
import ReviewImagesComponent from "./ReviewImagesComponent";
import CommentList from "../CommentPage/CommentList";
import CommentInput from "../CommentPage/CommentInput";
import styled from "styled-components";

function ReviewDetailPage() {
    //const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [detail, setDetail] = useState(null);

    const [bookmarks, setBookmarks] = useState([]);
    const [selectedBookmarks, setSelectedBookmarks] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const [bookmarkIcon, setBookmarkIcon] = useState(
        <HiOutlineBookmark fontSize="40px" />
    );

    // useParams 훅을 사용하여 reviewId 추출
    const { reviewId } = useParams();
    const { userId } = useParams();

    // 유저 데이터를 가져오기
    useEffect(() => {
        axios
            .get("/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error(error));
    }, []);

    // 감상평 데이터 가져오기
    useEffect(() => {
        axios
            .get("/api/users/review")
            .then((response) => {
                const selectedReview = response.data.find(
                    (review) => review._id === reviewId
                );
                if (selectedReview) {
                    setDetail(selectedReview);
                } else {
                    console.error(`ID가 ${reviewId}인 리뷰를 찾을 수 없습니다`);
                }
            })
            .catch((error) => console.error(error));
    }, [reviewId]);

    useEffect(() => {
        // 북마크 데이터 가져오기
        axios
            .get("/api/users/bookmark")
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch((error) => console.error(error));
    }, []);

    // 북마크 유저것만 골라내기
    useEffect(() => {
        const filteredBookmarks = bookmarks.filter(
            (bm) => bm.userId === userId
        );
        const selectedReviewIds = filteredBookmarks.map((bm) => bm);
        setSelectedBookmarks(selectedReviewIds);
    }, [bookmarks, userId]);

    useEffect(() => {
        // 선택된 북마크가 있을 때와 없을 때에 따라 아이콘 변경
        const icon = selectedBookmarks.find(
            (bookmark) => bookmark.reviewId === reviewId
        ) ? (
            <HiMiniBookmark size="40px" />
        ) : (
            <HiOutlineBookmark size="40px" />
        );
        setBookmarkIcon(icon);
    }, [selectedBookmarks, reviewId]);
    console.log("금쪽이", userId);
    console.log(users);

    const onSetBookmark = () => {
        let body = {
            userId: userId,
            reviewId: detail._id,
        };

        let funBool = selectedBookmarks.find(
            (bookmark) => bookmark.reviewId === reviewId
        )
            ? false
            : true;

        if (funBool) {
            dispatch(selectBookmark(body)).then((response) => {
                if (response.payload.success) {
                    window.location.reload();
                } else {
                    alert("북마크 추가 실패");
                }
            });
        } else {
            dispatch(deselectBookmark(body)).then((response) => {
                if (response.payload.success) {
                    window.location.reload();
                } else {
                    alert("북마크 삭제 실패");
                }
            });
        }

        setBookmarkIcon(
            funBool ? (
                <HiMiniBookmark size="40px" />
            ) : (
                <HiOutlineBookmark size="40px" />
            )
        );
    };
    console.log(detail?.images);

    const toggleComments = () => {
        if (!showComments) {
            axios
                .get(`/api/comments/${reviewId}`)
                .then((response) => {
                    setComments(response.data.comments);
                    setShowComments(true);
                })
                .catch((error) => console.error(error));
        } else {
            setShowComments(false);
        }
    };

    const postComment = (newComment) => {
        // You may need to adjust the API endpoint and request structure based on your server implementation
        axios
            .post("/api/comments", {
                reviewId: reviewId,
                content: newComment,
                author: userId, // Update as needed
            })
            .then((response) => {
                // Refresh the comment list after posting a new comment
                toggleComments();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="d-flex flex-column">
            <NavBar />

            <div
                className="d-flex flex-column align-items-center flex-grow-1"
                style={{
                    justifyContent: "space-evenly",
                    marginBottom: "20px",
                    overflow: "auto",
                }}
            >
                <Card
                    bg="light"
                    style={{
                        position: "relative",
                        width: "310px",
                        height: "40rem",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                        margin: "10px",
                        marginBottom: "20px",
                        border: "none",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "-12px",
                            right: "25px",
                            color: "#A9B388",
                        }}
                        onClick={() => onSetBookmark()}
                    >
                        {bookmarkIcon}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            borderBottom: "1px solid",
                        }}
                    >
                        <Card.Img
                            style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                            src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                            alt="Image Alt Text"
                        ></Card.Img>
                        <Card.Body
                            style={{
                                padding: "0px",
                                marginLeft: "10px",
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                }}
                            >
                                {users.find((user) => user._id === detail?.user)
                                    ? users.find(
                                          (user) => user._id === detail.user
                                      ).nickname
                                    : "unkown"}
                            </div>
                        </Card.Body>
                    </div>

                    <div
                        style={{
                            padding: "10px",
                            display: "flex",
                            justifyContent: "space-around",
                            flexDirection: "column",
                            marginBottom: "40px",
                        }}
                    >
                        <h4>{detail?.title}</h4>
                        <ReviewImagesComponent imageIds={detail?.images} />
                        <p
                            style={{
                                fontSize: "16px",
                                height: "24rem",
                                overflow: "auto",
                            }}
                        >
                            {detail?.review}
                        </p>
                    </div>

                    <FaRegCommentDots
                        style={{
                            position: "absolute",
                            bottom: "10px",
                            left: "10px",
                        }}
                        onClick={toggleComments}
                    />

                    {showComments && (
                        <Card
                            bg="light"
                            style={{
                                posiiton: "relative",
                                width: "310px",
                                height: "30rem",
                                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                                border: "none",
                                marginBottom: "20px",
                            }}
                        >
                            <Card.Body
                                style={{
                                    marginBottom: "50px",
                                    width: "310px",
                                    height: "100%",
                                }}
                            >
                                <CommentList comments={comments} />
                                <CommentInput onPostComment={postComment} />
                            </Card.Body>
                        </Card>
                    )}
                </Card>
            </div>
            <Footer />
        </div>
    );
}

export default ReviewDetailPage;
