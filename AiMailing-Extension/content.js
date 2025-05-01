console.log("Email Writer Extension - content script loader you know me");

function createAiButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.cssText = `
        background-color: #0b57d0!important;
        color: white !important;
        border: none !important;
        border-radius: 80px !important;
        padding: 6px 24px !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        font-family: "Google Sans", Roboto, Arial, sans-serif !important;
        cursor: pointer !important;
        box-shadow: none !important;
        margin-right: 8px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 36px !important;
    `;
    button.innerHTML = "AI Reply";
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    // Hover effect
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#1669c1';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#1a73e8';
    });

    // Focus effect
    button.addEventListener('focus', () => {
        button.style.outline = 'none';
        button.style.boxShadow = '0 0 0';
    });

    return button; // ✅ Return the created button
}


function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];

    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerHTML.trim();
        }
    }
    return ''; // ✅ Fix: Moved this outside the loop
}

function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role=toolbar]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null; // ✅ Fix: Also moved return outside the loop
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-b'); // ✅ Fix: use class selector
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found, creating AI Button");

    const button = createAiButton();
    button.classList.add('ai-reply-b');

    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('http://localhost:8080/email/reply', {
                method: 'POST', // ✅ Fix: Proper case for HTTP method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]'); // ✅ Fix: closing quote

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply); // ✅ legacy-compatible
            } else {
                console.error('Compose Box not found');
            }
        } catch (error) {
            console.log(error);
            alert('Failed to generate reply');
        } finally {
            button.innerHTML = "AI Reply";
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (
                node.matches?.('.aDh, .btC, [role="dialog"]') ||
                node.querySelector?.('.aDh, .btC, [role="dialog"]')
            )
        );
        if (hasComposeElements) {
            console.log("Compose window detected!");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});


