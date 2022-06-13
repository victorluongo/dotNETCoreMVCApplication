// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function ZipCodeSearch() {
    $(document).ready(function () {

        function clear_zipcode_form() {
            $("#Address_StreetName").val("");
            $("#Address_City").val("");
            $("#Address_State").val("");
        }

        $("#Address_ZipCode").blur(function () {

            var zipcode = $(this).val().replace(/\D/g, '');

            if (zipcode != "") {

                var zipcodeValidation = /^[0-9]{8}$/;

                if (zipcodeValidation.test(zipcode)) {

                    $("#Address_StreetName").val("...");
                    $("#Address_City").val("...");
                    $("#Address_State").val("...");

                    $.getJSON("https://viacep.com.br/ws/" + zipcode + "/json/?callback=?",
                        function (data) {
                            if (!("erro" in data)) {
                                $("#Address_StreetName").val(data.logradouro);
                                $("#Address_City").val(data.localidade);
                                $("#Address_State").val(data.uf);
                            } else {
                                clear_zipcode_form();
                                alert("ZipCode not found.");
                            }
                        });
                } else {
                    clear_zipcode_form();
                    alert("Invalid ZipCode format.");
                }
            } else {
                clear_zipcode_form();
            }
        });
    });
}

function SetModal() {

    $(document).ready(function () {
        $(function () {
            $.ajaxSetup({ cache: false });

            $("a[data-modal]").on("click",
                function (e) {
                    $('#myModalContent').load(this.href,
                        function () {
                            $('#myModal').modal({
                                keyboard: true
                            },
                                'show');
                            bindForm(this);
                        });
                    return false;
                });
        });
    });
}

function bindForm(dialog) {
    $('form', dialog).submit(function () {
        $.ajax({
            url: this.action,
            type: this.method,
            data: $(this).serialize(),
            success: function (result) {
                if (result.success) {
                    $('#myModal').modal('hide');
                } else {
                    $('#myModalContent').html(result);
                    bindForm(dialog);
                }
            }
        });

        SetModal();
        return false;
    });
}
