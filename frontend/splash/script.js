document.addEventListener("DOMContentLoaded", function () {
//html 문서 로드시 실행되는 이벤트 리스너  
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles.css';
//link 요소를 document head에 추가해 style.css 동적 로드
    document.head.appendChild(link);

    //각 버튼과 관련된 요소들 가져옴
    const mainContent = document.getElementById("main-content");
    const loginButton= document.getElementById("login-btn");
    const signupButton = document.getElementById("Signup-btn");

    //이미지와 버튼 표시
    mainContent.style.display = "block";


    document.addEventListener("DOMContentLoaded", function () {
        const loginButton = document.getElementById("login-btn");
    
        // 로그인 버튼 클릭 시 동작
        loginButton.addEventListener("click", function () {
            // API 호출
            fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: '사용자 이메일',
                    password: '사용자 비밀번호',
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("로그인 성공");
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
    // 회원가입 버튼 클릭 시 동작
    signupButton.addEventListener("click", function () {
        //회원가입 api
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: '사용자@이메일.com', 
                password: '비밀번호', 
                confirmPassword: '비밀번호', 
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // 서버로부터의 응답을 처리 추가
            alert("회원가입 성공!"); // 예시: 응답에 따른 동작 처리
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
  
    });

    

   
//     setTimeout(function () {
// // 스플래시 화면을 숨김
//         document.getElementById("splash-screen").style.display = "none";
//         // 메인 콘텐츠를 표시합니다.
//         document.getElementById("main-content").style.display = "block";
//     }, 5000); // 5초

