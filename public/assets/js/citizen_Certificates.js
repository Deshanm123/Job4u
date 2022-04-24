const uploadCertificateForm = document.getElementById('certificate-upload-form');
const certificateInput = document.getElementById('certificates[]');



uploadCertificateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // representing formdata
  let formData = new FormData();
  let certificates = [];
  // let arr = [];
  const fileList = certificateInput.files;
  // for (const single_file of uploadedFiles) {
  //   formData.append('uploadedImages', single_file)
  // }
  // orking
  for (let i = 0; i < fileList.length; i++) {
    console.log("inside loop");
    // certificates.push(fileList[i]);
    formData.append('certificates', fileList[i]);
  }

  $.ajax({
    type: "POST",
    url: "/citizen/nid/certificates",
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



