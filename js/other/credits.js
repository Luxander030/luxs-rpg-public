// ============================================================
// CREDITS WINDOW
// Shows credits.html in an overlay on the page instead of navigating away.
// It's iframed rather than inlined because credits.html is a complete
// document with its own <head>, its own CSS variables and an external
// stylesheet — an iframe keeps all of that intact and stops it colliding
// with the game's styles.
// ============================================================

function openCredits() {
    if (document.getElementById('credits-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'credits-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.85); z-index: 1000;
        display: flex; flex-direction: column; align-items: center;
        justify-content: center; padding: 20px; box-sizing: border-box;
    `;

    const panel = document.createElement('div');
    panel.style.cssText = `
        width: 100%; max-width: 900px; height: 100%; max-height: 82vh;
        font-family: 'Fira Code', monospace; color: var(--text);
        display: flex; flex-direction: column; gap: 12px;
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        display: flex; justify-content: space-between;
        align-items: center; font-size: 20px; flex: 0 0 auto;
    `;
    header.innerHTML = `
        <span>Credits</span>
        <button id="credits-close-btn" style="
            background: #ff4757; border: none; color: white;
            padding: 6px 14px; border-radius: 6px;
            font-family: 'Fira Code', monospace; cursor: pointer;
        ">Close</button>
    `;

    const frame = document.createElement('iframe');
    frame.src = 'credits.html';
    frame.title = 'Credits';
    frame.style.cssText = `
        flex: 1 1 auto; width: 100%; min-height: 0;
        border: 1px solid #2f3542; border-radius: 8px;
        background: var(--bg);
    `;

    panel.appendChild(header);
    panel.appendChild(frame);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const closeCredits = () => {
        window.removeEventListener('keydown', creditsKeyHandler);
        overlay.remove();
    };

    function creditsKeyHandler(e) {
        if (e.key === 'Escape') closeCredits();
    }

    window.addEventListener('keydown', creditsKeyHandler);
    document.getElementById('credits-close-btn').addEventListener('click', closeCredits);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCredits(); });

    // Keydowns inside an iframe don't reach the parent, so Escape would stop
    // working once the credits have focus. Mirror the handler inside the frame
    // where the browser allows it — over file:// it usually won't, which is why
    // this is best-effort and the Close button is always there.
    frame.addEventListener('load', () => {
        try {
            frame.contentWindow.addEventListener('keydown', creditsKeyHandler);
        } catch (err) {
            /* cross-origin restrictions — Close button and backdrop still work */
        }
    });
}
