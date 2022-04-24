const uploadCVForm = document.getElementById('cv-document-upload-form');
const cvInput = document.getElementById('cv-input');



uploadCVForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // representing formdata
  let formData = new FormData();
  // get the file  friom input
  let cvDocument = cvInput.files[0];
  formData.append('cv', cvDocument)
  console.log(cvDocument)


  $.ajax({
    type: "POST",
    url: "/citizen/nid/cv",
    contentType: "multipart/form-data",
    data: formData, //donot stringify the formdat
    contentType: false,
    processData: false,
      success: (data) => {
        console.log(data);
        $('#message-alert').html('');
        const alertElement =
          ` <div class=" alert alert-${data.msgType} alert-dismissible fade show py-3 text-center" role="alert"
                id="alert-role" >
                <strong id="message-area">${data.msg}a></strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>;
             `;
        $('#message-alert').html(alertElement);
        $('#message-alert').show();
      },
      error: (xhr) => {
        let data = xhr.responseJSON;
        $('#message-alert').html('');
        const alertElement =
          ` <div class=" alert alert-${data.msgType} alert-dismissible fade show py-3 text-center" role="alert"
                id="alert-role" >
                <strong id="message-area">${xhr.status}:${data.msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>;
            `;
        $('#message-alert').html(alertElement);
        $('#message-alert').show();
      }

  })
})



