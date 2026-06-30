const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const responseDiv = document.getElementById("responseMessage");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

if (contactForm && responseDiv) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("visitorName").value;
    const email = document.getElementById("visitorEmail").value;
    const message = document.getElementById("visitorMessage").value;

    responseDiv.style.display = "block";
    responseDiv.style.color = "#2563eb";
    responseDiv.innerHTML = "AI &#50640;&#51060;&#51204;&#53944;&#44032; &#51656;&#47928;&#51012; &#48516;&#49437; &#51473;&#51077;&#45768;&#45796;... &#51104;&#49884;&#47564; &#44592;&#45796;&#47140;&#51452;&#49464;&#50836;.";

    const makeWebhookUrl = "https://hook.us1.make.com/your_unique_webhook_id";

    try {
      const response = await fetch(makeWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor_name: name,
          visitor_email: email,
          visitor_message: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      responseDiv.style.color = "#15803d";
      responseDiv.innerHTML = "&#51656;&#47928;&#51060; &#49457;&#44277;&#51201;&#51004;&#47196; &#51217;&#49688;&#46104;&#50632;&#49845;&#45768;&#45796;! &#51077;&#47141;&#54616;&#49888; &#47700;&#51068;&#47196; AI&#51032; &#45813;&#48320;&#51060; &#44263; &#48156;&#49569;&#46121;&#45768;&#45796;.";
      contactForm.reset();
    } catch (error) {
      responseDiv.style.color = "#dc2626";
      responseDiv.innerHTML = "&#51217;&#49688; &#51473; &#50724;&#47448;&#44032; &#48156;&#49373;&#54664;&#49845;&#45768;&#45796;. &#51104;&#49884; &#54980; &#45796;&#49884; &#49884;&#46020;&#54644;&#51452;&#49464;&#50836;.";
    }
  });
}
