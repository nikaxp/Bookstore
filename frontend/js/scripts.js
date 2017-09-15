$(function () {
<<<<<<< HEAD
     //showModal('to tylko test');
=======
    // showModal('to tylko test');
>>>>>>> origin/api_v2
});

function showModal(msg) {
    //set correct type of modal
    var modal = $('#modalWindow');
    var modalTitle = modal.find('.modal-title');
    var modalBody = modal.find('.modal-body');

    modalTitle.html('UWAGA');
    modalBody.html(msg);

    modal.modal('show');
}