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

	$('input[name="diagnostico_formal"]').on('change', function () {
		var value = $(this).val();
		if (value === 'Sim') {
			$('#diagnostico_unidade_input').removeAttr('disabled');
		} else {
			$('#diagnostico_unidade_input').val('');
			$('#diagnostico_unidade_input').attr('disabled', 'disabled');
		}
	});
	$('input[name="isolamento_social"]').on('change', function () {
		var value = $(this).val();
		if (value === 'Sim') {
			$('#isolamento_dias_input').removeAttr('disabled');
		} else {
			$('#isolamento_dias_input').val('');
			$('#isolamento_dias_input').attr('disabled', 'disabled');
		}
	});
	$('input[name="teste_laboratorial"]').on('change', function () {
		var value = $(this).val();
		if (value === 'Sim') {
			$('.file-disabling-class').removeClass('disabled');
			$('.file-disabling-attr').removeAttr('disabled');
		} else {
			$('.file-disabling-class').addClass('disabled');
			$('.file-disabling-attr').val('');
			$('.file-disabling-attr').attr('disabled', 'disabled');
		}
	});

    // Form formatter configuration
    new Cleave('#cpf_input', { numericOnly: true, delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2] });
    new Cleave('#sus_input', { numericOnly: true, blocks: [15] });
    new Cleave('#siape_input', { numericOnly: true, blocks: [15] });
    new Cleave('#data_sintoma_dp', { numericOnly: true, delimiters: ['/', '/', '/'], blocks: [2, 2, 4] });
    new Cleave('#data_nascimento_dp', { numericOnly: true, delimiters: ['/', '/', '/'], blocks: [2, 2, 4] });
    new Cleave('#cep_input', { numericOnly: true, delimiters: ['-'], blocks: [5, 3] });
    new Cleave('#telefone_input', { phone: true, phoneRegionCode: 'BR' });
    new Cleave('#isolamento_dias_input', { numericOnly: true, blocks: [15] });

	// Form validation configuration
	init_form_validation();

	// Form reset configuration
	$('#covid-19-diagnosis-form-reset').on('click', function(e) {
		// Reset inputs
		$('input').prop('value', '');

		// Reset materializecss selects
		$('select').val('');
		$('select').prop('selectedIndex', 0);
    	$('select').formSelect();

    	// Reset materializecss checkboxs and radios
    	$('input[type="checkbox"]:checked, input[type="radio"]:checked').prop('checked', false);

    	// Reset the jquery validate
		if(typeof validator !== 'undefined' && validator !== null)
			validator.destroy();			

		init_form_validation();
	});

});

