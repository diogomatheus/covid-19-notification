// jQuery Validate
var validator = null;
$(document).ready(function() {
	config_form();
});

/*
	config_form
	@desc Config form formatter, dependence and validation.
*/
function config_form() {
    config_field_formatter();
	config_field_dependence();
	config_form_validation();
}

/*
	config_field_formatter
	@desc Config fields formatter with Cleave.js.
*/
function config_field_formatter() {
	new Cleave('#telefone_input', { phone: true, phoneRegionCode: 'BR' });
    new Cleave('#cpf_input', { numericOnly: true, delimiters: ['.', '.', '-'], blocks: [3, 3, 3, 2] });
    new Cleave('#cep_input', { numericOnly: true, delimiters: ['-'], blocks: [5, 3] });
    new Cleave('#data_nascimento_input', { numericOnly: true, delimiters: ['/', '/', '/'], blocks: [2, 2, 4] });
    new Cleave('#sus_input', { numericOnly: true, blocks: [15] });
    new Cleave('#siape_input', { numericOnly: true, blocks: [15] });
    new Cleave('#data_sintoma_input', { numericOnly: true, delimiters: ['/', '/', '/'], blocks: [2, 2, 4] });
    new Cleave('#internacao_dias_input', { numericOnly: true, blocks: [15] });
    new Cleave('#intubacao_dias_input', { numericOnly: true, blocks: [15] });
    new Cleave('#hemodialise_dias_input', { numericOnly: true, blocks: [15] });
    new Cleave('#isolamento_dias_input', { numericOnly: true, blocks: [15] });
}

/*
	config_field_dependence
	@desc Config fields dependence control.
*/
function config_field_dependence() {
	toggle_target_field('diagnostico_formal', 'Sim', 'diagnostico_unidade_input');
	toggle_target_field('historico_internacao', 'Sim', 'internacao_dias_input');
	toggle_target_field('historico_intubacao', 'Sim', 'intubacao_dias_input');
	toggle_target_field('historico_hemodialise', 'Sim', 'hemodialise_dias_input');
	toggle_target_field('necessidade_especifica', 'Sim', 'necessidade_descricao_input');
	toggle_target_field('isolamento_social', 'Sim', 'isolamento_dias_input');
	toggle_target_field('sintomas[]', 'Outros sintomas', 'outros_sintomas_input', true);
	toggle_file_field('exames_internacao[]');
	toggle_file_field('tipos_testagem[]');
}

