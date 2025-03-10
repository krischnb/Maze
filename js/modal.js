const modal = document.querySelector(".outerModal");
const knof1 = document.querySelector(".page1Modal");
const knof2 = document.querySelector(".page2Modal");
const knof3 = document.querySelector(".page3Modal");
const knofi = [knof1, knof2, knof3];

const modal1 = document.querySelector(".generalModal");
const modal2 = document.querySelector(".soundModal");
const modal3 = document.querySelector(".controlsModal");

const virtualBtn = document.querySelector(".virtualBtn");
const navigationBtn = document.querySelector(".navigationBtn");
const check = document.querySelector(".check");


virtualBtn.addEventListener("click", function () {
    resetPosition();
    check.classList.toggle("checked");
    navigationBtn.classList.toggle("visible");
});

function openModal() {
    modal.classList.add("activeModal");
    gameStart = false;
}
function closeModal() {
    modal.classList.remove("activeModal");
    gameStart = true;
}

function setActivePage(button) {
    const active = document.querySelector(".activeMenu");
    if (active && active !== button) {
        active.classList.remove("activeMenu");
    }
    button.classList.add("activeMenu");

    // modal1.classList.remove("activePageModal");
    // modal2.classList.remove("activePageModal");
    // modal3.classList.remove("activePageModal");

    // if (knof1.classList.contains("activeMenu")) {
    //     modal1.classList.add("activePageModal");
    // }
    // else if (knof2.classList.contains("activeMenu")) {
    //     modal2.classList.add("activePageModal");
    // }
    // else if (knof3.classList.contains("activeMenu")) {
    //     modal3.classList.add("activePageModal");
    // }

}

knofi.forEach(button => {
    button.addEventListener("click", () => setActivePage(button));
});

function resetPosition() {
    navigationBtn.style.left = '';
    navigationBtn.style.top = '';  
    navigationBtn.style.margin = ''; 

    navigationBtn.style.position = "absolute";
    navigationBtn.style.left = '0px'; 
    navigationBtn.style.bottom = '0px';
    navigationBtn.style.margin = '100px'; 
}

function credits() {
    swal({
        title: "Credits",
        icon: "info",
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                Made by: Kristijan Boben<br>
                Professor: Boštjan Vouk<br>
                Sonic Sprites: <a href="https://www.spriters-resource.com/search/?q=sonic+the+hedgehog" target="_blank" class="github-link">Click here!</a><br>
                Github: <a href="https://github.com/krischnb" target="_blank" class="github-link">Click here!</a>
            `,
            },
        },
    });
}



