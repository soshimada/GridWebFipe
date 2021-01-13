var listaVelha = [];
var listaNova = [];

//Metodos
function FormataDecimal(value) {
    var real = value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return real;
}

function ExcluirLinha() {
 
}

function BuscaDadosFipe(ano) {
    $.ajax({
        url: '../Home/GetFipe/',
        type: 'POST',
        data: { ano: ano },
        success: function(data) {

            PreencherGridFipe(JSON.parse(data));
        },
        error: function(e) {
            alert('');
        }
    });
}

function PreencherGridFipe(data) {
    listaVelha = data;
    $('#tbFipe').DataTable({
        data: data,
        destroy: true,
        columns: [
            { data: "Marca" },
            { data: "Modelo" },
            { data: "Ano" },
            { data: "Codigo" },
            { data: "Preco" },
            { data: "PrecoMedia" },
            { data: null }
        ],
        select: {
            style: 'single'
        },
        'order': [[2, 'asc'], [1, 'asc']],
        "language": {
            "info": "Página _PAGE_ a _PAGES_",
            "infoEmpty": "Mostrando 0 de 0",
            "lengthMenu": "Mostrando _MENU_  por página",
            "search": "Busca:",
            "zeroRecords": "Não contém registros",
            "paginate": {
                "first": "Primeira",
                "last": "Última",
                "next": "Próxima",
                "previous": "Anterior"
            }
        },
        columnDefs: [{
            // coloca botao na última coluna
            className: "dt-center",
            targets: [-1], render: function(a, b, data, d) {
                return "<button id='btn_info_obs' type='button' class='btn btn-outline-danger btn-elevate btn-circle btn-icon' data-toggle='tooltip' data-placement='left'><i class='fa fa-remove'></i></button>";

            }
        }]
    });
}

function DestroyTable() {
    let porcentagem = "1." + $("#txtCusto").val();
    listaNova = [];
    listaVelha.forEach(function(valor, chave) {
        let val = valor.Preco * porcentagem;
        valor.PrecoMedia = FormataDecimal(val);
        listaNova.push(valor);

    });
    var table = $('#tbFipe').DataTable();
    table.destroy();
    PreencherGridFipe(listaNova);
}

//Eventos
$("#btnCalcular").on("click", function() {
    DestroyTable();
});

$('#selectAno').on('change', function(value) {
    $('#divTable').removeAttr('hidden');
    var ano = $("#selectAno option:selected").text();

    BuscaDadosFipe(ano);
});

$('#tbFipe').on('click', 'tr', function() {
    var table = $('#tbFipe').DataTable();
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    if (table.rows({ selected: true })) {
        table.rows('.selected').remove().draw(false);
        listaNova = [];
        $.map(table.rows().data(), function(item) {
            listaNova.push(item);
        });
    }
    table.destroy();
    PreencherGridFipe(listaNova);
});