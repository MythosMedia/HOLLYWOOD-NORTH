document.getElementById('subscribeForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value;
  const messageBox = document.getElementById('subscribeMessage');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email })
    });

    const result = await response.json();
    messageBox.textContent = result.message;
    messageBox.style.color = result.success ? 'green' : 'red';

    if (result.success) form.reset();
  } catch (error) {
    messageBox.textContent = '❌ Network error';
    messageBox.style.color = 'red';
  }
});
