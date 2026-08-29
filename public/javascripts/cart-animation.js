/* ============================================
   DONUT HOUSE
   FAST FLYING DONUT CART ANIMATION
   Works on HOME + MENU
============================================ */

document.addEventListener("DOMContentLoaded", () => {

    const forms =
        document.querySelectorAll(".add-to-cart-form");

    const cartLink =
        document.querySelector('nav a[href="/cart"]');

    if (!forms.length || !cartLink) {
        return;
    }


    forms.forEach(form => {

        form.addEventListener("submit", async event => {

            event.preventDefault();

            const button =
                form.querySelector(".add-to-cart-btn");

            if (!button) {
                form.submit();
                return;
            }


            /* ========================================
               FIND ACTUAL DONUT
            ======================================== */

            let donutImage = null;

            /* MENU */
            const menuCard =
                form.closest("[data-card]");

            if (menuCard) {
                donutImage =
                    menuCard.querySelector(
                        ".donut-card-link img"
                    );
            }

            /* HOME */
            if (!donutImage) {

                const homeCard =
                    form.closest(".home-popular-card");

                if (homeCard) {
                    donutImage =
                        homeCard.querySelector(
                            ".home-popular-image img"
                        );
                }
            }

            /* FALLBACK */
            if (
                !donutImage &&
                button.dataset.donutImage
            ) {

                donutImage =
                    document.createElement("img");

                donutImage.src =
                    button.dataset.donutImage;
            }

            if (!donutImage || !donutImage.src) {
                form.submit();
                return;
            }


            /* ========================================
               GET POSITIONS IMMEDIATELY
            ======================================== */

            const donutRect =
                donutImage.getBoundingClientRect();

            const cartRect =
                cartLink.getBoundingClientRect();


            const startX =
                donutRect.left +
                donutRect.width / 2;

            const startY =
                donutRect.top +
                donutRect.height / 2;

            const endX =
                cartRect.left +
                cartRect.width / 2;

            const endY =
                cartRect.top +
                cartRect.height / 2;


            /* ========================================
               CREATE DONUT IMMEDIATELY
            ======================================== */

            const flyingDonut =
                document.createElement("img");

            flyingDonut.src =
                donutImage.src;

            flyingDonut.className =
                "flying-donut";

            flyingDonut.alt = "";

            flyingDonut.style.left =
                `${startX}px`;

            flyingDonut.style.top =
                `${startY}px`;

            document.body.appendChild(
                flyingDonut
            );


            /* ========================================
               FORCE START POSITION
            ======================================== */

            flyingDonut.offsetWidth;


            /* ========================================
               FLY — FAST
            ======================================== */

            flyingDonut.style.left =
                `${endX}px`;

            flyingDonut.style.top =
                `${endY}px`;

            flyingDonut.style.transform =
                "translate(-50%, -50%) scale(0.15)";

            flyingDonut.style.opacity =
                "0";


            /* ========================================
               CART BOUNCE
            ======================================== */

            setTimeout(() => {

                cartLink.classList.add(
                    "cart-bounce"
                );

                setTimeout(() => {

                    cartLink.classList.remove(
                        "cart-bounce"
                    );

                }, 350);

            }, 300);


            /* ========================================
               REMOVE
            ======================================== */

            setTimeout(() => {
                flyingDonut.remove();
            }, 450);


            /* ========================================
               ADD TO CART IN BACKGROUND
            ======================================== */

            try {

                const response =
                    await fetch(
                        form.action,
                        {
                            method: "POST",
                            headers: {
                                "X-Requested-With":
                                    "XMLHttpRequest"
                            }
                        }
                    );

                if (!response.ok) {
                    throw new Error(
                        "Could not add donut to cart"
                    );
                }

            } catch (error) {

                /* Only reload if request actually fails */
                window.location.href =
                    form.action;
            }

        });

    });

});
