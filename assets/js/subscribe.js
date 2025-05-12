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
          if (toastSuccess) {
            toastSuccess.style.display = 'block';
            toastSuccess.textContent = '✅ Subscribed successfully!';
          }
          form.reset();
        } else {
          if (toastError) {
            toastError.style.display = 'block';
            toastError.textContent = '❌ Failed to subscribe. Try again.';
          }
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
