// Atur tanggal countdown di sini
const targetDate = new Date('2024-12-01T00:00:00').getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Hitung hari, jam, menit, dan detik
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update tampilan
    document.getElementById('days').querySelector('h1').innerHTML = days;
    document.getElementById('hours').querySelector('h1').innerHTML = hours;
    document.getElementById('minutes').querySelector('h1').innerHTML = minutes;
    document.getElementById('seconds').querySelector('h1').innerHTML = seconds;

    // Jika countdown selesai
    if (distance < 0) {
        clearInterval(interval);
        document.querySelectorAll('.circle h1').forEach((el) => (el.innerHTML = '0'));
    }
};

// Update countdown setiap detik
const interval = setInterval(updateCountdown, 1000);


// Mendapatkan semua link navbar
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Menambahkan event scroll
window.addEventListener('scroll', () => {
    let current = '';

    // Menentukan bagian mana yang sedang ditampilkan
    navLinks.forEach((link) => {
        const section = document.querySelector(link.getAttribute('href'));
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = link.getAttribute('href');
        }
    });

    // Menandai link yang aktif
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});


let currentSection = 0;
			const sections = document.querySelectorAll('.salam, .quote, .mempelai, .acara, .alamat, .galeri');

			function scrollToSection(index) {
				if (index >= 0 && index < sections.length) {
					sections[index].scrollIntoView({ behavior: 'smooth' });
					currentSection = index;
				}
			}

			document.addEventListener('wheel', (event) => {
				if (event.deltaY > 0) {
					scrollToSection(currentSection + 1);
				} else {
					scrollToSection(currentSection - 1);
				}
			});

			// Mendukung scroll pada perangkat sentuh
			document.addEventListener('touchstart', handleTouchStart, false);
			document.addEventListener('touchmove', handleTouchMove, false);

			let yDown = null;

			function handleTouchStart(evt) {
				const firstTouch = evt.touches[0];
				yDown = firstTouch.clientY;
			}

			function handleTouchMove(evt) {
				if (!yDown) return;

				let yUp = evt.touches[0].clientY;
				let yDiff = yDown - yUp;

				if (yDiff > 0) {
					scrollToSection(currentSection + 1); // scroll down
				} else {
					scrollToSection(currentSection - 1); // scroll up
				}
				yDown = null; // Reset nilai
			}