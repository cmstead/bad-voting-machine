const dependencyLoader = (function () {
    const first = values => values[0];
    const rest = values => values.slice(1);

    function getAllScripts(dependencies, onComplete) {
        if (dependencies.length > 0) {
            const loadNext = () =>
                getAllScripts(rest(dependencies), onComplete)

            $.getScript(first(dependencies), loadNext);
        } else {
            onComplete();
        }
    }

    function loadDependencies(dependencies) {
        return new Promise(function (resolve) {
            getAllScripts(dependencies, () => resolve());
        });
    }

    return {
        loadDependencies
    };
})();