$(document).ready(function () {
    new DependencyLoader()
        .setBaseDir('./js/')
        .loadDependencies(
            [
                'candidates',
                'favoredGlitch',
                'voterForm'
            ]
        )
        .then(function () {
            voterForm.displayAllCandidates();
            favoredGlitch.initializeFavoredGlitch();
        });
});