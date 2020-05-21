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
	toggle_input('diagnostico_formal', 'Sim', false, 'diagnostico_unidade_input');
	toggle_input('historico_internacao', 'Sim', false, 'internacao_dias_input');
	toggle_input('historico_intubacao', 'Sim', false, 'intubacao_dias_input');
	toggle_input('historico_hemodialise', 'Sim', false, 'hemodialise_dias_input');
	toggle_input('necessidade_especifica', 'Sim', false, 'necessidade_descricao_input');
	toggle_input('isolamento_social', 'Sim', false, 'isolamento_dias_input');
	toggle_input('sintomas[]', 'Outros sintomas', true, 'outros_sintomas_input');
	toggle_input('doencas[]', 'Outras doenças', true, 'outras_doencas_input');
	toggle_file_input('exames_internacao[]');
	toggle_file_input('tipos_testagem[]');
	toggle_visibility('historico_internacao', 'Sim', false, 'intubado_container', [
		{ type: 'radio', target: 'historico_intubacao' },
		{ type: 'input', target: 'intubacao_dias_input' }
	]);
	toggle_visibility('historico_internacao', 'Sim', false, 'hemodialise_container', [
		{ type: 'radio', target: 'historico_hemodialise' },
		{ type: 'input', target: 'hemodialise_dias_input' }
	]);
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
			'email': { 'required': true, 'email': true, 'maxlength': 100 },
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
					var symptoms = get_checkbox_values('sintomas[]');
					return symptoms.includes('Outros sintomas');
				},
				'maxlength': 255
			},
			'doencas[]': 'required',
			'outras_doencas': {
				'required': function(element) {
					var diseases = get_checkbox_values('doencas[]');
					return diseases.includes('Outras doenças');
				},
				'maxlength': 255
			},
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
			'historico_intubacao': {
				'required': function(element) {
					return $('input[name="historico_internacao"]:checked').val() === 'Sim';
				}
			},
			'intubacao_dias': { 'digits': true },
			'historico_hemodialise': {
				'required': function(element) {
					return $('input[name="historico_internacao"]:checked').val() === 'Sim';
				}
			},
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
				'required': 'Identificação: Por favor, informe seu email.',
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
			'outras_doencas': {
				'required': 'Dados clínicos: Por favor, informe quais são as outras doenças apresentadas.',
				'maxlength': 'Dados clínicos: Outras doenças apresentadas deve conter no máximo 255 caracteres.'
			},
			// Dados de exposição e viagens
			'trabalhando_atualmente': 'Dados de exposição e viagens: Por favor, informe se você está trabalhando/empregado atualmente.',
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
        	$('#loading').fadeIn('slow');
        	setTimeout(function () {
        		window.location.href = 'result.html';
		    }, 2000);
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
	toggle_visibility
	@desc Toggle target visibility based on expected source value.
*/
function toggle_visibility(source, expected, isArray, target, childs = null) {
	$('input[name="' + source + '"]').on('change', function () {
		var target_element = $('#' + target);
		if (!expectedValueAssertion(source, expected, isArray)) {
			target_element.hide();
			if (childs) {
				childs.forEach(function(child) {
					if (child.type === 'input')
						$('#' + child.target).prop('value', '');
					else
						$('input[name="' + child.target + '"]:checked').prop('checked', false);
				});
			}
		} else {
			target_element.show();
		}
	});
}

/*
	toggle_input
	@desc Toggle target input based on expected source value.
*/
function toggle_input(source, expected, isArray, target) {
	$('input[name="' + source + '"]').on('change', function () {
		var target_element = $('#' + target);
		if (!expectedValueAssertion(source, expected, isArray)) {
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
	toggle_file_input
	@desc Toggle file input based on source options.
*/
function toggle_file_input(source) {
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
	expectedValueAssertion
	@desc Check if the source expected value is assert.
*/
function expectedValueAssertion(source, expected, isArray = false) {
	if (isArray) {
		var values = [];
		$.each($('input[name="' + source + '"]:checked'), function() { values.push($(this).val()); });
		return values.includes(expected);
	} else {
		var value = $('input[name="' + source + '"]:checked').val();
		return (value === expected);
	}
}

/*
	get_checkbox_values(name)
	@desc Get the checkbox checked values.
*/
function get_checkbox_values(name) {
	var list = [];
	$.each($('input[name="' + name + '"]:checked'), function() { list.push($(this).val()); });
	return list;
}