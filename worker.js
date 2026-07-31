<body>
        <div class="card">
          <div class="image-wrapper" onclick="redirect()">
            <img src="https://via.placeholder.com/600x338/1a1a1a/ffffff?text=${encodeURIComponent(title)}" alt="Thumbnail" />
            <div class="play-button"></div>
          </div>
          <div class="info">
            <h2>${title}</h2>
            <div class="domain">
              <a href="${originalUrl}" target="_blank">${new URL(originalUrl).hostname}</a>
            </div>
            <a href="${originalUrl}" class="goto" target="_blank">ទៅកាន់ទំព័រដើម →</a>
            <div class="note">ចុចលើរូបភាព ឬប៊ូតុង Play ដើម្បីចាក់</div>
          </div>
        </div>
        <script>
          function redirect() {
            window.location.href = "${originalUrl}";
          }
        </script>
      </body>
      </html>
      `,
      {
        headers: { "Content-Type": "text/html" }
      }
    );
  }
}

// បើរកមិនឃើញ Slug
return new Response("404 Not Found", { status: 404 });
