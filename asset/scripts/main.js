// asset/scripts/main.js

// ==========================================
// LIGHTBOX VIDEO YOUTUBE
// ==========================================
// --- LOGIC JAVASCRIPT GIỮ NGUYÊN ---
        const triggers = document.querySelectorAll('.lightbox-trigger');
        const modal = document.getElementById('lightbox-modal');
        const iframe = document.getElementById('lightbox-iframe');
        const closeBtn = document.querySelector('.close-btn');

        function getYouTubeID(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }

        function openLightbox(e) {
            e.preventDefault(); // Chặn chuyển trang
            const videoLink = this.getAttribute('href');
            const videoId = getYouTubeID(videoLink);

            if (videoId) {
                // Thêm autoplay=0 để video không tự chạy
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
                modal.style.display = 'flex';
                setTimeout(() => { modal.classList.add('active'); }, 10);
            } else {
                alert("Link video không hợp lệ!");
            }
        }

        function closeLightbox() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                iframe.src = ""; // Tắt video
            }, 300);
        }

        triggers.forEach(trigger => trigger.addEventListener('click', openLightbox));
        closeBtn.addEventListener('click', closeLightbox);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === 'flex') closeLightbox();
        });
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // Lấy tất cả các section (Phá hủy căn cứ, Dọn đường, Chọn đường...)
    const allSections = document.querySelectorAll('.phahuycancu');

    allSections.forEach(section => {
        
        // ==========================================
        // PHẦN 1: XỬ LÝ TAB (CLICK ĐỔI ẢNH/CHỮ)
        // ==========================================

        // 1. Lấy danh sách các phần tử con theo thứ tự
        // querySelectorAll sẽ trả về một mảng các phần tử
        const buttons = section.querySelectorAll('.chon-logo .khung-logo');
        const images = section.querySelectorAll('.nhachinh > div');     // Lấy tất cả thẻ div con trực tiếp của .nhachinh
        const texts = section.querySelectorAll('.khung-mota-chitiet > div'); // Lấy tất cả thẻ div con trực tiếp của .khung-mota-chitiet

        // 2. Hàm ẩn tất cả (Reset)
        function hideAll() {
            // Bỏ active ở nút
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Ẩn ảnh
            images.forEach(img => {
                img.style.opacity = '0';
                img.style.zIndex = '1';
            });

            // Ẩn chữ
            texts.forEach(txt => {
                txt.style.opacity = '0';
                txt.style.zIndex = '1';
            });
        }

        // 3. Gán sự kiện click cho từng nút
        buttons.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                hideAll(); // Reset trước
                
                // Active nút được bấm
                this.classList.add('active');

                // Hiện ảnh tương ứng với thứ tự nút (index)
                if (images[index]) {
                    images[index].style.opacity = '1';
                    images[index].style.zIndex = '2';
                }

                // Hiện chữ tương ứng với thứ tự nút (index)
                if (texts[index]) {
                    texts[index].style.opacity = '1';
                    texts[index].style.zIndex = '2';
                }
            });
        });

        // 4. Mặc định kích hoạt nút đầu tiên (Top / Nhà chính bạn)
        if (buttons.length > 0) {
            buttons[0].click();
        }


        // ==========================================
        // PHẦN 2: XỬ LÝ KÉO THẢ (DRAG) CHO THANH LOGO
        // ==========================================
        const chonLogo = section.querySelector('.chon-logo'); 
        
        if (chonLogo) {
            let dang_keo = false;
            let diem_bat_dau = 0;
            let vi_tri_hien_tai = 0;

            // Mouse Down
            chonLogo.addEventListener("mousedown", (e) => {
                dang_keo = true;
                diem_bat_dau = e.clientX - vi_tri_hien_tai;
                chonLogo.style.transition = "none"; 
                chonLogo.style.cursor = "grabbing"; 
            });

            // Mouse Move (Gán vào window để kéo mượt hơn)
            window.addEventListener("mousemove", (e) => {
                if (!dang_keo) return;
                vi_tri_hien_tai = e.clientX - diem_bat_dau;

                // Giới hạn kéo (Cho phép kéo rộng hơn vì danh sách 5 tướng dài hơn)
                if (vi_tri_hien_tai > 150) vi_tri_hien_tai = 150;
                if (vi_tri_hien_tai < -150) vi_tri_hien_tai = -150;

                chonLogo.style.transform = `translate3d(${vi_tri_hien_tai}px, 0, 0)`;
            });

            // Mouse Up
            window.addEventListener("mouseup", () => {
                if (!dang_keo) return;
                dang_keo = false;
                chonLogo.style.cursor = "pointer"; 

                // Hiệu ứng nảy về giữa
                chonLogo.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                vi_tri_hien_tai = 0;
                chonLogo.style.transform = `translate3d(0, 0, 0)`;
            });
        }
    });
});


