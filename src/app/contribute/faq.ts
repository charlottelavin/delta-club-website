const faqButtons = document.querySelectorAll<HTMLButtonElement>('.faq-question');

faqButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling as HTMLElement;
    const icon = button.querySelector('span:last-child') as HTMLElement;

    if (!answer || !icon) return;

    answer.classList.toggle('hidden');

    if (answer.classList.contains('hidden')) {
      icon.textContent = '▼';
      button.parentElement?.classList.remove('bg-green-50', 'shadow');
      button.parentElement?.classList.add('border');
    } else {
      icon.textContent = '×';
      button.parentElement?.classList.remove('border');
      button.parentElement?.classList.add('bg-green-50', 'shadow');
    }
  });
});