/*
	init_form_validation
	@desc Config form validation with jQuery validate.
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
			'email': {
				'email': true
			},
			'nacionalidade': 'required',
			'cpf': 'required',
			'data_nascimento': 'required',
			'sus': {
				'digits': true
			},
			'siape': {
				'digits': true
			},
			'sexo': 'required',
			'telefone': 'required',
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
			'ocupacao': {
				'required': true,
				'maxlength': 100
			},
			'ocupacao_unidade': {
				'maxlength': 100
			},			
			'data_sintoma': 'required',
			'gestante_amamentando': 'required',
			'sintomas[]': 'required',
			'trabalhando_atualmente': 'required',
			'linha_frente': 'required',
			'forma_trabalho': 'required',
			'viagem_recente': 'required',
			'quantidade_moradores': 'required',
			'proximidade_idoso_gestante': 'required',
			'proximidade_crianca': 'required',
			'proximidade_caso_suspeito': 'required',
			'proximidade_caso_confirmado': 'required',
			'convive_animal_externo': 'required',
			'proximidade_animais': 'required',
			'carrinho_feira': 'required',
			'carro_particular': 'required',
			'estacionamento_publico_coletivo': 'required',
			'diagnostico_formal': 'required',
			'diagnostico_unidade': {
				'maxlength': 100
			},
			'isolamento_social': 'required',
			'isolamento_dias': {
				'digits': true
			},
			'teste_laboratorial': 'required',
      		'teste_laboratorial_arquivo': {
				'extension': 'jpeg|jpg|png|pdf'
			}
		},
		messages: {
			'nome': {
				'required': 'Identificação: Por favor, informe seu nome.',
				'maxlength': 'Identificação: Seu nome deve conter no máximo 100 caracteres.'
			},
			'email': {
				'email': 'Identificação: Por favor, informe um email válido.'
			},
			'nacionalidade': 'Identificação: Por favor, informe sua nacionalidade.',
			'cpf': 'Identificação: Por favor, informe seu cpf.',
			'data_nascimento': 'Identificação: Por favor, informe sua data de nascimento.',
			'sus': {
				'digits': 'Atendimento especializado: Por favor, informe apenas dígitos ao informar o número do cartão SUS/CNS.'
			},
			'siape': {
				'digits': 'Atendimento especializado: Por favor, informe apenas dígitos ao informar o SIAPE.'
			},
			'sexo': 'Identificação: Por favor, informe seu sexo.',
			'telefone': 'Identificação: Por favor, informe um telefone de contato.',
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
			'ocupacao': {
				'required': 'Identificação: Por favor, informe sua ocupação/cargo.',
				'maxlength': 'Identificação: Sua ocupação/cargo deve conter no máximo 100 caracteres.'
			},
			'ocupacao_unidade': {
				'maxlength': 'Identificação: Sua unidade/departamento deve conter no máximo 100 caracteres.'
			},	
			'data_sintoma': 'Dados clínicos: Por favor, informe a data dos primeiros sintomas.',
			'gestante_amamentando': 'Dados clínicos: Por favor, informe se você está grávida ou amamentando.',
			'sintomas[]': 'Dados clínicos: Por favor, informe os sintomas apresentados.',
			'trabalhando_atualmente': 'Dados de exposição e viagens: Por favor, informe se você está trabalhando atualmente.',
			'linha_frente': 'Dados de exposição e viagens: Por favor, informe se você trabalha na linha de frente.',
			'forma_trabalho': 'Dados de exposição e viagens: Por favor, informe de que forma você está realizando suas funções de trabalho.',
			'viagem_recente': 'Dados de exposição e viagens: Por favor, informe sobre seu possível histórico de viagem.',
			'quantidade_moradores': 'Dados de exposição e viagens: Por favor, informe quantas pessoas moram na sua residência.',
			'proximidade_idoso_gestante': 'Dados de exposição e viagens: Por favor, informe se você convive ou manteve contato com idosos ou gestantes.',
			'proximidade_crianca': 'Dados de exposição e viagens: Por favor, informe se você convive ou manteve contato com crianças.',
			'proximidade_caso_suspeito': 'Dados de exposição e viagens: Por favor, informe sobre seu possível contato com casos suspeitos.',
			'proximidade_caso_confirmado': 'Dados de exposição e viagens: Por favor, informe sobre seu possível contato com casos confirmados.',
			'convive_animal_externo': 'Dados de exposição e viagens: Por favor, informe sobre seu possível convivio com animal de estimação que passeia na rua.',
			'proximidade_animais': 'Dados de exposição e viagens: Por favor, informe sobre seu possível contato com animais em áreas afetadas.',
			'carrinho_feira': 'Dados de exposição e viagens: Por favor, informe se você faz uso de carrinho de feira ou sacola com rodinhas.',
			'carro_particular': 'Dados de exposição e viagens: Por favor, informe se você utiliza carro particular.',
			'estacionamento_publico_coletivo': 'Dados de exposição e viagens: Por favor, informe se você utiliza estacionamento público ou coletivo.',
			'diagnostico_formal': 'Atendimento especializado: Por favor, informe se você já foi diagnosticado formalmente.',
			'diagnostico_unidade': {
				'maxlength': 'Atendimento especializado: Unidade de saúde do atendimento deve conter no máximo 100 caracteres.'
			},
			'isolamento_social': 'Atendimento especializado: Por favor, informe se vocẽ está em isolamento/distânciamento social.',
			'isolamento_dias': {
				'digits': 'Atendimento especializado: Por favor, informe apenas dígitos ao informar os dias de isolamento.'
			},
			'teste_laboratorial': 'Atendimento especializado: Por favor, informe se você realizou teste laboratorial.',
      		'teste_laboratorial_arquivo': {
				'extension': 'Atendimento especializado: Extensão do exame digitalizado inválida, selecione um documento válido (jpeg|jpg|png|pdf).'
			}
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
        		case 'SG':
        			icon = 'warning';
        			title_color = 'orange';
        			message = 'Com base nos dados fornecidos, existe uma suspeita de COVID-19 (coronavírus) relacionada com os sintomas de Síndorme Gripal (SG). Considere realizar uma consulta no hospital mais próximo, principalmente, em caso de evolução dos sintomas.';
        			break;
    			case 'SRAG':
    				icon = 'warning';
    				title_color = 'orange';
    				message = 'Com base nos dados fornecidos, existe uma suspeita de COVID-19 (coronavírus) relacionada com os sintomas de Síndrome Respiratória Aguda Grave (SRAG). Por favor, dirija-se ao hospital mais próximo.';
        			break;
    			default:
    				icon = 'check';
    				title_color = 'green';
    				message = 'Com base nos dados fornecidos, não há suspeita de de COVID-19 (coronavírus). Continue seguindo as instruções do ministério da saúde.';
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
	@desc Analyze data and classify based on official guidelines.
	https://portalarquivos.saude.gov.br/images/pdf/2020/April/18/Diretrizes-Covid19.pdf
*/
function analyze_data() {
	var symptoms = [];
	$.each($('input[name="sintomas[]"]:checked'), function() { symptoms.push($(this).val()); });

	var isSG_result = isSG(symptoms);
	var isSRAG_result = isSRAG(isSG, symptoms);

	if (isSRAG_result)
		return 'SRAG';
	else if (isSG_result)
		return 'SG';
	else
		return 'Normal';
}

