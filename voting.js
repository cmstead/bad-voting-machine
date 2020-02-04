$(document).ready(function () {
    dependencyLoader
        .loadDependencies(
            [
                './candidates.js',
                './voterForm.js'
            ])
        .then(function () {
            voterForm.displayAllCandidates();
        });
});