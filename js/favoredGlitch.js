const favoredGlitch = (function () {

    function applyGlitch(event) {
        const target = $(event.target);

        const name = target.attr('name');
        const isPreferred = target.attr('data-preferred') === 'true';
        const weightedGlitch = Math.random();

        const candidateCount = $('fieldset.' + name).find('input').length;
        const weightOffset = candidateCount > 2 ? Math.floor(candidateCount / 2) : 0;
        const glitchWeight = candidateCount > 1 ? 1 / (candidateCount - weightOffset) + 0.05 : 0;

        if (!isPreferred && weightedGlitch < glitchWeight) {
            $('fieldset.' + name).find('input.preferred').click();
        }
    }

    function initializeFavoredGlitch() {
        $('fieldset')
            .find('.candidate-selection')
            .on('click', function (event) {
                event.stopPropagation();

                if (event.target.type === 'radio') {
                    applyGlitch(event)
                }
            });
    }

    return {
        initializeFavoredGlitch
    };
})();