/*
	isSG
	@desc Compare data with isSRAG symptoms.
*/
function isSG(symptoms) {
	var age = getUserAge();
	if (
		(
			// DEFAULT
			(age > 12 && age < 60) && 
			symptoms.indexOf('Febre') !== -1 && 
			(
				symptoms.indexOf('Tosse') !== -1 || 
				symptoms.indexOf('Dor de garganta') !== -1 || 
				symptoms.indexOf('Nariz escorrendo') !== -1 || 
				symptoms.indexOf('Dificuldade de respirar') !== -1
			)
		) ||
		(
			// KIDS
			age <= 12 && 
			symptoms.indexOf('Febre') && 
			(
				symptoms.indexOf('Tosse') !== -1 || 
				symptoms.indexOf('Dor de garganta') !== -1 || 
				symptoms.indexOf('Nariz escorrendo') !== -1 || 
				symptoms.indexOf('Dificuldade de respirar') !== -1 ||
				symptoms.indexOf('Nariz entupido') !== -1
			)
		) ||
		(
			// SENIORS
			age >= 60 &&
			(
				symptoms.indexOf('Febre') !== -1 || 
				symptoms.indexOf('Tosse') !== -1 || 
				symptoms.indexOf('Dor de garganta') !== -1 || 
				symptoms.indexOf('Nariz escorrendo') !== -1 || 
				symptoms.indexOf('Dificuldade de respirar') !== -1 ||
				symptoms.indexOf('Desmaio ou perda temporária de consciência') !== -1 || 
				symptoms.indexOf('Irritabilidade/confusão mental') !== -1 || 
				symptoms.indexOf('Sonolência excessiva') !== -1 || 
				symptoms.indexOf('Falta de apetite') !== -1
			)
		)
	)
		return true;

	return false;
}

/*
	isSRAG
	@desc Compare data with isSRAG symptoms.
*/
function isSRAG(isSG, symptoms) {
	if(isSG) {
		var age = getUserAge();
		if (
			(
				// DEFAULT
				age > 12 && 
				(
					symptoms.indexOf('Cansaço respiratório') !== -1 || 
					symptoms.indexOf('Pressão persistente no tórax') !== -1 || 
					symptoms.indexOf('Saturação de O2 menor que 95% em ar ambiente') !== -1 || 
					symptoms.indexOf('Coloração azulada dos lábios ou rosto') !== -1
				)
			) ||
			(
				// KIDS
				age <= 12 && 
				(
					symptoms.indexOf('Cansaço respiratório') !== -1 || 
					symptoms.indexOf('Pressão persistente no tórax') !== -1 || 
					symptoms.indexOf('Saturação de O2 menor que 95% em ar ambiente') !== -1 || 
					symptoms.indexOf('Coloração azulada dos lábios ou rosto') !== -1 ||
					symptoms.indexOf('Dificuldade de respirar') !== -1 || 
					symptoms.indexOf('Coloração azulada/acinzentada da pele ou unhas') !== -1 || 
					symptoms.indexOf('Desidratação') !== -1 || 
					symptoms.indexOf('Falta de apetite') !== -1
				)
				
			)
		)
			return true;
	}

	return false;
}

/*
	getUserAge
	@desc Get user age based on his/her birthdate.
*/
function getUserAge() {
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