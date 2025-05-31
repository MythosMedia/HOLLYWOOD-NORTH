document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.getElementById("closeSidebar");
    const openBtn = document.querySelector(".cmn-btn"); // Adjust selector if needed

    // Open Sidebar
    openBtn.addEventListener("click", function (e) {
        e.preventDefault();
        sidebar.classList.add("active");
    });

    // Close Sidebar
    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });

    // Close Sidebar When Clicking Outside
    document.addEventListener("click", function (e) {
        if (!sidebar.contains(e.target) && !openBtn.contains(e.target)) {
            sidebar.classList.remove("active");
        }
    });
});
