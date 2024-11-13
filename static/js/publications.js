document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');

    // Set "All" as the default active filter
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    publicationCards.forEach(card => card.classList.add('active'));

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            // Remove active class from all buttons and add it to the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/hide cards based on the selected filter
            publicationCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    });
});