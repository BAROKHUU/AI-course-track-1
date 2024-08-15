document.addEventListener("DOMContentLoaded", function() {
    const hoverables = document.querySelectorAll('.hoverable');
    let currentImage = null;

    hoverables.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            const imgSrc = this.getAttribute('data-img');
            if (imgSrc) {
                if (!currentImage) {
                    // Create the image if it doesn't exist
                    currentImage = document.createElement('img');
                    currentImage.className = 'hover-image';
                    document.body.appendChild(currentImage);

                    // Set up image hide logic
                    currentImage.addEventListener('mouseleave', function() {
                        hideImage();
                    });

                    currentImage.addEventListener('mouseenter', function() {
                        if (currentImage) {
                            clearTimeout(currentImage.removeTimeout); // Cancel any scheduled removal
                        }
                    });
                }

                currentImage.src = imgSrc;
                currentImage.style.display = 'block';
                currentImage.style.opacity = '1';
                currentImage.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });

        item.addEventListener('mouseleave', function() {
            if (currentImage && !isMouseOverElement(currentImage)) {
                hideImage();
            }
        });
    });

    function hideImage() {
        if (currentImage) {
            currentImage.style.opacity = '0';
            currentImage.style.transform = 'translate(-50%, -50%) scale(0.7)';
            currentImage.removeTimeout = setTimeout(() => {
                if (currentImage) {
                    currentImage.style.display = 'none';
                }
            }, 0); // Wait for the transition before hiding
        }
    }

    function isMouseOverElement(element) {
        const rect = element.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        return (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        );
    }
});