// tăng sức mạnh tướng
// --- XỬ LÝ KÉO THẢ VÀ CLICK CHO PHẦN "TĂNG SỨC MẠNH" ---
const tangSucManhSection = document.querySelector('.tangsucmanhtuong');
const wrapperIcons = tangSucManhSection ? tangSucManhSection.querySelector('.wrapper-icons') : null;

if (wrapperIcons && tangSucManhSection) {
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let draggedDistance = 0; 

    // 1. KHI NHẤN CHUỘT (MOUSE DOWN)
    wrapperIcons.addEventListener("mousedown", (e) => {
        isDragging = true;
        draggedDistance = 0;
        startX = e.clientX - currentTranslate;
        
        wrapperIcons.style.transition = "none"; 
        wrapperIcons.style.cursor = "grabbing"; 
        e.preventDefault(); 
    });

    // 2. KHI KÉO CHUỘT (MOUSE MOVE)
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const x = e.clientX;
        currentTranslate = x - startX;
        draggedDistance = Math.abs(currentTranslate); // Tính khoảng cách đã kéo

        // Giới hạn kéo (Limit)
        if (currentTranslate > 100) currentTranslate = 100;
        if (currentTranslate < -100) currentTranslate = -100;

        wrapperIcons.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    });

    // 3. KHI THẢ CHUỘT (MOUSE UP)
    window.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        
        isDragging = false;
        wrapperIcons.style.cursor = "grab"; 

        // Hiệu ứng nảy về giữa
        wrapperIcons.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        currentTranslate = 0;
        wrapperIcons.style.transform = `translate3d(0, 0, 0)`;
    });

    // --- XỬ LÝ CLICK (CHUYỂN TAB) ---
    const icons = tangSucManhSection.querySelectorAll('.khung-logo-2');
    const mediaContents = tangSucManhSection.querySelectorAll('.media-content');
    const textContents = tangSucManhSection.querySelectorAll('.text-content');

    icons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            // A. Nếu đã kéo chuột quá 5px thì coi như là KÉO -> Không Click
            if (draggedDistance > 5) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            
            // B. Nếu là Click thật -> Thực hiện chuyển Tab
            
            // 1. Xóa class active cũ
            icons.forEach(i => i.classList.remove('active'));
            mediaContents.forEach(m => m.classList.remove('active'));
            textContents.forEach(t => t.classList.remove('active'));

            // 2. Active icon được bấm
            this.classList.add('active');

            // 3. Lấy ID từ data-target
            const targetId = this.getAttribute('data-target');

            // 4. Hiện Video/Ảnh tương ứng
            const targetMedia = document.getElementById(`media-${targetId}`);
            if (targetMedia) targetMedia.classList.add('active');

            // 5. Hiện Text tương ứng
            const targetText = document.getElementById(`text-${targetId}`);
            if (targetText) targetText.classList.add('active');
        });
    });
}



// ============================================================
// XỬ LÝ RIÊNG CHO PHẦN: PHẦN THƯỞNG ĐĂNG NHẬP (LEVEL 1-10) - CAROUSEL MỚI
// ============================================================
 const carouselWrapper = document.querySelector(".carousel-wrapper2");
const carouselTrack = carouselWrapper ? carouselWrapper.querySelector(".carousel-track2") : null;

if (carouselWrapper && carouselTrack) {

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let draggedDistance = 0;

    // TRACK ITEMS
    const items = carouselTrack.querySelectorAll(".carousel-item");

    // LARGE IMAGE + INFO
    const bigImages = document.querySelectorAll(".reward-image");
    const infos = document.querySelectorAll(".reward-info");

    // --- MOUSE DOWN ---
    carouselTrack.addEventListener("mousedown", (e) => {
        isDragging = true;
        draggedDistance = 0;
        startX = e.clientX - currentTranslate;

        carouselTrack.style.transition = "none";
        carouselTrack.style.cursor = "grabbing";
        e.preventDefault();
    });

    // --- MOUSE MOVE ---
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const x = e.clientX;
        currentTranslate = x - startX;
        draggedDistance = Math.abs(currentTranslate);

        // Giới hạn kéo (cho vui, không cho trượt quá xa)
        if (currentTranslate > 100) currentTranslate = 100;
        if (currentTranslate < -100) currentTranslate = -100;

        carouselTrack.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    });

    // --- MOUSE UP ---
    window.addEventListener("mouseup", () => {
        if (!isDragging) return;

        isDragging = false;
        carouselTrack.style.cursor = "grab";

        // nảy về giữa
        carouselTrack.style.transition =
            "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        currentTranslate = 0;
        carouselTrack.style.transform = "translate3d(0, 0, 0)";
    });

    // --- CLICK ITEM ---
    items.forEach(item => {
        item.addEventListener("click", function (e) {

            // Nếu kéo quá 5px ➝ không tính click
            if (draggedDistance > 5) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            // Xử lý chuyển tab
            const index = parseInt(this.getAttribute("data-index"));

            // Remove active
            items.forEach(i => i.classList.remove("active"));
            bigImages.forEach(img => img.classList.remove("active"));
            infos.forEach(info => info.classList.remove("active"));

            // Add active đúng cái được click
            this.classList.add("active");
            bigImages[index].classList.add("active");
            infos[index].classList.add("active");
        });
    });
}


