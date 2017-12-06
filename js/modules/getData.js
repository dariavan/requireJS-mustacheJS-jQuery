define(["jquery"], function ($) {
    return function () {
        return {
            name: $("input[name=Name]").val(),
            salary: parseInt($("input[name=salary]").val()),
            experience: parseInt($("input[name=experience]").val()),
            koef: parseInt($("#koef").find(":selected").text()),
            percentage: $('#percentage').is(':checked') ? 0.8 : 1
        };
    }
});