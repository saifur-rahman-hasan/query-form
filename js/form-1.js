const query_form_el = $("#query_form");
const thank_you_el = $("#thank_you_section");

window.form_answers = [];
window.form_data = [];

function nextStep(event, answer)
{
    const current_step = $(event.currentTarget).closest('fieldset');
    const next_step = current_step.next();

    if( answer ){

        form_answers.push(answer);

    }

    current_step.toggleClass('active').toggleClass('fadeIn');
    next_step.toggleClass('active').toggleClass('fadeIn');

}

$("#submit_form").click(function (e) {
    e.preventDefault();

    const nameInput = $('input[name=name]');
    const emailInput = $('input[name=email]');
    const phoneInput = $('input[name=phone]');

    const name = nameInput.val();
    const email = emailInput.val();
    const phone = phoneInput.val();

    form_data['name'] = name;
    form_data['email'] = email;
    form_data['phone'] = phone;
    form_data['answers'] = form_answers;

    let validation_pass = false;

    if(!name){
        nameInput.closest('.form-group').addClass('has-error');
        nameInput.closest('.form-group').find('.help-block').html("Please write your name");
        validation_pass = false;
    }else{
        nameInput.closest('.form-group').hasClass('has-error').removeClass('has-error');
        nameInput.closest('.form-group').find('.help-block').html("");
        validation_pass = true;
    }

    if(!email){
        emailInput.closest('.form-group').addClass('has-error');
        emailInput.closest('.form-group').find('.help-block').html("Please enter your email.");
        validation_pass = false;
    }else{
        emailInput.closest('.form-group').hasClass('has-error').removeClass('has-error');
        emailInput.closest('.form-group').find('.help-block').html("");
        validation_pass = true;
    }

    if(!ValidateEmail(email)){
        emailInput.closest('.form-group').addClass('has-error');
        emailInput.closest('.form-group').find('.help-block').html("Please enter a valid email.");
        validation_pass = false;
    }else{
        emailInput.closest('.form-group').hasClass('has-error').removeClass('has-error');
        emailInput.closest('.form-group').find('.help-block').html("");
        validation_pass = true;
    }

    if(!phone){
        phoneInput.closest('.form-group').addClass('has-error');
        phoneInput.closest('.form-group').find('.help-block').html("Please enter your phone number.");
        validation_pass = false;
    }else{
        phoneInput.closest('.form-group').hasClass('has-error').removeClass('has-error');
        phoneInput.closest('.form-group').find('.help-block').html("");
        validation_pass = true;
    }

    if( ! validation_pass ){ return false; }

    console.log(form_data);

    query_form_el.toggleClass('hidden');
    thank_you_el.toggleClass('hidden');

    clearFormData();

});

function clearFormData() {
    window.form_data = [];
    window.form_answers = [];
}

function ValidateEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}