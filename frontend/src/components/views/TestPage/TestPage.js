import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'

import { FaRegCommentDots } from "react-icons/fa";

function TestPage() {

    return (
        <Carousel pause="hover" indicators={false} data-bs-theme="dark"
        style={{width:'310px'}}>
            <Carousel.Item>
                <Card bg="light" text="dark"
                style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', margin:'10px', height: '30rem' }}>
                    <Card.Header
                    style={{ borderBottom:'solid 1px #dcdcdc', display:'flex' }}>
                        <Card.Img style={{ width:"40px", height:"40px", borderRadius: "50%", objectFit: "cover" }}
                            src="http://dummyimage.com/50x50/ced4da/6c757d.jpg"
                            alt="Image Alt Text">
                        </Card.Img>
                        <div style={{ flexDirection:'column', marginLeft:'10px' }}>
                            <p style={{ margin:'0px' }}>
                                유저네임
                            </p>
                            <p style={{ margin:'0px', fontSize:'12px'}}>
                                날짜
                            </p>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img style={{ width:'144px', height: '96px' }}
                            src="http://dummyimage.com/128x96/ced4da/6c757d.jpg"
                            alt="Image Alt Text">
                        </Card.Img>
                        <div style={{ marginTop:'10px' }}>
                            <Card.Title>감상평 제목</Card.Title>
                            <Card.Text>감상평 내용</Card.Text>
                        </div>
                        
                    </Card.Body>
                    <Card.Footer 
                    style={{ borderTop:'solid 1px #dcdcdc' }}>
                        <FaRegCommentDots />
                    </Card.Footer>
                </Card>
            </Carousel.Item>
        </Carousel>
    )
}

export default TestPage