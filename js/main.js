
requirejs.config({
    baseUrl: "js/",
    paths: {
        showInfo: 'templates/showInfo',
        showSalary: 'templates/showSalary',
        mustache: 'libs/mustache',
        validation: "modules/validateData",
        getData: "modules/getData",
        jquery: "libs/jquery-3.2.1.min",
        db: "modules/db",
        handlekoef: 'modules/handlekoef',
        handleExperience: 'modules/handleExperience',
        handlePercentage: 'modules/handlePercentage',
    }
});

requirejs(['./app']);