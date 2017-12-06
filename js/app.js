define(function (require) {
    const $ = require('jquery');
    const getData = require("getData");
    const validate = require("validation");
    const db = require("db");
    const Mustache = require('mustache');
    const handlekoef = require('handlekoef');
    const handleExperience = require('handleExperience');
    const handlePercentage = require('handlePercentage');
    const renderSalary = require('showSalary');
    const renderInfo = require('showInfo');
    const workersArr = [];

    $(document).ready(function () {
        addClicked();
        calculateSalary();
        clearTable();
        fillList();
        getEmplInfo();
    });

    function showAverSalary(data) {
        var info = Mustache.to_html(renderSalary, {salary: data});
        $('#table').html(info);
    }

    function getEmplInfo() {
        $("#getBtn").click(() => {
            let workerName = $("#workerChooser").find(":selected").text();
            let worker;
            for (let i = 0; i < workersArr.length; i++) {
                if (workersArr[i].name === workerName) {
                    worker = workersArr[i];
                }
            }
            console.log(worker);
            var info = Mustache.to_html(renderInfo, {
                name: worker.name,
                salary: worker.salary,
                experience: worker.experience,
                koef: worker.koef,
                totalSalary: worker.totalSalary
            });
            console.log(info);
            $('.emplList').html(info);
        });
    }

    function fillList() {
        db.getAll()
            .then(workers => {
                let list = $("#workerChooser");
                for (let i = 0; i < workers.length; i++) {
                    workersArr.push(workers[i]);
                    list.append($("<option />").text(workers[i].name))
                }
            })
    }


    function addToList(worker) {
        workersArr.push(worker);
        $("#workerChooser").append($("<option />").text(worker.name))
    }

    function addClicked() {
        $("#addBtn").click(() => {
            let dataObj = getData();
            dataObj.totalSalary = handlekoef(dataObj.salary, dataObj.koef)
                + handleExperience(dataObj.salary, dataObj.experience)
                + handlePercentage(dataObj.salary, dataObj.percentage);
            validate(dataObj);
            db.save(dataObj)
                .then(worker => {
                    addToList(worker);
                });
        });

    }

    function clearTable() {
        $("#dropBtn").click(() => {
            db.clearTable();
        });

    }

    function calculateSalary() {
        $("#calculateAver").click(() => {
            db.getAll()
                .then(workers => {
                    console.log(Array.isArray(workers));
                    let totalSalaries = 0;
                    for (let i = 0; i < workers.length; i++) {
                        totalSalaries += workers[i].totalSalary;
                    }
                    console.log(totalSalaries / workers.length);
                    let averSalary = totalSalaries / workers.length;
                    let info = Mustache.to_html(renderSalary, {averageSalary: averSalary});
                    $('#table').html(info);
                })
        });
    }
});

