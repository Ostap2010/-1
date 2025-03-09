let selectedPort;

document.getElementById('requestPortButton').addEventListener('click', async () => {
    try {
        if (selectedPort && selectedPort.readable.locked) {
            console.warn('Порт вже відкритий, закриття порту...');
            await selectedPort.close();
        }

        selectedPort = await navigator.serial.requestPort();
        await selectedPort.open({ baudRate: 9600 });

        alert('Порт вибрано успішно!');
    } catch (error) {
        console.error('Помилка при виборі порту:', error);
        alert('Помилка при виборі порту: ' + error.message);
    }
});

async function sendBlinkCommand() {
    if (selectedPort) {
        try {
            const writer = selectedPort.writable.getWriter();
            console.log('Відправляю команду blink на Arduino');
            await writer.write(new TextEncoder().encode('blink\n'));
            writer.releaseLock();
            console.log('Команду blink успішно відправлено');
            alert('Команду blink відправлено успішно!');
        } catch (error) {
            console.error('Помилка при відправленні команди blink:', error);
            alert('Помилка при відправленні команди blink: ' + error.message);
        }
    } else {
        alert('Будь ласка, виберіть порт.');
    }
}

async function sendCode() {
    const code = document.getElementById('codeArea').value;
    if (selectedPort) {
        try {
            const writer = selectedPort.writable.getWriter();
            console.log('Відправляю код на Arduino: ', code);
            await writer.write(new TextEncoder().encode(code + '\n'));
            writer.releaseLock();
            console.log('Код успішно відправлено');
            alert('Код завантажено успішно!');
        } catch (error) {
            console.error('Помилка при завантаженні коду:', error);
            alert('Помилка при завантаженні коду: ' + error.message);
        }
    } else {
        alert('Будь ласка, виберіть порт.');
    }
}