/* ============================================
   DONUT HOUSE
   CARD FLIP
   Works on MENU page
============================================ */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll("[data-card]");

    function closeAll() {
        cards.forEach(card => {
            card.classList.remove("flipped");
        });
    }

    function cleanText(text) {
        return (text || "")
            .replace(/\\\n/g, "\n")
            .replace(/\r\n/g, "\n");
    }

    cards.forEach(card => {

        const openBtn = card.querySelector("[data-open]");
        const closeBtn = card.querySelector("[data-close]");

        const bDesc = card.querySelector("[data-bdesc]");
        const bTrace = card.querySelector("[data-btrace]");
        const bAll = card.querySelector("[data-ballergens]");

        /* OPEN CARD */
        openBtn?.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            closeAll();

            if (bDesc) {
                bDesc.textContent =
                    cleanText(openBtn.dataset.desc);
            }

            if (bTrace) {
                bTrace.textContent =
                    cleanText(openBtn.dataset.trace);
            }

            if (bAll) {
                bAll.textContent =
                    cleanText(openBtn.dataset.allergens);
            }

            card.classList.add("flipped");
        });


        /* CLOSE CARD */
        closeBtn?.addEventListener("click", event => {

            event.preventDefault();
            event.stopPropagation();

            card.classList.remove("flipped");
        });

    });


    /* ESC CLOSES CARD */
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeAll();
        }

    });

});
