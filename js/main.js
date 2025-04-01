// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded and ready!');
    
    // Initialize WhatsApp Swiper with a longer delay
    setTimeout(function() {
        initWhatsAppSwiper();
    }, 800);
    
    // Elements
    const progressFill = document.querySelector('.progress-fill');
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtn = document.querySelector('.next-btn');
    const backBtn = document.querySelector('.back-btn');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Price elements
    const expOptions = document.querySelectorAll('input[name="experience"]');
    const serviceOptions = document.querySelectorAll('input[type="checkbox"]');
    const basePrice = document.querySelector('.base-price');
    const additionalPriceRow = document.querySelector('.additional-services');
    const additionalPrice = document.querySelector('.additional-price');
    const totalPrice = document.querySelector('.total-price');
    const totalPricePayment = document.querySelector('.total-price-payment');
    
    // File upload handling
    const fileUpload = document.getElementById('cv-file');
    const fileName = document.querySelector('.file-name');
    
    // Current step and prices
    let currentStep = 1;
    let basePriceValue = 50;
    let additionalPriceValue = 0;
    
    // Initialize prices
    updatePrices();
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                goToStep(2);
            }
        });
    }
    
    // Back button click
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            goToStep(1);
        });
    }
    
    // Experience level change
    expOptions.forEach(option => {
        option.addEventListener('change', function() {
            switch(this.value) {
                case '0-5':
                    basePriceValue = 50;
                    break;
                case '6-12':
                    basePriceValue = 70;
                    break;
                case '13-20':
                    basePriceValue = 100;
                    break;
                case '20+':
                    basePriceValue = 150;
                    break;
                default:
                    basePriceValue = 50;
            }
            updatePrices();
        });
    });
    
    // Optional services change
    serviceOptions.forEach(option => {
        option.addEventListener('change', function() {
            calculateAdditionalPrice();
            updatePrices();
        });
    });
    
    // File upload functionality
    if (fileUpload && fileName) {
        fileUpload.addEventListener('change', function() {
            if(this.files && this.files[0]) {
                fileName.textContent = this.files[0].name;
            } else {
                fileName.textContent = '';
            }
        });
    }
    
    // Form submission
    if (submitBtn) {
        const cvForm = document.getElementById('cv-form');
        if (cvForm) {
            cvForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add loading state to button
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
                
                // Basic validation
                const email = document.getElementById('email').value;
                const cardNumber = document.getElementById('cardNumber').value;
                
                if (!email || !cardNumber) {
                    alert('Please fill in all required fields');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Simulate payment processing
                setTimeout(() => {
                    // Show success message
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Payment Successful!';
                    submitBtn.style.backgroundColor = '#10b981';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        goToStep(1);
                        cvForm.reset();
                        if (fileName) {
                            fileName.textContent = '';
                        }
                        basePriceValue = 50;
                        additionalPriceValue = 0;
                        updatePrices();
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        
                        // Show a thank you message
                        alert('Thank you for your order! We will contact you shortly.');
                    }, 2000);
                }, 1500);
            });
        }
    }
    
    // Helper Functions
    function validateStep(step) {
        if (step === 1) {
            const fullName = document.getElementById('fullName').value;
            if (!fullName) {
                alert('Please enter your full name');
                return false;
            }
            return true;
        }
        return true;
    }
    
    function goToStep(step) {
        // Update the current step variable
        currentStep = step;

        // Hide all form steps
        document.querySelectorAll('.form-step').forEach(function(stepEl) {
            stepEl.style.display = 'none';
        });

        // Show the current form step
        document.getElementById('step-' + step).style.display = 'block';
    }
    
    function calculateAdditionalPrice() {
        additionalPriceValue = 0;
        let hasAdditionalServices = false;
        
        serviceOptions.forEach(option => {
            if (option.checked) {
                hasAdditionalServices = true;
                if (option.name === 'coverLetter') {
                    additionalPriceValue += 30;
                } else if (option.name === 'linkedin') {
                    additionalPriceValue += 50;
                }
            }
        });
        
        // Show/hide additional services row
        if (additionalPriceRow) {
            additionalPriceRow.style.display = hasAdditionalServices ? 'flex' : 'none';
        }
    }
    
    function updatePrices() {
        // Update base price display
        if (basePrice) {
            basePrice.textContent = `${basePriceValue} AED`;
        }
        
        // Update additional price display
        if (additionalPrice) {
            additionalPrice.textContent = `${additionalPriceValue} AED`;
        }
        
        // Update total prices
        const total = basePriceValue + additionalPriceValue;
        if (totalPrice) {
            totalPrice.textContent = `${total} AED`;
        }
        if (totalPricePayment) {
            totalPricePayment.textContent = `${total} AED`;
        }
    }
    
    // Initialize animations on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature, .testimonial, .benefit-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll - update to handle new layout
    document.querySelector('.content-section').addEventListener('scroll', animateOnScroll);
    window.addEventListener('scroll', function() {
        // This helps with animations when in mobile view
        if (window.innerWidth <= 992) {
            animateOnScroll();
        }
    });
    
    // Add animation to logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            logo.style.transition = 'all 0.5s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // WhatsApp Swiper Initialization
    function initWhatsAppSwiper() {
        const whatsappSwiper = new Swiper('.whatsapp-swiper', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            centeredSlides: false,
            loop: false,
            grabCursor: true,
            speed: 500,
            effect: 'slide',
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.whatsapp-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.whatsapp-next',
                prevEl: '.whatsapp-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 'auto',
                    spaceBetween: 15,
                },
                992: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                }
            }
        });
    }
}); 