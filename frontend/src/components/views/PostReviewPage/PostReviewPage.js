import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview } from "../../../_actions/review_action";
import { IoIosSearch } from "react-icons/io";
import { searchBook } from "../../../_actions/search_action";
import Card from "react-bootstrap/Card";
import axios from "axios";

function PostReviewPage() {
    const useInputs = (initialValue) => {
        const [values, setValues] = useState(initialValue);
        const onChange = (event) => {
            console.log(event);
            setValues((prev) => ({
                ...prev,
                [event.target.name]: event.target.value,
            }));
        };
        return [values, onChange, setValues];
    };

    const [
        {
            search,
            booktitle,
            isbn,
            author,
            publisher,
            bookimage,
            title,
            review,
            link,
            category,
            images,
        },
        onChangeForm,
        setFormValues,
    ] = useInputs({
        search: "",
        booktitle: "",
        isbn: "",
        author: "",
        publisher: "",
        bookimage: "",
        title: "",
        review: "",
        link: "",
        category: "",
        images: [],
    });

    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKeyPress = (e) => {
        e.preventDefault();
        if (e.key === "Enter") {
            searchBooks();
        }
    };

    const searchBooks = (e) => {
        e.preventDefault();
        console.log(search);
        dispatch(searchBook({ query: search })).then((response) => {
            if (response.payload.success) {
                setSearchResults(response.payload.result.items);
            } else {
                setSearchResults([]);
            }
        });
    };
    console.log(searchResults);
    const selectBook = (selectedBook) => {
        setFormValues((prev) => ({
            ...prev,
            booktitle: selectedBook.title,
            isbn: selectedBook.isbn,
            author: selectedBook.author,
            publisher: selectedBook.publisher,
            bookimage: selectedBook.image,
            link: selectedBook.link,
        }));

        setSearchResults([]); // 선택한 후에 검색 결과를 초기화
    };
    console.log(link);
    useEffect(() => {
        axios
            .get("/api/search/category", { params: { query: link } })
            .then((response) =>
                setFormValues((prev) => ({
                    ...prev,
                    category: response.data.categoryId,
                }))
            )
            .catch((error) => console.error(error));
    }, [link]);

    const handleImageChange = (e) => {
        const files = e.target.files;
        console.log(files);
        setFormValues((prev) => ({
            ...prev,
            images: [...prev.images, ...files], // 기존 이미지 배열에 추가
        }));
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log("저장 클릭");
        const dataToSend = {
            booktitle,
            isbn,
            author,
            publisher,
            title,
            review,
            category,
        };

        if (images.length > 0) {
            // 이미지를 넣는 경우 FormData를 사용하여 전송
            const formData = new FormData();
            formData.append("booktitle", booktitle);
            formData.append("isbn", isbn);
            formData.append("author", author);
            formData.append("publisher", publisher);
            formData.append("title", title);
            formData.append("review", review);
            formData.append("category", category);

            // 이미지 파일을 FormData에 추가
            images.forEach((image, index) => {
                formData.append(`images`, image);
            });

            // FormData의 key 확인
            for (let key of formData.keys()) {
                console.log(key);
            }

            // FormData의 value 확인
            for (let value of formData.values()) {
                console.log(value);
            }
            console.log(images);
            dispatch(addReview(formData)).then((response) => {
                if (response.payload.success) {
                    console.log("이미지o - 성공");
                    navigate("/my_review");
                }
            });
        } else {
            // 이미지를 제외한 데이터만을 서버로 전송합니다.
            dispatch(addReview(dataToSend)).then((response) => {
                console.log(response);
                if (response.payload.success) {
                    console.log("이미지x - 성공");
                    navigate("/my_review");
                }
            });
        }
    };

    return (
        <>
            <NavBar />
            <Form onSubmit={handleReviewSubmit}>
                <InputBoxRelative>
                    <Label>작품 선택</Label>

                    <Input
                        type="text"
                        onKeyPress={handleKeyPress}
                        name={"search"} // useInputs의 [event.target.name]
                        onChange={onChangeForm}
                    />
                    <IconBox>
                        <IoIosSearch size="30" onClick={searchBooks} />
                    </IconBox>
                    {/* 검색 결과를 표시하는 부분 */}
                    <SearchResultsContainer>
                        {searchResults.length > 0 && (
                            <ul>
                                {searchResults.map((result) => (
                                    <li
                                        key={result.isbn}
                                        onClick={() => selectBook(result)}
                                    >
                                        <Card
                                            bg="light"
                                            style={{
                                                boxShadow:
                                                    "0px 2px 4px rgba(0, 0, 0, 0.3)",
                                                border: "none",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        width: "50px",
                                                        height: "70px",
                                                        marginRight: "10px",
                                                        borderRadius: "10%",
                                                        objectFit: "cover",
                                                    }}
                                                    src={
                                                        result.image ||
                                                        "http://dummyimage.com/50x70/ced4da/6c757d.jpg"
                                                    }
                                                    alt="book"
                                                />
                                                <div
                                                    style={{
                                                        width: "260px",
                                                        fontSize: "16px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "space-around",
                                                    }}
                                                >
                                                    <div>{result.title}</div>
                                                    <LittleText>
                                                        {result.author +
                                                            " | " +
                                                            result.publisher}
                                                    </LittleText>
                                                </div>
                                            </div>
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </SearchResultsContainer>
                </InputBoxRelative>

                <Card
                    bg="light"
                    style={{
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                        border: "none",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <img
                            style={{
                                width: "50px",
                                height: "70px",
                                marginRight: "10px",
                                borderRadius: "10%",
                                objectFit: "cover",
                            }}
                            src={
                                bookimage ||
                                "http://dummyimage.com/50x70/ced4da/6c757d.jpg"
                            }
                            alt="book"
                        />
                        <div
                            style={{
                                width: "260px",
                                fontSize: "16px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                            }}
                        >
                            {booktitle ? (
                                <>
                                    <div>{booktitle}</div>
                                    <LittleText>
                                        {author + " | " + publisher}
                                    </LittleText>
                                </>
                            ) : (
                                "작품을 검색해 주세요"
                            )}
                        </div>
                    </div>
                </Card>

                <InputBox>
                    <Label>제목</Label>
                    <Input type="text" name={"title"} onChange={onChangeForm} />
                </InputBox>
                <InputBox>
                    <Label>이미지</Label>
                    <input
                        type="file"
                        accept="image/*"
                        name={"images"}
                        onChange={(e) => handleImageChange(e)}
                        multiple
                    />
                </InputBox>
                <InputBox>
                    <Label>설명</Label>
                    <Input
                        as="textarea"
                        rows={3}
                        name={"review"}
                        onChange={onChangeForm}
                    />
                </InputBox>
                <ButtonBox>
                    <Button type="submit">작성</Button>
                </ButtonBox>
            </Form>
            <Footer />
        </>
    );
}

export default PostReviewPage;

const Form = styled.form`
    margin: 0 auto;
    width: 80%;
`;

const InputBoxRelative = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
`;

const Label = styled.label`
    font-size: 20px;
`;

const Input = styled.input`
    outline: none;
    border: 1px solid #a9b388;
    border-radius: 5px;
    height: 50px;
    padding: 15px;
`;

const LittleText = styled.div`
    font-size: small;
`;

const IconBox = styled.div`
    position: absolute;
    right: 12px;
    top: 50%;
`;

const SearchResultsContainer = styled.div`
    left: 0;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 99;
    ul {
        list-style: none;
        padding: 0;
        border: 1px solid #a9b388;
        background-color: #fff;
        border-radius: 5px;
    }
    li {
        cursor: pointer;
        margin-bottom: 5px;
        &:hover {
            background-color: #eee;
        }
    }
`;
const ButtonBox = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    width: 80%;
    background-color: #a9b388;
    border: none;
    border-radius: 40px;
    margin: 20px;
    height: 50px;
    color: #fff;
`;
