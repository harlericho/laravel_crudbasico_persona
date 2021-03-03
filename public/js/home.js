$(document).ready(function () {
    listado();
    //modal se queda estatico y no se cierra
    $('#exampleModal').modal({
        backdrop: 'static',
        keyboard: false,
        focus: false,
        show: false
    });
});

function listado() {
    $.ajax({
        type: "GET",
        url: "/persona/listado",
        dataType: "json",
        success: function (data) {
            html = "<table class='table table-striped' id='tablafiltro' width='100%' cellspacing='0'><thead>";
            html += "<tr><th scope='col'>Nombres</th><th scope='col'>Email</th><th scope='col'>Edad</th><th scope='col'>Acciones</th></tr></thead>";
            html += "<tbody>";
            //var tbody = "<tbody>";
            for (var key in data) {
                html += "<tr>";
                html += "<td>" + data[key]['nombres'] + "</td>";
                html += "<td>" + data[key]['email'] + "</td>";
                html += "<td>" + data[key]['edad'] + "</td>";
                html += `<td>
                <a href="#" id="edit" value="${data[key]['id']}" class="btn btn-sm btn-dark" title="Editar">
                <i class="fa fa-pencil"></i>
                </a>
                <a href="#" id="del" value="${data[key]['id']}" class="btn btn-sm btn-danger" title="Eliminar">
                <i class="fa fa-trash"></i>
                </a>
                </td>`;
            }
            html += "</tr></tbody></table>"
            $("#personas").html(html);
            //tabla filtro
            $('#tablafiltro').DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
                }
            });
        }
    });
}

$("#btnGuardar").click(function (e) {
    if (validaciones() == true) {
        let id = $("#id").val();
        let data = $("#index").serialize();
        if ($.trim(id) == "") {
            //alert("ok");
            guardar(data);
        } else {
            modificar(data);
        }
    }
    e.preventDefault();
});


function guardar(data) {
    $.ajax({
        type: "POST",
        url: "/persona/store",
        data: data,
        dataType: "json",
        success: function (response) {
            if (response.valor == 2) {
                $.notify("Error: Email ya existe", "error");
                $("#email").focus();
            } else {
                $.notify("Success: Persona guardado", "success");
                $("#exampleModal").modal("hide");
                $("#index")[0].reset();
                listado();
            }
        }
    });
}

function modificar(data) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/persona/update",
        data: data,
        success: function (response) {
            if (response) {
                $.notify("Success: Persona modificado", "success");
                $("#exampleModal").modal("hide");
                $("#index")[0].reset();
                listado();
            }
        }
    });
}



$(document).on("click", "#edit", function (e) {
    let idEditar = $(this).attr("value");
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "/persona/edit/" + idEditar,
        success: function (r) {
            $("#exampleModal").modal("show");//abro el modal
            $("#id").val(r['id']);
            $("#nombres").val(r['nombres']);
            $("#email").val(r['email']);
            $("#edad").val(r['edad']);
        },
    });
    e.preventDefault();
});

$(document).on("click", "#del", function (e) {
    let idEliminar = $(this).attr("value");
    Swal.fire({
        title: 'Seguro desea eliminar?',
        text: "Solo se cambiara el estado del registro",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "/persona/delete/" + idEliminar,
                success: function (response) {
                    if (response.success == 1) {
                        listado();
                    }
                }
            });
            Swal.fire(
                'Eliminado!',
                'Su registro cambio de estado',
                'success'
            )
        }
    })
    e.preventDefault();
});




function validaciones() {
    let nombre = $("#nombres").val();
    let email = $("#email").val();
    let edad = $("#edad").val();
    if ($.trim(nombre) == "") {
        $.notify("Warning: Escriba sus nombres", "warn");
        $("#nombres").focus();
    } else if ($.trim(email) == "") {
        $.notify("Warning: Ingrese un email", "warn");
        $("#email").focus();
    } else if ($.trim(edad) == "") {
        $.notify("Warning: Ingrese una edad", "warn");
        $("#edad").focus();
    } else {
        if (validarEmail(email)) {
            if (digitos(edad) == true) {
                return true;
            } else {
                $.notify("Error: Ingrese dos digitos para la edad como minimo", "error");
                $("#edad").focus();
            }
        }
    }
}

function validarEmail(valor) {
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(valor)) {
        return true;
    } else {
        $.notify("Error: Formato de email no existe", "error");
        $("#email").focus();
        return false;
    }
}

$(function () {
    $('#exampleModal').on('shown.bs.modal', function (e) {
        $('#nombres').focus();
    })
});

function limpiar() {
    document.getElementById("id").value = '';
    document.getElementById("nombres").value = '';
    document.getElementById("email").value = '';
    document.getElementById("edad").value = '';
}

function digitos(elementos) {
    var c = 0;
    for (var i = 0; i < elementos.length; i++) {
        c = c + 1;
    }
    if (c >= 2 && c <= 2) {
        return true;
    } else {
        return false;
    }
}