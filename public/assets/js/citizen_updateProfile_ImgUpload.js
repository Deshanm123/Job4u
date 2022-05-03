// const { JsonWebTokenError } = require("jsonwebtoken");


const citizenImageUploadForm = document.getElementById('profile-imgUpload-form');

const bioDescriptionInput = document.getElementById('bio-description-input');
const avatarInput = document.getElementById('avatar');
// const profileImg = document.getElementById('profile-img');


// // alert 
// const messageAlert = document.getElementById('message-alert')




// Event listeners
citizenImageUploadForm.addEventListener('submit', function (e) {
  e.preventDefault();


  // representing formdata
  let formData = new FormData();
  let bioDescription = bioDescriptionInput.value;
  // // get the file  friom input

  formData.append('avatar', avatarInput.files[0]);
  formData.append('bioDescription', bioDescription);



  $.ajax({
    type: "POST",
    url: "/citizen/myProfile/profileImage",
    contentType: "application/json",
    data: formData,
    processData: false,
    contentType: false,
    success: (data) => {
      alert("sucess")
      console.log(data.bio.fileName)
      const div = document.createElement('div');
      div.addClass("card-body", "p-5")
      div.innerHTML =
        ` 
        <div class="container">
          <h2 class="text-uppercase text-center mb-5">My bio</h2>
          <div class="row">
            <div class="col-md-4 col-sm-6">
              <img src="/public/${data.bio.fileName}"
                id="profile-img" alt="Generic placeholder image" class="img-fluid"
                style="width: 180px; border-radius: 10px;">
            </div>
            <div class="col-md-8 col-sm-6">
              <div class="form-outline mb-4">

                <p id="bio-display">
                ${data.bioDescription}
                 
                </p>

              </div>
            </div>
          </div>
        </div>;
      `



















      //   $('#message-alert').html('');

      //   const alertElement =
      //     ` <div class=" alert alert-${data.msgType} alert-dismissible fade show py-3 text-center" role="alert"
      //         id="alert-role" >
      //         <strong id="message-area">${data.msg} </strong>
      //         <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      //           <span aria-hidden="true">&times;</span>
      //         </button>
      //       </div>;
      //      `;
      //   $('#message-alert').html(alertElement);
      //   $('#message-alert').show();
      //   // window.scrollTo({ top: 0, behavior: 'smooth' });
      //   profileImg.src = `public/${data.file}`
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
      // window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  });

});

