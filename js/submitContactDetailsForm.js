function submitContactDetailsForm (value) {
  //console.log(value);
  $("#contact-details").html('<i class="fa fa-refresh fa-spin"></i> Loading');
  $.ajax({
      url: "https://meghprkh-meghprkh.rhcloud.com/projects/get_contact_details/",
      type: "POST",
      data: {
          "g-recaptcha-response": value
      },
      dataType: "json",
      cache: false,
      success: function(data) {
        $("#contact-details").html("<a href='mailto:" +
                      data.email +
                      "' target='_blank'><i class='fa fa-envelope'></i> " +
                      data.email +
                      "</a><br /> <br />" +
                      "<i class='fa fa-phone'></i> " + data.phone )
      },
      error: function() {
        alert("Unexpected error occured. Try refreshing the page");
      }
    });
}
