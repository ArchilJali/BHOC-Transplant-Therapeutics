(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form || !window.fetch) return;

  var button = form.querySelector('button[type="submit"]');
  var status = form.querySelector('[data-contact-status]');
  var success = document.querySelector('[data-contact-success]');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (button.disabled) return;
    if (!form.reportValidity()) return;

    var honey = form.querySelector('[name="_honey"]');
    if (honey && honey.value) return;

    button.disabled = true;
    status.textContent = 'Sending your message…';

    try {
      var body = {};
      new FormData(form).forEach(function (value, key) {
        if (key !== '_honey') body[key] = value;
      });

      var response = await fetch(form.dataset.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(body)
      });
      var result = await response.json();
      if (!response.ok || ![true, 'true'].includes(result.success)) {
        throw new Error('Submission was not accepted');
      }

      window.BHOCLeadContext?.submitted(form);
      form.reset();
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (error) {
      status.textContent = 'Your message could not be sent. Please try again or email us directly.';
    } finally {
      button.disabled = false;
    }
  });
}());
