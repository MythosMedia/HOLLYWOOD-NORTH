function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.textContent = message;

  // Styling
  toast.style.backgroundColor = type === 'success' ? '#4BB543' : '#ff4d4f';
  toast.style.color = '#fff';
  toast.style.padding = '12px 20px';
  toast.style.marginBottom = '10px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
  toast.style.fontWeight = '500';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  toast.style.transform = 'translateY(-10px)';

  container.appendChild(toast);

  // Fade in
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 100);

  // Auto-remove after 4s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      container.removeChild(toast);
    }, 400);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  const subscribeForms = document.querySelectorAll('[data-subscribe-form]');

  subscribeForms.forEach(form => {
    const emailInput = form.querySelector('[name="email"]');
    const toastSuccess = form.querySelector('[data-toast-success]');
    const toastError = form.querySelector('[data-toast-error]');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Reset toast messages
      if (toastSuccess) toastSuccess.style.display = 'none';
      if (toastError) toastError.style.display = 'none';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ email: emailInput.value })
        });

        const result = await response.text();

        if (result === 'success') {
          showToast('✅ Subscribed successfully!', 'success');
          form.reset();
        } else {
          showToast('❌ Failed to subscribe. Try again.', 'error');
        }
      } catch (err) {
        if (toastError) {
          toastError.style.display = 'block';
          toastError.textContent = '❌ Network error.';
        }
        console.error('Subscription error:', err);
      }
    });
  });

  
});
