document.addEventListener('DOMContentLoaded', function() {
    const megaMenu = document.getElementById('riot-mega-menu');
    const openBtn = document.querySelector('.logo-riot'); 
    const closeBtn = document.getElementById('close-riot-menu');
    const backdrop = document.querySelector('.riot-menu-backdrop');

    // --- 1. Logic Đóng/Mở Menu ---
    if (openBtn && megaMenu) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            megaMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Chặn cuộn trang khi mở menu
        });
    }

    const closeMenu = () => {
        if (megaMenu) megaMenu.classList.remove('active');
        document.body.style.overflow = ''; // Cho phép cuộn lại
        resetToDefault(); // Đảm bảo menu reset về mặc định khi đóng
    };

    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    // --- 2. Logic Hover Đổi Ảnh ---
    const promoDefault = document.getElementById('promo-default'); 
    const promoHover = document.getElementById('promo-hover');     
    const promoImg = document.getElementById('promo-card-img');
    const menuLinks = document.querySelectorAll('.menu-link-hover');

    // Hàm đưa giao diện về trạng thái 2 ảnh nhỏ mặc định
    const resetToDefault = () => {
        if (promoDefault && promoHover) {
            promoDefault.style.display = 'flex'; // Hiện lại tin tức mặc định
            promoHover.style.display = 'none';   // Ẩn ảnh lớn
        }
    };

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const promoKey = this.getAttribute('data-promo');
            const data = promoData[promoKey];

            if (data && promoImg) {
                // Cập nhật nguồn ảnh
                promoImg.src = data.img;
                
                // Hiển thị khối ảnh lớn và ẩn khối mặc định
                promoDefault.style.display = 'none';
                promoHover.style.display = 'block';
            }
        });

        // Khi chuột rời khỏi chữ, quay về mặc định
        link.addEventListener('mouseleave', resetToDefault);
    });
});

// --- 3. Dữ liệu Promo Data ---
const promoData = {
    "lol": { img: "./asset/img/lol-header.png" },
    "valorant": { img: "./asset/img/vlr.png" },
    "tft": { img: "./asset/img/tft.png" },
    "arcane": { img: "./asset/img/arcane.png" },
    "wr": { img: "./asset/img/wild-rift.png" },
    "lor": { img: "./asset/img/runeterra.png" },
    "ruinedking": { img: "./asset/img/ruined-king.png" },
    "convergence": { img: "./asset/img/convergence.png" },
    "songofnunu": { img: "./asset/img/songofnunu.png" },
    "riotforge": { img: "./asset/img/riot-forge.png" },
    "lolesports": { img: "./asset/img/lol-esport.png" },
    "valesports": { img: "./asset/img/vlr-esport.png" },
    "universe": { img: "./asset/img/vutru.png" },
    "music": { img: "./asset/img/riot-music.png" },
    "riotgames": { img: "./asset/img/riotgames.png" },
    "riotsupport": { img: "./asset/img/riot-sp.png" }
};



document.addEventListener('DOMContentLoaded', function() {
    const searchContainer = document.getElementById('search-container');
    const searchTrigger = document.getElementById('search-trigger');
    const searchClose = document.getElementById('search-close');
    const searchInput = searchContainer.querySelector('.search-input');

    // Mở thanh tìm kiếm
    searchTrigger.addEventListener('click', () => {
        searchContainer.classList.add('active');
        searchInput.focus(); // Tự động đặt con trỏ chuột vào ô nhập
    });

    // Đóng thanh tìm kiếm
    searchClose.addEventListener('click', (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        searchContainer.classList.remove('active');
        searchInput.value = ''; // Xóa nội dung đã nhập
    });

    // Đóng khi nhấn ra ngoài thanh tìm kiếm
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const playNowBtn = document.querySelector('#open-modal'); // Nút "CHƠI NGAY" trên header
    const playNowOverlay = document.getElementById('play-now-overlay');
    const closePlayNow = document.getElementById('close-play-now-modal');

    // Mở Modal khi click "CHƠI NGAY"
    if (playNowBtn) {
        playNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            playNowOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Chặn cuộn trang
        });
    }

    // Đóng Modal
    const hidePlayModal = () => {
        playNowOverlay.classList.remove('active');
        if (!document.getElementById('riot-mega-menu').classList.contains('active')) {
            document.body.style.overflow = ''; // Chỉ cho cuộn lại nếu mega menu cũng đang đóng
        }
    };

    if (closePlayNow) closePlayNow.addEventListener('click', hidePlayModal);

    // Đóng khi click ra ngoài vùng trắng (vào vùng overlay)
    window.addEventListener('click', (e) => {
        if (e.target === playNowOverlay) {
            hidePlayModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const trigger = document.getElementById('sidebar-trigger');
    const sidebar = document.getElementById('mobile-menu'); // Đổi từ 'sidebar-menu' thành 'mobile-menu'
    const close = document.getElementById('close-mobile-menu'); // Đổi ID nút đóng cho khớp HTML
    const backdrop = document.querySelector('.mobile-menu-overlay'); // Sử dụng class overlay làm backdrop

    function toggle() {
        if (sidebar) {
            sidebar.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        }
    }

    if(trigger) trigger.addEventListener('click', toggle);
    if(close) close.addEventListener('click', toggle);
    // Đóng khi click vào vùng nền tối
    if(sidebar) {
        sidebar.addEventListener('click', function(e) {
            if (e.target === sidebar) toggle();
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const newsTrigger = document.getElementById('news-dropdown-trigger');
    const newsParent = newsTrigger.parentElement; // Lấy thẻ li.mobile-dropdown

    if (newsTrigger) {
        newsTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            // Bật/tắt class 'open' cho thẻ cha
            newsParent.classList.toggle('open');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Tìm nút có class là 'btn-login'
    const loginBtn = document.querySelector('.btn-login');

    // 2. Kiểm tra xem nút có tồn tại không để tránh lỗi
    if (loginBtn) {
        // 3. Thêm sự kiện click
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định nếu có
            // 4. Chuyển hướng trang web
            window.location.href = './dangnhap.html'; 
        });
    }
});