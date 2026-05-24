const save_version_check = "4.0.2"
async function checkForUpdates() {
    try {
        const response = await fetch(
            'https://raw.githubusercontent.com/Luxander030/luxs-rpg-public/main/version.txt'
        );

        if (!response.ok) return;

        const latestVersion = (await response.text()).trim();

        if (latestVersion !== save_version_check) {
            showUpdatePopup(latestVersion);
        }

    } catch (err) {
        console.warn("Update check failed:", err);
    }
}

function showUpdatePopup(latestVersion) {
    if (document.getElementById('update-popup')) return;

    const popup = document.createElement('div');
    popup.id = 'update-popup';
    popup.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #16161a;
        border: 2px solid var(--mana);
        border-radius: 12px;
        padding: 20px;
        z-index: 999999;
        max-width: 320px;
        color: white;
        font-family: 'Fira Code', monospace;
        box-shadow: 0 0 20px #3c23a888;
    `;

    popup.innerHTML = `
        <div style="font-size: 1em; font-weight: bold; color: var(--mana); margin-bottom: 8px;">
            Update Available
        </div>
        <div style="font-size: 0.85em; color: #a4b0be; margin-bottom: 14px;">
            A newer version of Lux's RPG is available.<br><br>
            <span style="color: #ff4757;">Current:</span> ${save_version_check}<br>
            <span style="color: #2ed573;">Latest:</span> ${latestVersion}
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
            <button id="update-export-btn" style="
                background: #3c23a822;
                border: 1px solid var(--mana);
                color: var(--mana);
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 0.85em;
            ">Export Save & Refresh</button>
            <button id="update-refresh-btn" style="
                background: #2ed57322;
                border: 1px solid #2ed573;
                color: #2ed573;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: bold;
                font-size: 0.85em;
            ">Refresh (No Export)</button>
            <button id="update-dismiss-btn" style="
                background: #2f3542;
                border: 1px solid #57606f;
                color: #a4b0be;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.85em;
            ">Dismiss</button>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById('update-export-btn').onclick = () => {
        exportSave();
        setTimeout(() => {
            location.reload();
        }, 500);
        popup.remove();
    };

    document.getElementById('update-refresh-btn').onclick = () => {
        location.reload();
        popup.remove();
    };

    document.getElementById('update-dismiss-btn').onclick = () => {
        popup.remove();
    };
}