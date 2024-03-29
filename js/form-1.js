const query_form_el = $("#query_form");
const thank_you_el = $("#thank_you_section");

window.form_answers = [];
window.form_data = [];

/**
 * Show the Next Step
 *
 * @param event
 * @param answer
 */
function nextStep(event, answer)
{
    const current_step = $(event.currentTarget).closest('fieldset');
    const next_step = current_step.next();

    if( answer ){

        form_answers.push(answer);

    }

    current_step.slideUp(500, function(){
        next_step.slideDown(500);
    });

}

/**
 * Perform the Form Submit Action
 */
$("#submit_form").click(function (e) {
    e.preventDefault();

    const nameInput = $('input[name=name]');
    const emailInput = $('input[name=email]');
    const phoneInput = $('input[name=phone]');

    let name = nameInput.val();
    let email = emailInput.val();
    let phone = phoneInput.val();

    form_data['name'] = name;
    form_data['email'] = email;
    form_data['phone'] = phone;
    form_data['answers'] = form_answers;

    let validation_pass = false;

    if(_.isEmpty(name)){
        addError(nameInput, "Please enter your name.");
        validation_pass = false;
    }else{
        clearError(nameInput);
        validation_pass = true;
    }

    if(_.isEmpty(email)){
        addError(emailInput, "Please enter your email.");
        validation_pass = false;
    }else if(!validEmail(email)){
        addError(emailInput, "Please enter a valid email.");
        validation_pass = false;
    }else{
        clearError(emailInput);
        validation_pass = true;
    }

    if(_.isEmpty(phone)){
        addError(phoneInput, "Please enter a your phone number.");
        validation_pass = false;
    }else if( ! validPhone(phone) ){
        addError(phoneInput, "Please enter a valid phone number.");
        validation_pass = false;
    }else{
        clearError(phoneInput);
        validation_pass = true;
    }

    if( ! validation_pass ){ return false; }

    console.log(form_data);

    query_form_el.toggleClass('hidden');
    thank_you_el.toggleClass('hidden');

    clearFormData();

});

/**
 * Clear Form Data
 */
function clearFormData() {
    window.form_data = [];
    window.form_answers = [];
}

/**
 * Check the given input is a valid email
 *
 * @param input
 * @returns {boolean}
 */
function validEmail(input) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(input);
}

/**
 * Check the Given Input is a valid mobile number
 *
 * @param input
 * @returns {boolean}
 */
function validPhone(input)
{
    var phone_number = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;

    return (input.match(phone_number) ? true : false);
}

/**
 * Clear the errors from the form inputs
 *
 * @param input
 */
function clearError(input) {
    let form_group = input.closest('.form-group');
    let help_block = form_group.find('.help-block');

    if(form_group.hasClass('has-error')){
        form_group.removeClass('has-error');
        help_block.empty();
    }
}

/**
 * Add a new Error for a form input
 *
 * @param input
 * @param error
 */
function addError(input, error) {
    let form_group = input.closest('.form-group');
    form_group.addClass('has-error');
    form_group.find('.help-block').html(error);
}