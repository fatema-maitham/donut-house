/* ============================================
   DONUT HOUSE
   FLYING DONUT CART ANIMATION
   Works on HOME + MENU
============================================ */

document.addEventListener("DOMContentLoaded", () => {

    const forms = document.querySelectorAll(".add-to-cart-form");
    const cartLink = document.querySelector('nav a[href="/cart"]');

    if (!forms.length || !cartLink) {
        return;
    }

    forms.forEach(form => {

        form.addEventListener("submit", async event => {

            event.preventDefault();

            const button = form.querySelector(".add-to-cart-btn");

            if (!button) {
                form.submit();
                return;
            }


            /* ========================================
               FIND THE ACTUAL DONUT IMAGE
            ======================================== */

            let donutImage = null;

            // MENU PAGE
            const menuCard = form.closest("[data-card]");

            if (menuCard) {
                donutImage = menuCard.querySelector(
                    ".donut-card-link img"
                );
            }

            // HOME PAGE
            if (!donutImage) {
                const homeCard = form.closest(".home-popular-card");

                if (homeCard) {
                    donutImage = homeCard.querySelector(
                        ".home-popular-image img"
                    );
                }
            }

            // FALLBACK USING DATA ATTRIBUTE
            if (!donutImage && button.dataset.donutImage) {

                donutImage = document.createElement("img");

                donutImage.src =
                    button.dataset.donutImage;
            }


            if (!donutImage || !donutImage.src) {
                console.warn("Donut image not found.");
                form.submit();
                return;
            }


            /* ========================================
               SAVE DONUT POSITION BEFORE FETCH
            ======================================== */

            const donutRect =
                donutImage.getBoundingClientRect();


            /* ========================================
               ADD TO CART
            ======================================== */

            try {

                const response = await fetch(
                    form.action,
                    {
                        method: "POST",
                        headers: {
                            "X-Requested-With": "XMLHttpRequest"
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Could not add donut to cart");
                }


                /* ========================================
                   CREATE FLYING DONUT
                ======================================== */

                const flyingDonut =
                    document.createElement("img");

                flyingDonut.src = donutImage.src;

                flyingDonut.className = "flying-donut";

                flyingDonut.alt = "";


                /* ========================================
                   START POSITION
                   EXACTLY ON THE REAL DONUT
                ======================================== */

                const startX =
                    donutRect.left +
                    donutRect.width / 2;

                const startY =
                    donutRect.top +
                    donutRect.height / 2;


                flyingDonut.style.left =
                    `${startX}px`;

                flyingDonut.style.top =
                    `${startY}px`;


                document.body.appendChild(
                    flyingDonut
                );


                /* ========================================
                   CART POSITION
                ======================================== */

                const cartRect =
                    cartLink.getBoundingClientRect();

                const endX =
                    cartRect.left +
                    cartRect.width / 2;

                const endY =
                    cartRect.top +
                    cartRect.height / 2;


                /* ========================================
                   FORCE BROWSER TO APPLY START POSITION
                ======================================== */

                flyingDonut.offsetWidth;


                /* ========================================
                   FLY TO CART
                ======================================== */

                flyingDonut.style.left =
                    `${endX}px`;

                flyingDonut.style.top =
                    `${endY}px`;

                flyingDonut.style.transform =
                    "translate(-50%, -50%) scale(0.2)";

                flyingDonut.style.opacity = "0";


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

                    }, 450);

                }, 550);


                /* ========================================
                   REMOVE FLYING DONUT
                ======================================== */

                setTimeout(() => {

                    flyingDonut.remove();

                }, 750);


            } catch (error) {

                console.error(
                    "ADD TO CART ERROR:",
                    error
                );

                /*
                   If animation/fetch fails,
                   submit normally.
                */

                form.submit();
            }

        });

    });

});

