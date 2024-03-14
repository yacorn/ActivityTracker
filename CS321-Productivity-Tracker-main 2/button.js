//start/stop
const btn = document.querySelector("button");
const txt = document.querySelector("p");

btn.addEventListener("click", updateBtn);

function updateBtn() {
    if (btn.textContent === "Start Machine") {
        btn.textContent = "Stop Machine";
        txt.textContent = "The Machine has Started";
    } else {
        btn.textContent = "Start Machine";
        txt.textContent = "The Machine is Stopped";
    }
}
