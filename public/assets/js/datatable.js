$(document).ready(function() {

    $('#main').DataTable();
    let list = document.getElementById("table_name").value;
    var d = new Date();
    var dd = String(d.getDate()).padStart(2, "0");
    var mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = d.getFullYear();
    var time = d.toLocaleTimeString();
    today = dd + "-" + mm + "-" + yyyy;
    var table_name = list + "_" + today + "_" + time;
    console.log(time);
    var table = $("#maintable").DataTable({
        mark: true,
        dom: "Bfrtip",
        lengthMenu: [
            [10, 25, 50, 100, -1],
            [
                "10 colonnes",
                "25 colonnes",
                "50 colonnes",
                "100 colonnes",
                "Voir tous",
            ],
        ],
        buttons: [
            "pageLength",
            {
                extend: "excelHtml5",
                title: table_name,
                exportOptions: {
                    columns: ":visible",
                },
            },
            "colvis",
        ],
        language: {
            buttons: {
                colvis: "Colonnes",
                print: "Imprimer",
                pageLength: "10 Lignes",
            },
        },
        columDefs: [{
            targets: -1,
            visible: false,
        }, ],
    });

    // 4) Search on Multiple Columns
    $("#maintable tfoot th").each(function() {
        var title = $("#maintable tfoot th").eq($(this).index()).text();
        $(this).html('<input type="text" placeholder="Filter ' + title + '" />');
    });

    table
        .columns()
        .eq(0)
        .each(function(colIdx) {
            $("input", table.column(colIdx).footer()).on("keyup change", function() {
                table.column(colIdx).search(this.value).draw();
            });
        });
});