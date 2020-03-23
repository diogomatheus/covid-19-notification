document.addEventListener('DOMContentLoaded', function() {

	// Materialize form elements initialization
	var i18n = {
	    today: 'Hoje',
	    nextMonth: 'Próximo mês',
	    previousMonth: 'Mês anterior',
	    weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
	    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
	    weekdays: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
	    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
	    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	    clear: 'Limpar',
	    cancel: 'Cancelar',
	    done: 'Ok'
	};
	$('.datepicker').datepicker({
	    container: 'body',
	    showDaysInNextAndPreviousMonths: true,
	    i18n: i18n,
	    format: 'dd/mm/yyyy'
	});
	$('select').formSelect();

    // Form formatter
    $('#cpf_input').formatter({ 'pattern': '{{999}}.{{999}}.{{999}}-{{99}}' });
    $('#sus_input').formatter({ 'pattern': '{{999999999999999}}' });
    $('#data_sintoma_dp, #data_nascimento_dp').formatter({ 'pattern': '{{99}}/{{99}}/{{9999}}' });
    $('#cep_input').formatter({ 'pattern': '{{99999}}-{{999}}' });

	// Form validation
	var error_container = $('#error-container');
	var validator = $("#covid-19-diagnosis-form").validate({
		rules: {
			'nome': {
				'required': true,
				'maxlength': 100
			},
			'nacionalidade': "required",
			'cpf': "required",
			'data_nascimento': "required",
			'sexo': "required",
			'nome_mae': {
				'required': true,
				'maxlength': 100
			},
			'pais_residencia': "required",
			'cep': "required",
			'endereco': {
				'required': true,
				'maxlength': 255
			},
			'data_sintoma': "required",
			'sintomas[]': "required",
			'ocupacao': "required",
			'historico_viagem': "required",
			'contato_suspeito': "required",
			'contato_confirmado': "required",
			'contato_animal': "required",
			'historico_unidade_saude': "required",
		},
		messages: {
			'nome': {
				'required': "Identificação: Por favor, informe seu nome.",
				'maxlength': "Identificação: Seu nome deve conter no máximo 100 caracteres."
			},
			'nacionalidade': "Identificação: Por favor, informe sua nacionalidade.",
			'cpf': "Identificação: Por favor, informe seu cpf.",
			'data_nascimento': "Identificação: Por favor, informe sua data de nascimento.",
			'sexo': "Identificação: Por favor, informe seu sexo.",
			'nome_mae': {
				'required': "Identificação: Por favor, informe o nome da sua mãe.",
				'maxlength': "Identificação: O nome da sua mãe deve conter no máximo 100 caracteres."
			},
			'pais_residencia': "Identificação: Por favor, informe seu país de residência.",
			'cep': "Identificação: Por favor, informe seu CEP.",
			'endereco': {
				'required': "Identificação: Por favor, informe seu endereço.",
				'maxlength': "Identificação: Seu endereço deve conter no máximo 255 caracteres."
			},
			'data_sintoma': "Dados clínicos: Por favor, informe a data dos primeiros sintomas.",
			'sintomas[]': "Dados clínicos: Por favor, informe os sintomas apresentados.",
			'ocupacao': "Dados de exposição e viagens: Por favor, informe sua ocupação.",
			'historico_viagem': "Dados de exposição e viagens: Por favor, informe sobre seu possível histórico de viagem.",
			'contato_suspeito': "Dados de exposição e viagens: Por favor, informe sobre seu possível contato com casos suspeitos.",
			'contato_confirmado': "Dados de exposição e viagens: Por favor, informe sobre seu possível contato com casos confirmados",
			'contato_animal': "Dados de exposição e viagens: Por favor, informe sobre seu possível contato com animais.",
			'historico_unidade_saude': "Dados de exposição e viagens: Por favor, informe se você esteve em alguma unidade de saúde.",
		},
		errorContainer: error_container,
		errorLabelContainer: $("ul", error_container),
		wrapper: 'li',
		focusInvalid: false,
		invalidHandler: function(form, validator) {
            let errors = validator.numberOfInvalids();
            if(errors) $('html, body').animate({ scrollTop: 0 }, 'fast');
        },
        submitHandler: function(form) {
        	var resultado = analisar_dados();

        	var icon = (resultado) ? 'check' : 'warning';
			var icon_element = '<i class="material-icons medium">' + icon + '</i>';
			var title = 'Olá ' + $('#nome_input').val() + ',';
			var title_color = (resultado) ? 'green' : 'orange';
            var title_element = '<h5 class="valign-wrapper" style="color: ' + title_color +'">' + icon_element + ' ' + title + '</h5>';

            var message = null;
            if(resultado)
            	message = 'Com base nos dados fornecidos, sugerimos que você continue seguindo as instruções do ministério da saúde. Porém, não existe necessidade de ir ao hospital nesse momento.';
            else
            	message = 'Com base nos dados fornecidos, sugerimos que você continue seguindo as instruções do ministério da saúde. Porém, compareça ao hospital mais próximo para realizar uma consulta presencial.';
            var message_element = '<p>' + message + '</p>';

            var back_element = '<p class="center"><a href="index.html">Voltar ao formulário</a></p>';

            $('#main-content').html('<br /><div class="card-panel z-depth-3">' + title_element + message_element + back_element + '</div>');
            // TODO: form.submit();
        }
	});

	// Form reset 
	$("#covid-19-diagnosis-form").on('reset', function(e){
		validator.resetForm();
	});

});

function analisar_dados() {
	var resultado = true;

	var sintomas = [];
    $.each($("input[name='sintomas[]']:checked"), function(){
        sintomas.push($(this).val());
    });

    var sinais = [];
    $.each($("input[name='sinais[]']:checked"), function(){
        sinais.push($(this).val());
    });

    var dados = sintomas.concat(sinais);
   	if(dados.indexOf('Febre') !== -1 && dados.indexOf('Tosse') !== -1)
   		resultado = false

    return resultado;
}