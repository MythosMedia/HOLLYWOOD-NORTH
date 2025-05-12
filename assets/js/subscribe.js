document.addEventListener('DOMContentLoaded', () => {
    const subscribeForms = document.querySelectorAll('[data-subscribe-form]');
  
    subscribeForms.forEach(form => {
      const emailInput = form.querySelector('[name="email"]');
      const successDiv = form.querySelector('[data-subscribe-success]');
      const errorDiv = form.querySelector('[data-subscribe-error]');
  
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset messages
        if (successDiv) successDiv.style.display = 'none';
        if (errorDiv) errorDiv.style.display = 'none';
  
        try {
          const response = await fetch('http://145.79.0.55/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailInput.value })
          });
  
          const result = await response.json();
  
          if (response.ok) {
            if (successDiv) successDiv.style.display = 'block';
            form.reset();
          } else {
            if (errorDiv) errorDiv.style.display = 'block';
            console.error('❌ Subscription error:', result);
          }
        } catch (err) {
          if (errorDiv) errorDiv.style.display = 'block';
          console.error('❌ Network error:', err);
        }
      });
    });
  });
  