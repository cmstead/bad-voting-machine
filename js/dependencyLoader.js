const DependencyLoader = (function () {
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

    function DependencyLoader() {
    }

    DependencyLoader.prototype = {
        setBaseDir: function (baseDir) {
            this.baseDir = baseDir;
            return this;
        },
        loadDependencies: function (dependencies) {
            const baseDir = this.baseDir;
            
            return new Promise(function (resolve) {
                const dependencySet = dependencies
                    .map(name => baseDir + name + '.js');

                getAllScripts(dependencySet, () => resolve());
            });
        }
    };

    return DependencyLoader;
})();