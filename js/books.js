async function loadBookData(query, size, targetSelector, layoutType) {
    const url = `https://dapi.kakao.com/v3/search/book?query=${query}&size=${size}`;
    
    try {
        const response = await fetch(url, {
            headers: { Authorization: "KakaoAK 7b2300fc6315bb65035d1a3c7b49b161" }
        });
        const data = await response.json();
        const wrapper = document.querySelector(`${targetSelector} .swiper-wrapper`);
        
      
        wrapper.innerHTML = data.documents.map(doc => {
            if (layoutType === 'recommend') {
                return `<div class="swiper-slide recommendation-slide">...상세 레이아웃...</div>`;
            } else {
                return `<div class="swiper-slide simple-slide">...이미지 중심 레이아웃...</div>`;
            }
        }).join('');


    } catch (e) { console.error(e); }
}


const sliderWrapper = document.querySelector(".sliderSwiper .swiper-wrapper");
        sliderWrapper.innerHTML = "";
        data.documents.forEach((doc) => {
            const slide = document.createElement('div');
            slide.className = "swiper-slide recommendation-slide";
            slide.innerHTML = `
            <div class="slide-main-img">
            <img src="${doc.thumbnail || 'default_cover.png'}" alt="cover">
        </div>
        <div class="slide-detail">
            <div class="book-title">${doc.title}</div>
            <div class="book-meta">${doc.authors[0]} | ${doc.publisher}</div>
            <div class="book-price">
                <span class="discount">10%</span>
                <strong>${doc.sale_price.toLocaleString()}원</strong>
            </div>
            <p class="book-desc">${doc.contents.substring(0, 150)}...</p>
        </div>`;
        sliderWrapper.appendChild(slide);
        });