// ============================================================
// XỬ LÝ RIÊNG CHO PHẦN: PHẦN THƯỞNG lên cấp (LEVEL 1-10) - CAROUSEL MỚI
// ============================================================
const levelRewardSection = document.getElementById('phan-thuong-len-cap');

if (levelRewardSection) {
    const track = document.getElementById('carouselTrack');
    const items = levelRewardSection.querySelectorAll('.carousel-item');
    const images = levelRewardSection.querySelectorAll('.reward-image');
    const texts = levelRewardSection.querySelectorAll('.reward-info');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const viewport = document.getElementById('carouselViewport');

    let currentIndex = 0;
    const totalItems = items.length;

    // ==========================
    // KÉO TRACK (logic 2)
    // ==========================
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let draggedDistance = 0;

    if (track) {
        // Mouse down
        track.addEventListener("mousedown", (e) => {
            isDragging = true;
            draggedDistance = 0;

            startX = e.clientX - currentTranslate;
            track.style.transition = "none";
            track.style.cursor = "grabbing";

            e.preventDefault();
        });

        // Mouse move
        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const x = e.clientX;
            currentTranslate = x - startX;
            draggedDistance = Math.abs(currentTranslate);

            // Giới hạn kéo
            if (currentTranslate > 500) currentTranslate = 500;
            if (currentTranslate < -500) currentTranslate = -500;

            track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        });

        // Mouse up
        window.addEventListener("mouseup", () => {
            if (!isDragging) return;

            isDragging = false;
            track.style.cursor = "grab";

            track.style.transition =
                "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            currentTranslate = 0;
            track.style.transform = "translate3d(0, 0, 0)";
        });
    }

    // ==========================
    // UPDATE CAROUSEL (logic 1)
    // ==========================
    function updateCarousel(index) {
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;
        currentIndex = index;

        // Reset Active
        items.forEach(i => i.classList.remove('active'));
        images.forEach(img => img.classList.remove('active'));
        texts.forEach(t => t.classList.remove('active'));

        // Add Active
        items[currentIndex].classList.add('active');
        images[currentIndex].classList.add('active');
        texts[currentIndex].classList.add('active');

        // Progress Bar
        const progressPercent = (currentIndex / (totalItems - 1)) * 100;
        if (progressBar) progressBar.style.width = `${progressPercent}%`;

        // Scroll Track
        if (track && items[currentIndex]) {
            const itemWidth = 117;
            const gap = 0;
            const unitWidth = itemWidth + gap;

            let translateVal = -(currentIndex * unitWidth);

            const visibleItems = 7;
            const maxHiddenItems = totalItems - visibleItems;
            const maxTranslate = -(maxHiddenItems * unitWidth);

            if (translateVal < maxTranslate) translateVal = maxTranslate;

            if (totalItems <= visibleItems) translateVal = 0;

            track.style.transition = "transform 0.4s ease";
            track.style.transform = `translateX(${translateVal}px)`;
        }

        // Buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalItems - 1;

        prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
        nextBtn.style.opacity = currentIndex === totalItems - 1 ? "0.3" : "1";
    }

    // ==========================
    // CLICK ITEM (CHỐNG KÉO)
    // ==========================
    items.forEach((item, index) => {
        item.addEventListener("click", (e) => {

            if (draggedDistance > 5) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            updateCarousel(index);
        });
    });

    // ==========================
    // BUTTONS
    // ==========================
    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) updateCarousel(currentIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalItems - 1) updateCarousel(currentIndex + 1);
    });

    // ==========================
    // START
    // ==========================
    updateCarousel(0);
}


