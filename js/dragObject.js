const pin = document.querySelector(".pin");
let isPinned = true;
pin.addEventListener("click", function () {
    pin.classList.toggle("pinned");
    isPinned = !isPinned;
});

const draggable = document.querySelector(".navigationBtn");

let isDragging = false;
offsetX = 0;
offsetY = 0;

const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

// Mouse down event to start dragging
    draggable.addEventListener("mousedown", function (e) {        
        if(isPinned)
        return;

        isDragging = true;

        // Get the current mouse position relative to the div
        offsetX = e.clientX - draggable.getBoundingClientRect().left;
        offsetY = e.clientY - draggable.getBoundingClientRect().top;

        document.body.style.userSelect = "none"; // Prevent text selection while dragging
    });

    // Mouse move event to move the div
    document.addEventListener("mousemove", function (e) {
        if(isPinned)
            return;

        if (isDragging) {
            // Calculate the new position of the div, respecting the boundaries
            let newX = e.clientX - offsetX;
            let newY = e.clientY - offsetY;

            // Ensure the div stays within the page boundaries
            newX = Math.max(0, Math.min(newX, maxWidth - draggable.offsetWidth));
            newY = Math.max(0, Math.min(newY, maxHeight - draggable.offsetHeight));

            draggable.style.left = newX + "px";
            draggable.style.top = newY + "px";
        }
    });

    // Mouse up event to stop dragging
    document.addEventListener("mouseup", function () {        
        if(isPinned)
        return;

        if (isDragging) {
            isDragging = false;
        }
        document.body.style.userSelect = ""; // Restore text selection
    });

