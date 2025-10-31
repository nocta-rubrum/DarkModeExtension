chrome.action.onClicked.addListener(async (tab) => {
    try {
        const [result] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => !!document.getElementById('dark-mode-style')
        });

        if (result.result) {
            await chrome.scripting.removeCSS({ target: { tabId: tab.id }, files: ['dark.css'] });
            console.log('🌞 Modo escuro desativado');
        } else {
            await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ['dark.css'] });
            console.log('🌙 Modo escuro ativado');
        }
    } catch (e) {
        console.error('Erro ao alternar modo escuro:', e);
    }
});
