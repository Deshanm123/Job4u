const uploadBirthDayForm = document.getElementById('birthday-document-upload-form');
const birthCertificateInput = document.getElementById('birthCertificate');


uploadBirthDayForm.addEventListener('submit',  (e) => {
  e.preventDefault();

  // representing formdata
  let formData = new FormData();
  // get the file  friom input
  let birthCertificate = birthCertificateInput.files[0];

  formData.append('birthCertificate', birthCertificate)

  $.ajax({
    type: "POST",
    url: "/citizen/nid/birthCertificate",
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
                <strong id="message-area">${data.msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>;
             `;
      $('#message-alert').html(alertElement);
      $('#message-alert').show();
    }
  //   error: (xhr) => {
  //     let data = xhr.responseJSON;
  //     $('#message-alert').html('');
  //     const alertElement =
  //       ` <div class=" alert alert-${data.msgType} alert-dismissible fade show py-3 text-center" role="alert"
  //               id="alert-role" >
  //               <strong id="message-area">${xhr.status}:${data.msg}</strong>
  //               <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  //                 <span aria-hidden="true">&times;</span>
  //               </button>
  //             </div>;
  //           `;
  //     $('#message-alert').html(alertElement);
  //     $('#message-alert').show();
  //   }

  })
})