/*
	config_form_validation
	@desc Config form validation with jQuery validate.
*/
function config_form_validation() {
	$.validator.setDefaults({ ignore: [] });
	validator = $('#covid-19-diagnosis-form').validate({
		rules: {
			// Identificação
			'nome': { 'required': true, 'maxlength': 100 },
			'email': { 'email': true, 'maxlength': 100 },
			'nacionalidade': 'required',
			'cpf': 'required',
			'data_nascimento': 'required',
			'sus': { 'digits': true },
			'siape': { 'digits': true },
			'sexo': 'required',
			'nome_mae': { 'required': true, 'maxlength': 100 },
			'telefone': 'required',
			'pais_residencia': 'required',
			'cep': 'required',
			'endereco': { 'required': true, 'maxlength': 255 },
			'ocupacao': { 'required': true, 'maxlength': 100 },
			'ocupacao_unidade': { 'maxlength': 100 },
			'raca': 'required',
			// Dados clínicos
			'data_sintoma': 'required',
			'gestacao_amamentacao': 'required',
			'sintomas[]': 'required',
			'outros_sintomas': {
				'required': function(element) {
					var symptoms = get_symptoms();
					return symptoms.includes('Outros sintomas');
				},
				'maxlength': 255
			},
			'doencas[]': 'required',
			// Dados de exposição e viagens
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
			// Atendimento especializado
			'diagnostico_formal': 'required',
			'diagnostico_unidade': { 'maxlength': 100 },
			'historico_internacao': 'required',
			'internacao_dias': { 'digits': true },
			'anexo_raiox': { 'extension': 'jpeg|jpg|png|pdf' },
			'anexo_tomografia': { 'extension': 'jpeg|jpg|png|pdf' },
			'historico_intubacao': 'required',
			'intubacao_dias': { 'digits': true },
			'historico_hemodialise': 'required',
			'hemodialise_dias': { 'digits': true },
			'historico_testagem': 'required',
			'tipos_testagem[]': {
				'required': function(element) {
					return $('input[name="historico_testagem"]:checked').val() === 'Sim';
				}
			},
			'anexo_swab_pcr': { 'extension': 'jpeg|jpg|png|pdf' },
			'anexo_teste_rapido': { 'extension': 'jpeg|jpg|png|pdf' },
			'anexo_dosagem_igmigg': { 'extension': 'jpeg|jpg|png|pdf' },
			'necessidade_especifica': 'required',
			'necessidade_descricao': { 'maxlength': 255 },
			'isolamento_social': 'required',
			'isolamento_dias': { 'digits': true },
			'estado_atual': 'required'
		},
		messages: {
			// Identificação
			'nome': {
				'required': 'Identificação: Por favor, informe seu nome.',
				'maxlength': 'Identificação: Seu nome deve conter no máximo 100 caracteres.'
			},
			'email': {
				'email': 'Identificação: Por favor, informe um email válido.',
				'maxlength': 'Identificação: Seu email deve conter no máximo 100 caracteres.'
			},
			'nacionalidade': 'Identificação: Por favor, informe sua nacionalidade.',
			'cpf': 'Identificação: Por favor, informe seu cpf.',
			'data_nascimento': 'Identificação: Por favor, informe sua data de nascimento.',
			'sus': {
				'digits': 'Atendimento especializado: Por favor, use apenas dígitos ao informar o número do cartão SUS/CNS.'
			},
			'siape': {
				'digits': 'Atendimento especializado: Por favor, use apenas dígitos ao informar o SIAPE.'
			},
			'sexo': 'Identificação: Por favor, informe seu sexo.',
			'nome_mae': {
				'required': 'Identificação: Por favor, informe o nome da sua mãe.',
				'maxlength': 'Identificação: O nome da sua mãe deve conter no máximo 100 caracteres.'
			},
			'telefone': 'Identificação: Por favor, informe um telefone de contato.',
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
			'raca': 'Identificação: Por favor, informe sua raça.',
			// Dados clínicos
			'data_sintoma': 'Dados clínicos: Por favor, informe a data dos primeiros sintomas.',
			'gestacao_amamentacao': 'Dados clínicos: Por favor, informe se você está grávida ou amamentando.',
			'sintomas[]': 'Dados clínicos: Por favor, informe os sintomas apresentados.',
			'outros_sintomas': {
				'required': 'Dados clínicos: Por favor, informe quais são os outros sintomas apresentados.',
				'maxlength': 'Dados clínicos: Outros sintomas apresentados deve conter no máximo 255 caracteres.'
			},
			'doencas[]': 'Dados clínicos: Por favor, informe as doenças prévias existentes.',
			// Dados de exposição e viagens
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
			// Atendimento especializado
			'diagnostico_formal': 'Atendimento especializado: Por favor, informe se você já foi diagnosticado formalmente.',
			'diagnostico_unidade': {
				'maxlength': 'Atendimento especializado: Unidade de saúde do atendimento deve conter no máximo 100 caracteres.'
			},
			'historico_internacao': 'Atendimento especializado: Por favor, informe se vocẽ ficou internado.',
			'internacao_dias': {
				'digits': 'Atendimento especializado: Por favor, use apenas dígitos ao informar os dias de internação.'
			},
			'anexo_raiox': {
				'extension': 'Atendimento especializado: Extensão inválida (Raio X), selecione um documento válido (jpeg|jpg|png|pdf).'
			},
			'anexo_tomografia': {
				'extension': 'Atendimento especializado: Extensão inválida (Tomografia), selecione um documento válido (jpeg|jpg|png|pdf).'
			},
			'historico_intubacao': 'Atendimento especializado: Por favor, informe se vocẽ foi intubado.',
			'intubacao_dias': {
				'digits': 'Atendimento especializado: Por favor, use apenas dígitos ao informar os dias de intubação.'
			},
			'historico_hemodialise': 'Atendimento especializado: Por favor, informe se vocẽ fez hemodiálise.',
			'hemodialise_dias': {
				'digits': 'Atendimento especializado: Por favor, use apenas dígitos ao informar os dias de hemodiálise.'
			},
			'historico_testagem': 'Atendimento especializado: Por favor, informe se vocẽ fez alguma testagem para o novo coronavírus (COVID-19).',
			'tipos_testagem[]': 'Atendimento especializado: Por favor, informe qual teste para o novo coronavírus (COVID-19) você fez.',
			'anexo_swab_pcr': {
				'extension': 'Atendimento especializado: Extensão inválida (Teste Swab PCR), selecione um documento válido (jpeg|jpg|png|pdf).'
			},
			'anexo_teste_rapido': {
				'extension': 'Atendimento especializado: Extensão inválida (Teste rápido), selecione um documento válido (jpeg|jpg|png|pdf).'
			},
			'anexo_dosagem_igmigg': {
				'extension': 'Atendimento especializado: Extensão inválida (Dosagem IGM/IGG), selecione um documento válido (jpeg|jpg|png|pdf).'
			},
			'necessidade_especifica': 'Atendimento especializado: Por favor, informe se alguma necessidade específica foi identificada no seu atendimento.',
			'necessidade_descricao': {
				'maxlength': 'Atendimento especializado: A descrição das necessidades específicas deve conter no máximo 255 caracteres.'
			},
			'isolamento_social': 'Atendimento especializado: Por favor, informe se vocẽ está em isolamento/distânciamento social.',
			'isolamento_dias': {
				'digits': 'Atendimento especializado: Por favor, use apenas dígitos ao informar os dias de isolamento.'
			},
			'estado_atual': 'Atendimento especializado: Por favor, informe seu estado atual.'
		},
		errorContainer: $('#error-container'),
		errorLabelContainer: $('ul', $('#error-container')),
		wrapper: 'li',
		errorClass: 'invalid',
		validClass: 'valid',
		focusInvalid: false,
		highlight: function(element, errorClass, validClass) {
			if (
				element.tagName == 'INPUT' &&
				($(element).attr('type') == 'radio' || $(element).attr('type') == 'checkbox')
			)
				$('span[for="' + element.name + '"]').removeClass(validClass).addClass(errorClass);

			$(element).removeClass(validClass).addClass(errorClass);
		},
		unhighlight: function(element, errorClass, validClass) {
			if (
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
        	display_result();
        }
	});

	// Form checkbox force validation
	$('.validate-checkbox').on('change', function () {
		if(typeof validator !== 'undefined' && validator !== null) $(this).valid();
	});

	// Form reset configuration
	$('#covid-19-diagnosis-form-reset').on('click', function(e) {
		$('input').prop('value', '');
		$('input[type="checkbox"]:checked, input[type="radio"]:checked').prop('checked', false);
		if(typeof validator !== 'undefined' && validator !== null)
			validator.destroy();

		config_form_validation();
	});
}

/*
	display_result
	@desc Display the analysis result.
*/
function display_result() {
	var icon_label = null, title_color = null, message = null;
	var birthdate = $('#data_nascimento_input').val();
	var symptoms = get_symptoms();
	switch(analyze_data(symptoms, birthdate)) {
		case 'SG':
			icon_label = 'warning';
			title_color = 'orange';
			message = 'Com base nos dados fornecidos, existe uma suspeita de COVID-19 (coronavírus) relacionada com os sintomas de Síndorme Gripal (SG). Considere realizar uma consulta no hospital mais próximo, principalmente, em caso de evolução dos sintomas.';
			break;
		case 'SRAG':
			icon_label = 'warning';
			title_color = 'orange';
			message = 'Com base nos dados fornecidos, existe uma suspeita de COVID-19 (coronavírus) relacionada com os sintomas de Síndrome Respiratória Aguda Grave (SRAG). Por favor, dirija-se ao hospital mais próximo.';
			break;
		default:
			icon_label = 'check';
			title_color = 'green';
			message = 'Com base nos dados fornecidos, não há suspeita de de COVID-19 (coronavírus). Continue seguindo as instruções do ministério da saúde.';
			break;
	}
	
	var username = $('#nome_input').val();
	var icon_element = $('<i class="material-icons medium"></i>').text(icon_label);
	var title_element = $('<h5 class="valign-wrapper"></h5>')
	title_element.css('color', title_color);
	title_element.append(icon_element)
				 .append(' Olá ' + username);

    var message_element = $('<p></p>').text(message);
    var back_element = $('<p class="center"><a href="index.html">Voltar ao formulário</a></p>');

    var content = $('<div class="card-panel z-depth-3"></div>');
    content.append(title_element)
    	   .append(message_element)
    	   .append(back_element);

	$('#main-content').html('<br />').append(content);
	$('html, body').animate({ scrollTop: 0 }, 'fast');
}

/*
	toggle_target_field
	@desc Toggle target input based on expected source value.
*/
function toggle_target_field(source, expected, target, isArray = false) {
	$('input[name="' + source + '"]').on('change', function () {
		var disable_element = null;
		if (isArray) {
			var values = [];
			$.each($('input[name="' + source + '"]:checked'), function() { values.push($(this).val()); });
			disable_element = !values.includes(expected);
		} else {
			disable_element = !($(this).val() === expected);
		}

		var target_element = $('#' + target);
		if (disable_element) {
			if(!target_element.attr('disabled')) {
				target_element.val('');
				target_element.attr('disabled', 'disabled');
			}
		} else {
			target_element.removeAttr('disabled');
		}
	});
}

/*
	toggle_file_field
	@desc Toggle file input based on source options.
*/
function toggle_file_field(source) {
	$('input[name="' + source + '"]').on('change', function () {
		var exam_types = {
			'Raio X': 'anexo_raiox',
			'Tomografia': 'anexo_tomografia',
			'Teste Swab PCR': 'anexo_swab_pcr',
			'Teste rápido': 'anexo_teste_rapido',
			'Dosagem IGM/IGG': 'anexo_dosagem_igmigg'
		}

		$.each($('input[name="' + source + '"]'), function() {
			var id = exam_types[$(this).val()];
			var container = $('#' + id + '_container');
			if (!$(this).prop('checked')) {
				if(container.css('display') !== 'none') {
					container.hide();
					$('#' + id).val(null);
					$('#' + id + '_text').val(null);
				}
			} else {
				container.show();
			}
		});
	});
}

/*
	get_symptoms
	@desc Get the checked symptoms.
*/
function get_symptoms() {
	var symptoms = [];
	$.each($('input[name="sintomas[]"]:checked'), function() { symptoms.push($(this).val()); });
	return symptoms;
}