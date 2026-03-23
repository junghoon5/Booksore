async function bookData() {
    const params = new URLSearchParams({
        target: "title",
        query: "학술지",
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // .box 요소 전체 선택
        
        
        
        const boxElements = document.querySelectorAll("#new .swiper-slide");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // 요소 생성 및 추가
            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
                    <h3>${data.documents[i].title}</h3>
                    <h6>${data.documents[i].authors}</h6>
                    <p>${data.documents[i].price}</p>
                    <button>click</button>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData();

async function bookData_1() {
    const params = new URLSearchParams({
        target: "title",
        query: "추천 교재",
        size: 15
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        // .box 요소 전체 선택
        
        
        
        const boxElements = document.querySelectorAll("#slider .swiper-slide");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략
            
            const thumbsHtml = data.documents.slice(0, 5).map((d, idx) => `
                <div class="thumb ${idx === i ? 'active' : ''}">
                    <img src="${d.thumbnail}" alt="thumb">
                </div>
            `).join('');

            

            // 요소 생성 및 추가
            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
                    <h3>${data.documents[i].title}</h3>
                    <h6>${data.documents[i].authors}</h6>
                    <p>${data.documents[i].price}</p>
                    <button>click</button>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData_1();

async function bookData_2() {
    const params = new URLSearchParams({
        target: "title",
        query: "모의고사",
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태 코드: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        // .box 요소 전체 선택
        
        
        
        const boxElements = document.querySelectorAll("#best .wiper-slide");
        console.log(boxElements)

        // documents 데이터를 각 box에 대응하여 렌더링
        boxElements.forEach((box, i) => {
            const doc = data.documents[i];

            if (!doc) return; // 데이터가 부족할 경우 생략

            // 요소 생성 및 추가
            box.innerHTML = `<img src="${data.documents[i].thumbnail}">
                    <h3>${data.documents[i].title}</h3>
                    <h6>${data.documents[i].authors}</h6>
                    <p>${data.documents[i].price}</p>
                    <button>click</button>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData_2();

const tabItems = document.querySelectorAll('#time li');
        const tabs = document.querySelectorAll('article');
        const titleList = document.getElementById('titlelist');

        tabItems.forEach((tab, i) => {
            tab.addEventListener('click', () => {
                // 탭에 해당하는 리스트 보이고, 나머지는 숨기기
                tabs.forEach((tab, j) => {
                    tab.style.display = (i === j) ? 'flex' : 'none';
                });

                // 제목 텍스트 변경
                titleList.textContent = tab.textContent;
            });
        });