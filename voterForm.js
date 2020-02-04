const voterForm = (function () {
    
    function buildCandidateRadioButton(candidate, candidateId, positionKey) {
        return $('<input>')
            .attr({
                type: 'radio',
                value: candidate.name,
                id: candidateId,
                name: positionKey,
                "data-preferred": candidate.preferred
            })
            .addClass('candidate-radio');
    }

    function buildCandidateLabel(candidate, candidateId) {
        return $('<label>' + candidate.name + '(' + candidate.party + ')</label>')
            .attr({
                for: candidateId
            })
            .addClass('candidate-label');
    }

    function buildCandidateSelection(candidate, positionKey) {
        const candidateId = candidate.name.toLowerCase().replace(/\s+/g, '-');
        const selectionRadioButton = buildCandidateRadioButton(candidate, candidateId, positionKey);
        const selectionLabel = buildCandidateLabel(candidate, candidateId);

        return $('<div class="candidate-selection">')
            .append(selectionRadioButton)
            .append(selectionLabel);
    }

    function buildPositionForm(position) {
        const positionSet = $('<fieldset>')
            .append('<legend>' + position.position + '</legend>');

        const positionKey = position.position.toLowerCase().replace(/\s+/, '-');

        position.candidates.forEach(function (candidate) {
            const candidateSelection = buildCandidateSelection(candidate, positionKey);

            positionSet.append(candidateSelection);
        });

        return positionSet;
    }

    function displayAllCandidates() {
        Object.keys(candidates).forEach(function (region) {
            const regionKey = region + '-candidates';
            const regionDiv = $('#' + regionKey);

            candidates[region].forEach(function (position) {
                regionDiv.append(buildPositionForm(position));
            });
        });
    }

    return {
        displayAllCandidates
    };
})();