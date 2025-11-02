// include.js
// loadComponent(id, file) => trả Promise, chèn HTML vào element#id và thực thi <script> (nếu có)
function loadComponent(id, file) {
    return fetch(file)
        .then(res => {
            if (!res.ok) throw new Error(`Fetch ${file} lỗi: ${res.status}`);
            return res.text();
        })
        .then(html => {
            const container = document.getElementById(id);
            if (!container) throw new Error(`Element id="${id}" không tìm thấy`);

            // Chèn HTML (innerHTML). Sau đó tách ra các thẻ <script> để thực thi an toàn.
            container.innerHTML = html;

            // Tìm scripts trong html string và thực thi (inline scripts)
            // Lưu ý: external scripts (src) sẽ được tải bằng appendChild
            const temp = document.createElement('div');
            temp.innerHTML = html;
            const scripts = temp.querySelectorAll('script');

            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                    newScript.async = false;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                document.body.appendChild(newScript);
                // optional: remove immediately
                document.body.removeChild(newScript);
            });

            return true;
        });
}