// MỞ KHÓA KỸ NĂNG
// ============================================================
// XỬ LÝ SECTION "CÁC VỊ TƯỚNG" (CHAMPIONS CAROUSEL)
// ============================================================
const championSection = document.getElementById('cac-vi-tuong');

if (championSection) {
    const champItems = championSection.querySelectorAll('.champ-item');
    const bigImages = championSection.querySelectorAll('.circle-mask img');
    const bgImages = championSection.querySelectorAll('.champ-bg');
    const infoTexts = championSection.querySelectorAll('.info-content');
    
    const champTrack = document.getElementById('championTrack');
    const champProgressBar = document.getElementById('champProgressBar');
    const champPrevBtn = document.getElementById('champPrevBtn');
    const champNextBtn = document.getElementById('champNextBtn');

    let currentChampIndex = 0;
    const totalChamps = champItems.length;

    // ==========================
    // KÉO TRACK (logic 2)
    // ==========================
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let draggedDistance = 0;

    if (champTrack) {

        // Mouse down
        champTrack.addEventListener("mousedown", (e) => {
            isDragging = true;
            draggedDistance = 0;

            startX = e.clientX - currentTranslate;
            champTrack.style.transition = "none";
            champTrack.style.cursor = "grabbing";

            e.preventDefault();
        });

        // Mouse move
        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            const x = e.clientX;
            currentTranslate = x - startX;
            draggedDistance = Math.abs(currentTranslate);

            // Giới hạn kéo
            if (currentTranslate > 500) currentTranslate = 500;
            if (currentTranslate < -500) currentTranslate = -500;

            champTrack.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        });

        // Mouse up
        window.addEventListener("mouseup", () => {
            if (!isDragging) return;

            isDragging = false;
            champTrack.style.cursor = "grab";

            champTrack.style.transition =
                "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
            currentTranslate = 0;
            champTrack.style.transform = "translate3d(0, 0, 0)";
        });
    }

    // ==========================
    // UPDATE UI (logic 1)
    // ==========================
    function updateChampion(index) {
        if (index < 0) index = 0;
        if (index >= totalChamps) index = totalChamps - 1;

        currentChampIndex = index;

        // --- Reset All ---
        champItems.forEach(i => i.classList.remove('active'));
        bigImages.forEach(i => i.classList.remove('active'));
        bgImages.forEach(i => i.classList.remove('active'));
        infoTexts.forEach(i => i.classList.remove('active'));

        // --- Active ---
        champItems[index].classList.add('active');

        const targetBig = document.getElementById(`big-img-${index}`);
        if (targetBig) targetBig.classList.add('active');

        const targetBg = document.getElementById(`bg-${index}`);
        if (targetBg) targetBg.classList.add('active');

        const targetInfo = document.getElementById(`info-${index}`);
        if (targetInfo) targetInfo.classList.add('active');

        // --- Progress Bar ---
        const percent = (index / (totalChamps - 1)) * 100;
        champProgressBar.style.width = `${percent}%`;

        // --- SCROLL TRACK ---
        const itemWidth = 70;
        const gap = 25;
        const unitWidth = itemWidth + gap;

        let translateVal = -(index * unitWidth);

        const visibleCount = 5;
        const maxHidden = totalChamps - visibleCount;
        const maxTranslate = -(maxHidden * unitWidth);

        if (translateVal < maxTranslate) translateVal = maxTranslate;
        if (translateVal > 0) translateVal = 0;
        if (totalChamps <= visibleCount) translateVal = 0;

        champTrack.style.transition = "transform 0.4s ease";
        champTrack.style.transform = `translateX(${translateVal}px)`;

        // --- Nav Buttons ---
        champPrevBtn.disabled = index === 0;
        champNextBtn.disabled = index === totalChamps - 1;

        champPrevBtn.style.opacity = index === 0 ? "0.3" : "1";
        champNextBtn.style.opacity = index === totalChamps - 1 ? "0.3" : "1";
    }

    // ==========================
    // CLICK ITEM (KẾT HỢP LOGIC CLICK + CHỐNG KÉO)
    // ==========================
    champItems.forEach((item, index) => {
        item.addEventListener("click", (e) => {

            // Nếu kéo quá 5px → không tính là click
            if (draggedDistance > 5) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }

            updateChampion(index);
        });
    });

    // ==========================
    // BUTTONS
    // ==========================
    champPrevBtn.addEventListener("click", () => {
        if (currentChampIndex > 0) updateChampion(currentChampIndex - 1);
    });

    champNextBtn.addEventListener("click", () => {
        if (currentChampIndex < totalChamps - 1) updateChampion(currentChampIndex + 1);
    });

    // ==========================
    // START
    // ==========================
    updateChampion(0);
}
