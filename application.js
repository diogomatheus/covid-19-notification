// jQuery Validate
var validator = null;

// Init
document.addEventListener('DOMContentLoaded', function() {

	// Materialize form configuration
	var date = new Date;
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
	$('#data_nascimento_dp').datepicker({
	    container: 'body',
	    showDaysInNextAndPreviousMonths: true,
	    i18n: i18n,
	    format: 'dd/mm/yyyy',
		maxDate: date,
		yearRange: 130,
		showClearBtn: true
	});
	$('#data_sintoma_dp').datepicker({
	    container: 'body',
	    showDaysInNextAndPreviousMonths: true,
	    i18n: i18n,
	    format: 'dd/mm/yyyy',
	    maxDate: date,
	    showClearBtn: true
	});
	$('select').formSelect();
	$('select[required]').css({
		display: 'inline',
		position: 'absolute',
		float: 'left',
		padding: 0,
		margin: 0,
		border: '1px solid rgba(255,255,255,0)',
		height: 0, 
		width: 0,
		top: '2em',
		left: '3em',
		opacity: 0,
		pointerEvents: 'none'
    });
	$('select, .datepicker, input[name="sintomas[]"]').on('change', function () {
		if(typeof validator !== 'undefined' && validator !== null) $(this).valid();
	});

    // Form formatter configuration
    new Cleave('#cpf_input', { numericOnly: true, delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2] });
    new Cleave('#sus_input', { numericOnly: true, blocks: [15] });
    new Cleave('#data_sintoma_dp', { numericOnly: true, delimiters: ['/', '/', '/'], blocks: [2, 2, 4] });
    new Cleave('#data_nascimento_dp', { numericOnly: true, delimiters: ['/', '/', '/'], blocks: [2, 2, 4] });
    new Cleave('#cep_input', { numericOnly: true, delimiters: ['-'], blocks: [5, 3] });

	// Form validation configuration
	init_form_validation();

	// Form reset configuration
	$('#covid-19-diagnosis-form-reset').on('click', function(e) {
		// Reset materializecss select
		$('select').val('');
		$('select').prop('selectedIndex', 0);
    	$('select').formSelect();

    	// Reset materializecss checkbox
    	$('input[type="checkbox"]:checked').prop('checked', false);

    	// Reset the jquery validate
		if(typeof validator !== 'undefined' && validator !== null)
			validator.destroy();			

		init_form_validation();
	});

});

