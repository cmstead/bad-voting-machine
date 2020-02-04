const voterForm = (function () {
    
    function buildCandidateRadioButton(candidate, candidateId, positionKey) {
        const radioButton = $('<input>')
            .attr({
                type: 'radio',
                value: candidate.name,
                id: candidateId,
                name: positionKey,
                "data-preferred": candidate.preferred
            })
            .addClass('candidate-radio');

        if(candidate.preferred) {
            radioButton.addClass('preferred');
        }

        return radioButton;
    }

    function buildCandidateLabel(candidate, candidateId) {
        return $('<label>' + candidate.name + ' (' + candidate.party + ')</label>')
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
        const positionKey = position.position.toLowerCase().replace(/\s+/, '-');
        
        const positionSet = $('<fieldset class="' + positionKey + '">')
            .append('<legend>Office: ' + position.position + '</legend>');

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