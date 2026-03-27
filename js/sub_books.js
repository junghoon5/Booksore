const KAKAO_API_KEY = "7b2300fc6315bb65035d1a3c7b49b161"; 
const query = '김기훈 공무원 독해(공단기)'; 

async function fetchBookInfo() {
    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            }
        });

        if (!response.ok) throw new Error('네트워크 응답 에러');

        const data = await response.json();
        
        if (data.documents && data.documents.length > 0) {
            displayBook(data.documents[0]); 
        } else {
            document.getElementById('bookTitle').innerText = "도서 정보를 찾을 수 없습니다.";
        }
    } catch (error) {
        console.error('에러 발생:', error);
        document.getElementById('bookTitle').innerText = "데이터 로딩 실패";
    }
}

function displayBook(book) {
    document.getElementById('bookTitle').innerText = book.title;
    const coverContainer = document.getElementById('bookCover');
    coverContainer.innerHTML = `<img src="${book.thumbnail}" alt="${book.title} 표지">`;

    const isSale = book.sale_price > 0 && book.price > book.sale_price;
    const finalPrice = isSale ? book.sale_price : book.price;
    
    const priceContainer = document.getElementById('bookPrice');
    let priceHTML = "";
    
    if (isSale) {
        const discountRate = Math.round(((book.price - book.sale_price) / book.price) * 100);
        priceHTML = `
            <span class="discount-rate">${discountRate}%</span>
            <span class="current-price">${book.sale_price.toLocaleString()}원</span>
            <del class="original-price">${book.price.toLocaleString()}원</del>
        `;
    } else {
        priceHTML = `<span class="current-price">${book.price.toLocaleString()}원</span>`;
    }
    priceContainer.innerHTML = priceHTML;

    const metaContainer = document.getElementById('bookMeta');
    const pubDate = new Date(book.datetime).toISOString().split('T')[0];
    
    metaContainer.innerHTML = `
        <div class="meta-item"><dt>배송비</dt><dd>무료배송</dd></div>
        <div class="meta-item"><dt>저자</dt><dd>${book.authors.join(', ')}</dd></div>
        <div class="meta-item"><dt>출판사</dt><dd>${book.publisher}</dd></div>
        <div class="meta-item"><dt>등록일</dt><dd>${pubDate}</dd></div>
    `;

    document.getElementById('totalPrice').innerText = `${finalPrice.toLocaleString()}원`;
}

fetchBookInfo();