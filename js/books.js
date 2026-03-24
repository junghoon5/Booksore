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
                    const section = document.querySelector(`#${mainId}`);
                    const boxElements = section.querySelectorAll(".wiper-slide");

                    boxElements.forEach((box, i) => {
                        const doc = data.documents[i];
                        if (!doc) return;

                        // 요소 생성 및 추가
                        box.innerHTML = `<img src="${doc.thumbnail}">
                        <h3>${doc.title}</h3>
                        <h6>${doc.authors}</h6>
                        <p>${doc.contents.substring(0, 60)}</p>
                        <button>click</button>
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