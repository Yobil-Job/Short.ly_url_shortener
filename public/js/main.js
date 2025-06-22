document.addEventListener('DOMContentLoaded', () => {
  // Modern URL Shortening Form Handler
  const urlForm = document.getElementById('url-form');
  if (urlForm) {
    urlForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const loader = submitBtn.querySelector('.loader');
      const formError = document.getElementById('form-error');

      // Show loading state
      btnText.textContent = 'Shortening...';
      loader.classList.remove('hidden');
      submitBtn.disabled = true;
      formError.classList.add('hidden');
      formError.textContent = '';

      try {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch('/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Something went wrong');
        }
        
        // Success: Update UI dynamically
        this.reset(); // Clear the form
        document.getElementById('custom-code-input').classList.add('hidden');
        document.getElementById('custom-toggle').checked = false;

        const newUrlCard = createUrlCard(result);
        const urlList = document.querySelector('.url-list');
        const emptyState = document.querySelector('.empty-state');

        if (emptyState) {
          emptyState.remove();
        }
        urlList.insertAdjacentHTML('afterbegin', newUrlCard);
        
        // Add copy functionality to the new card's button
        const newCopyBtn = urlList.firstElementChild.querySelector('.copy-btn');
        addCopyFunctionality(newCopyBtn);

      } catch (err) {
        // Error: Show error message
        formError.textContent = err.message;
        formError.classList.remove('hidden');
      } finally {
        // Reset button state
        btnText.textContent = 'Shorten';
        loader.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });
  }

  // Add Copy Functionality to Buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    addCopyFunctionality(btn);
  });
});

function addCopyFunctionality(button) {
  button.addEventListener('click', function() {
    const urlToCopy = this.getAttribute('data-url');
    navigator.clipboard.writeText(urlToCopy).then(() => {
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Copied!';
      this.classList.add('copied');
      setTimeout(() => {
        this.innerHTML = originalText;
        this.classList.remove('copied');
      }, 2000);
    });
  });
}

function createUrlCard(data) {
  const { originalUrl, shortUrl, shortCode, isCustom } = data;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  
  return `
  <div class="url-card ${isCustom ? 'custom-url' : ''}">
    <div class="url-info">
      <a href="/${shortCode}" target="_blank" class="short-url">
        ${baseUrl}/${shortCode}
        ${isCustom ? '<span class="custom-badge">Custom</span>' : ''}
      </a>
      <p class="original-url" title="${originalUrl}">${originalUrl}</p>
    </div>
    <div class="url-meta">
      <span class="click-count">0 clicks</span>
      <button class="copy-btn" data-url="${baseUrl}/${shortCode}">
          <i class="far fa-copy"></i> Copy
      </button>
      <a href="/analytics/${shortCode}" class="analytics-link">
          <i class="fas fa-chart-line"></i> View Analytics
      </a>
    </div>
  </div>
  `;
}

function toggleCustomCode() {
  const input = document.getElementById('custom-code-input');
  input.classList.toggle('hidden');
}

function validateUrl(input) {
  if (input.checkValidity()) {
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
  }
}