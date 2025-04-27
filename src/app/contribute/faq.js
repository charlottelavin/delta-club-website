var faqButtons = document.querySelectorAll('.faq-question');
faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var _a, _b, _c, _d;
        var answer = button.nextElementSibling;
        var icon = button.querySelector('span:last-child');
        if (!answer || !icon)
            return;
        answer.classList.toggle('hidden');
        if (answer.classList.contains('hidden')) {
            icon.textContent = '▼';
            (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove('bg-green-50', 'shadow');
            (_b = button.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add('border');
        }
        else {
            icon.textContent = '×';
            (_c = button.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove('border');
            (_d = button.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add('bg-green-50', 'shadow');
        }
    });
});
