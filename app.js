// ===================== LOAD LINKS =====================
async function loadLinks() {
  try {
    const res = await fetch('/api/list');
    const links = await res.json();

    const tbody = document.getElementById('linkList');
    if (!tbody) return;

    if (links.length === 0) {
      tbody.innerHTML = <tr><td colspan="6" style="text-align:center;">មិនទាន់មាន Link ទេ</td></tr>;
      return;
    }

    let html = '';
    links.forEach(link => {
      const shortUrl = ${window.location.origin}/${link.slug};
      html += `
        <tr>
          <td><strong>${link.slug}</strong></td>
          <td><code>${shortUrl}</code></td>
          <td>${link.original_url}</td>
          <td>${link.clicks || 0}</td>
          <td>
            <button class="play-btn-x" onclick="window.open('${link.original_url}', '_blank')" title="Play"></button>
            <button class="copy-btn" data-url="${shortUrl}">📋 Copy</button>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = html;

  } catch (err) {
    console.error('Error loading links:', err);
    document.getElementById('linkList').innerHTML = <tr><td colspan="6">❌ មិនអាចទាញយកទិន្នន័យបាន</td></tr>;
  }
}

// ===================== COPY (Event Delegation) =====================
document.addEventListener('click', function(e) {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;

  const url = btn.dataset.url;
  if (!url) return;

  navigator.clipboard.writeText(url)
    .then(() => {
      const originalText = btn.textContent;
      btn.textContent = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('copied');
      }, 2500);
    })
    .catch(() => {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      btn.textContent = '✅ Copied!';
      setTimeout(() => btn.textContent = '📋 Copy', 2500);
    });
});

// ===================== CREATE LINK =====================
async function createLink() {
  const slug = document.getElementById('newSlug').value.trim();
  const url = document.getElementById('newUrl').value.trim();

  if (!slug || !url) {
    alert('សូមបំពេញទាំង Slug និង URL');
    return;
  }

  try {
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, url, title: slug })
    });

    if (res.ok) {
      alert('✅ បង្កើត Link ជោគជ័យ!');
      document.getElementById('newSlug').value = '';
      document.getElementById('newUrl').value = '';
      loadLinks(); // Reload the list
    } else {
      alert('❌ បង្កើតមិនបាន សូមពិនិត្យមើល Slug ថាមិនដូចគ្នា');
    }
  } catch (err) {
    alert('❌ កំហុសបណ្តាញ');
    console.error(err);
  }
}

// ===================== START =====================
document.addEventListener('DOMContentLoaded', loadLinks);