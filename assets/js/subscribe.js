function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.textContent = message;

  toast.style.backgroundColor = type === "success" ? "#4BB543" : "#ff4d4f";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.marginBottom = "10px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  toast.style.fontWeight = "500";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  toast.style.transform = "translateY(-10px)";

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => {
      container.removeChild(toast);
    }, 400);
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  const subscribeForms = document.querySelectorAll("[data-subscribe-form]");

  subscribeForms.forEach((form) => {
    const emailInput = form.querySelector('[name="email"]');
    const submitButton = form.querySelector("button[type='submit']");
    const listIds = form.dataset?.lists?.split(",").map((id) => id.trim()) || [
      "RdcFDS",
      "REn35d",
    ];

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = emailInput.value;

      if (form.dataset.submitting === "true") return;

      form.dataset.submitting = "true";
      submitButton.disabled = true;

      try {
        const response = await fetch("/klaviyo-subscribe.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, list_ids: listIds }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showToast("✅ Subscribed successfully!", "success");
          form.reset();
        } else {
          const error = result?.error || "❌ Failed to subscribe.";
          showToast(error, "error");
        }
      } catch (err) {
        console.error("Subscription error:", err);
        showToast("❌ Network error.", "error");
      } finally {
        form.dataset.submitting = "false";
        submitButton.disabled = false;
      }
    });
  });
});
