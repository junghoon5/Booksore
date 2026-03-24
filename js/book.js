async function bookData() {
    const params = new URLSearchParams({
        target: "title",
        query: "프로그래밍",
        size: 20
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
                    <span class="price">${data.documents[i].price.toLocaleString()}</span>
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
                <div class='info-box'>
                
                    <h3>${data.documents[i].title}</h3>
                    <h6>${data.documents[i].authors}</h6>
                    <span class="price">${data.documents[i].price.toLocaleString()}</span>
                    <p class="description">${data.documents[i].contents.substring(0, 120)}</p>
                </div>
                    `
        });

    } catch (error) {
        console.log('에러발생', error);
    }
}

bookData_1();

async function fetchBooks(query) {
    const params = new URLSearchParams({
        target: "title",
        query,
        size: 10
    });
    const url = `https://dapi.kakao.com/v3/search/book?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161"
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP 오류: ${response.status}`);
    }

    return response.json();
}

async function bookData_2() {
    try {
        const queries = [
            { query: "모의고사", sectionId: "week" },
            { query: "자격증", sectionId: "month" },

        ];

        for (const { query, sectionId } of queries) {
            const data = await fetchBooks(query);

            // 해당 섹션 내의 .box 요소 8개 선택
            const section = document.querySelector(`#${sectionId}`);
            const boxElements = section.querySelectorAll(".wiper-slide");

            boxElements.forEach((box, i) => {
                const doc = data.documents[i];
                if (!doc) return;

                // 요소 생성 및 추가
                box.innerHTML = `<img src="${doc.thumbnail}">
                        <h4>${doc.title}</h4>
                        <h6>${doc.authors}</h6>
                        <span class="price">${data.documents[i].price.toLocaleString()}</span>
                        `
            });
        }
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
window.onload = function () {

    bookData_2();

    const tabItems = document.querySelectorAll('#time li');
    const tabs = document.querySelectorAll('article');

    function showTab(index) {
        tabs.forEach((tab, j) => {
            tab.style.display = (index === j) ? 'flex' : 'none';
        });

        tabItems.forEach((item, j) => {
            if (index === j) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        const titleList = document.getElementById('titlelist');
        if (titleList) {
            titleList.textContent = tabItems[index].textContent;
        }
    }

    tabItems.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            showTab(i);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        bookData_2();
        showTab(0);
    });
}