const CONTACT_DETAILS_URL = "https://meghprkh.vercel.app/api/";

// deno-lint-ignore no-unused-vars
async function getContactDetails(value) {
  const captcha_form = document.getElementById("captcha-form");
  const loading_indicator = document.getElementById("contact-details-loading");
  const details = document.getElementById("contact-details");
  captcha_form.setAttribute("hidden", "");
  loading_indicator.removeAttribute("hidden");
  let res = await fetch(CONTACT_DETAILS_URL, {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: `g-recaptcha-response=${encodeURIComponent(value)}`,
  });
  loading_indicator.setAttribute("hidden", "");
  if (!res.ok) {
    details.innerHTML = `<b style="color: accented"> Unexpected error : ${await res.text()} </b>`;
    details.removeAttribute("hidden");
    return;
  }
  res = await res.json();
  details.querySelector("#email").href = `mailto:${res.email}`;
  details.querySelector("#email").innerHTML = res.email;
  details.querySelector("#phone").href = `tel:${res.phone}`;
  details.querySelector("#phone").innerHTML = res.phone;
  details.querySelector("#telegram").href = `https://t.me/${res.telegram}`;
  details.querySelector("#telegram").innerHTML = `@${res.telegram}`;
  details.querySelector("#matrix").href = `https://matrix.to/#/${res.matrix}`;
  details.querySelector("#matrix").innerHTML = res.matrix;
  details.removeAttribute("hidden");
}
