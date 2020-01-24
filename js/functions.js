
var islas = ["lapalma", "elhierro", "tenerife", "lagomera", "grancanaria", "lanzarote", "fuerteventura"];

var trajes = ["h-lapalma", "m-lapalma", "h-tenerife", "m-tenerife", "m-elhierro", "h-elhierro", "h-lagomera",
    "m-lagomera", "h-grancanaria", "m-grancanaria", "h-lanzarote", "m-lanzarote", "h-fuerteventura", "m-fuerteventura"];

var puntos = 0;
var max = 0;

$(document).ready(function () {
    setPreset();
});

function changeGameStatus() {

    puntos = 0;
    max = 0;
    switch ($("#inputState").val()) {
        case "Fácil":
            mostrarItems(4);
            max = 4;
            break;
        case "Medio":
            mostrarItems(7);
            max = 7;
            break;
        case "Difícil":
            mostrarItems(8);
            max = 8;
            break;
        default:
            setEmptyItems();
            setPreset();
            break;
    }
}


function setPreset() {
    $("#preset").append("<img alt='preset' id='islas-map' src='./images/islas.png' />");
}

function mostrarItems(num) {

    var aux = islas.sort(() => Math.random() - 0.5);
    var aux2 = [];

    setEmptyItems();

    var ran = getRandomInt(4, 7);
    for (let i = 0; i < ran; i++) {
        $("#islas").append("<img alt='" + aux[i] + "' class='drop border border-secondary' src='./images/" + aux[i] + ".png' />");
        trajes.filter(r => r.includes(aux[i])).forEach(element => {
            aux2.push(element);
        });
    }
    aux2 = aux2.sort(() => Math.random() - 0.5)

    for (let i = 0; i < num; i++) {
        $("#imagenes").append("<img alt='" + aux2[i] + "' class='draggable' src='./images/" + aux2[i] + ".png' />");
    }

    setDragDropItems();
}


function getRandomInt(min, maxi) {
    return Math.floor(Math.random() * (maxi - min + 1)) + min;
}

function setEmptyItems() {
    $("#islas").empty();
    $("#imagenes").empty();
    $("#preset").empty();
}

function setDragDropItems() {

    $(".draggable").draggable({
        containment: "#mainGame",
        revert: true
    });

    $(".drop").droppable({
        drop: function (a, ui) {
            if ($(this).attr("alt").includes(ui.draggable[0].alt.split("-")[1])) {
                puntos += 1;
                sendToast('success', 'Correcto!');
            } else {
                sendToast('error', 'Incorrecto!');
            }
            ui.draggable.remove();
            if ($('#imagenes').is(':empty'))
                sendDialog();

        }
    });

}


function sendToast(type, message) {
    toastr.options.closeButton = true;
    toastr.options.positionClass = "toast-bottom-right";
    if (type == 'success') {
        toastr.success(message, '<i>Éxito</i>');
    } else if (type == 'error') {
        toastr.error(message, 'Error');
    }
}


function sendDialog() {

    $("#dialog").append("<p>Aciertos: " + puntos + "/" + max + "</p>");

    $("#dialog").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        autoOpen: true,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "drop",
            duration: 250
        },
        buttons: {
            "Jugar de Nuevo": function () {
                $(this).dialog("close");
                puntos = 0;
                max = 0;
                changeGameStatus();
                $("#dialog").find("p").remove();
            },
            "Cerrar": function () {
                $(this).dialog("close");
                setEmptyItems();
                setPreset();
                $('#inputState')[0].selectedIndex = 0;
                $("#dialog").find("p").remove();
            }
        }
    });

}























