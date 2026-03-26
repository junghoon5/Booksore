async function bookDetail() {
            const REST_API_KEY = '7b2300fc6315bb65035d1a3c7b49b161';
            const params = new URLSearchParams({
                target: "title",
                query: "미움받을 용기"
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

                // 요소 선택
                const subBox = document.querySelector(".js_subBox");
                const contextBox = document.querySelector(".js_contextBox");
                const priceNum = document.querySelector(".js_priceNum");

                // 데이터에서 필요한 값 추출
                const book = data.documents[0];
                const { title, thumbnail, authors, price, contents } = book;

                // 요소 생성 및 추가
                // 요소 생성 및 추가
                subBox.innerHTML = `<h3>${title}</h3>
                <img src="${thumbnail}">
                `
                priceNum.textContent = price.toLocaleString() + "원";

                contextBox.innerHTML = `<h6>${authors[0]}</h6>
                <p>${contents}</p>
                <span>자세히보기</span>
                `
            } catch (error) {
                console.log('에러발생', error);
            }
        }

        bookDetail();