/*
	init_form_validation
	@desc Configurar validação do formulário com jQuery validate
*/
function init_form_validation() {
	$.validator.setDefaults({ ignore: [] });
	var error_container = $('#error-container');
	validator = $('#covid-19-diagnosis-form').validate({
		rules: {
			'nome': {
				'required': true,
				'maxlength': 100
			},
			'nacionalidade': 'required',
			'cpf': 'required',
			'data_nascimento': 'required',
			'sexo': 'required',
			'nome_mae': {
				'required': true,
				'maxlength': 100
			},
			'pais_residencia': 'required',
			'cep': 'required',
			'endereco': {
				'required': true,
				'maxlength': 255
			},
			'ocupacao': 'required',
			'data_sintoma': 'required',
			'sintomas[]': 'required',
			'historico_viagem': 'required',
			'contato_suspeito': 'required',
			'contato_confirmado': 'required',
			'contato_animal': 'required',
			'historico_unidade_saude': 'required',
			'carrinho_sacola_roda': 'required',
			'convivencia_crianca': 'required',
			'animal_estimacao': 'required',
			'carro_particular': 'required',
			'garagem_residencial': 'required',
			'contato_idoso_gestante': 'required'
		},
		messages: {
			'nome': {
				'required': 'Identificação: Por favor, informe seu nome.',
				'maxlength': 'Identificação: Seu nome deve conter no máximo 100 caracteres.'
			},
			'nacionalidade': 'Identificação: Por favor, informe sua nacionalidade.',
			'cpf': 'Identificação: Por favor, informe seu cpf.',
			'data_nascimento': 'Identificação: Por favor, informe sua data de nascimento.',
			'sexo': 'Identificação: Por favor, informe seu sexo.',
			'nome_mae': {
				'required': 'Identificação: Por favor, informe o nome da sua mãe.',
				'maxlength': 'Identificação: O nome da sua mãe deve conter no máximo 100 caracteres.'
			},
			'pais_residencia': 'Identificação: Por favor, informe seu país de residência.',
			'cep': 'Identificação: Por favor, informe seu CEP.',
			'endereco': {
				'required': 'Identificação: Por favor, informe seu endereço.',
				'maxlength': 'Identificação: Seu endereço deve conter no máximo 255 caracteres.'
			},
			'ocupacao': 'Identificação: Por favor, informe sua ocupação.',
			'data_sintoma': 'Dados clínicos: Por favor, informe a data dos primeiros sintomas.',
			'sintomas[]': 'Dados clínicos: Por favor, informe os sintomas apresentados.',
			'historico_viagem': 'Dados de exposição e viagens: Por favor, informe sobre seu possível histórico de viagem.',
			'contato_suspeito': 'Dados de exposição e viagens: Por favor, informe sobre seu possível contato com casos suspeitos.',
			'contato_confirmado': 'Dados de exposição e viagens: Por favor, informe sobre seu possível contato com casos confirmados',
			'contato_animal': 'Dados de exposição e viagens: Por favor, informe sobre seu possível contato com animais.',
			'historico_unidade_saude': 'Dados de exposição e viagens: Por favor, informe se você esteve em alguma unidade de saúde.',
			'carrinho_sacola_roda': 'Dados de exposição e viagens: Por favor, informe se você faz uso de carrinho de feira ou sacola com rodinhas.',
			'convivencia_crianca': 'Dados de exposição e viagens: Por favor, informe se você mora ou recebe visita de criança de até 2 (dois) anos.',
			'animal_estimacao': 'Dados de exposição e viagens: Por favor, informe se você convive com algum animal de estimação que passeia nas ruas.',
			'carro_particular': 'Dados de exposição e viagens: Por favor, informe se você utiliza carro particular.',
			'garagem_residencial': 'Dados de exposição e viagens: Por favor, informe se você estaciona seu carro na garagem de sua residencia.',
			'contato_idoso_gestante': 'Dados de exposição e viagens: Por favor, informe se você convive ou manteve contato com idosos ou gestantes?.'
		},
		errorContainer: error_container,
		errorLabelContainer: $('ul', error_container),
		wrapper: 'li',
		errorClass: 'invalid',
		validClass: 'valid',
		focusInvalid: false,
		highlight: function(element, errorClass, validClass) {
			if (element.tagName === 'SELECT')
				$(element).closest('.select-wrapper').removeClass(validClass).addClass(errorClass);
			else if (
				element.tagName == 'INPUT' &&
				($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox')
			)
				$('span[for="' + element.name + '"]').removeClass(validClass).addClass(errorClass);

			$(element).removeClass(validClass).addClass(errorClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.tagName === 'SELECT')
				$(element).closest('.select-wrapper').removeClass(errorClass).addClass(validClass);
			else if (
				element.tagName == 'INPUT' &&
				($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox')
			)
				$('span[for="' + element.name + '"]').removeClass(errorClass).addClass(validClass);

			$(element).removeClass(errorClass).addClass(validClass);
		},
		invalidHandler: function(form, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) $('html, body').animate({ scrollTop: 0 }, 'fast');
        },
        submitHandler: function(form) {
        	var icon = null, title_color = null, message = null;
        	switch(analyze_data()) {
        		case 'suspeito-covid':
        			icon = 'warning';
        			title_color = 'orange';
        			message = 'Com base nos dados fornecidos, há suspeita de COVID-19 (coronavírus), dirija-se ao hospital.';
        			break;
    			case 'sindrome-gripal':
    				icon = 'warning';
    				title_color = 'orange';
    				message = 'Com base nos dados fornecidos, há suspeita de síndrome gripal, mas não há necessidade de ir ao hospital. Caso haja evolução dirija-se ao hospital.';
        			break;
    			default:
    				icon = 'check';
    				title_color = 'green';
    				message = 'Com base nos dados fornecidos, não há necessidade de ir ao hospital. Continue seguindo as instruções do ministério da saúde.';
    				break;
        	}
        	
			var icon_element = '<i class="material-icons medium">' + icon + '</i>';
			var title = 'Olá ' + $('#nome_input').val() + ',';
            var title_element = '<h5 class="valign-wrapper" style="color: ' + title_color +'">' + icon_element + ' ' + title + '</h5>';
            var message_element = '<p>' + message + '</p>';
            var back_element = '<p class="center"><a href="index.html">Voltar ao formulário</a></p>';

            $('#main-content').html('<br /><div class="card-panel z-depth-3">' + title_element + message_element + back_element + '</div>');
        	$('html, body').animate({ scrollTop: 0 }, 'fast');
        }
	});
}

/*
	analyze_data
	@desc Classificação dos sintomas informados com base em dados oficiais.

	COVID-19 (suspeito):
		1. Febre + Tosse + Cefaleia (dor de cabeça) + Dor no corpo + Dor de garganta + Dificuldade de respirar
		2. <12 anos +  Febre + Tosse + Nariz escorrendo + Nariz entupido + Dificuldade de respirar
	Síndrome gripal:
		1. Febre + Tosse + Cefaleia (dor de cabeça) + Dor no corpo + Dor de garganta
		2. <2 anos + Febre + Tosse + Nariz escorrendo + Nariz entupido
*/
function analyze_data() {
	var result = 'normal';

	var data = [];
	$.each($('input[name="sintomas[]"]:checked'), function() { data.push($(this).val()); });

	var age = calculate_age();

   	if (
   		(
   			data.indexOf('Febre') !== -1 &&
   			data.indexOf('Tosse') !== -1 &&
   			data.indexOf('Cefaleia (dor de cabeça)') !== -1 &&
   			data.indexOf('Dor no corpo') !== -1 &&
   			data.indexOf('Dor de garganta') !== -1 &&
   			data.indexOf('Dificuldade de respirar') !== -1
		)
		||
   		(
   			age < 12 &&
   			data.indexOf('Febre') !== -1 &&
   			data.indexOf('Tosse') !== -1 &&
   			data.indexOf('Nariz escorrendo') !== -1 &&
   			data.indexOf('Nariz entupido') !== -1 &&
   			data.indexOf('Dificuldade de respirar') !== -1
   		)
	) {
   		result = 'suspeito-covid';
	} else if (
		(
			data.indexOf('Febre') !== -1 &&
   			data.indexOf('Tosse') !== -1 &&
   			data.indexOf('Cefaleia (dor de cabeça)') !== -1 &&
   			data.indexOf('Dor no corpo') !== -1 &&
   			data.indexOf('Dor de garganta') !== -1
		)
		||
		(
   			age < 2 &&
   			data.indexOf('Febre') !== -1 &&
   			data.indexOf('Tosse') !== -1 &&
   			data.indexOf('Nariz escorrendo') !== -1 &&
   			data.indexOf('Nariz entupido') !== -1
   		)
	) {
   		result = 'sindrome-gripal';
    }

    return result;
}

/*
	calculate_age
	@desc Calcular idade do usuário com base no campo de data de nascimento.
*/
function calculate_age() {
	var datepicker = $('#data_nascimento_dp').val();
	var birthdate = datepicker.split('/');

	// Current date
	var date = new Date;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var result = year - birthdate[2];
	if (
		month < parseInt(birthdate[1]) || 
		(month == parseInt(birthdate[1]) && day < parseInt(birthdate[0]))
	)
		result--;

    return result < 0 ? 0 : result;
}