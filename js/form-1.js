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

    current_step.toggleClass('active');
    next_step.toggleClass('active');

}

$("#submit_form").click(function (e) {
    e.preventDefault();

    const name = $('input[name=name]').val();
    const email = $('input[name=email]').val();
    const phone = $('input[name=phone]').val();

    form_data['name'] = name;
    form_data['email'] = email;
    form_data['phone'] = phone;
    form_data['answers'] = form_answers;

    console.log(form_data);

    query_form_el.toggleClass('hidden');
    thank_you_el.toggleClass('hidden')

});