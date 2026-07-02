const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const responseDiv = document.getElementById("responseMessage");

// 메뉴 토글
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// 폼 제출
if (contactForm && responseDiv) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const message = document.getElementById("visitorMessage").value.trim();

    // 기본 메시지
    responseDiv.style.display = "block";
    responseDiv.style.color = "#2563eb";
    responseDiv.innerText = "메시지를 전송 중입니다... 잠시만 기다려주세요.";

    // 👉 여기에 Make 웹훅 URL 넣기
    const makeWebhookUrl = "https://hook.us1.make.com/여기에_진짜_웹훅_ID";

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
          sent_at: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error("Webhook request failed");
      }

      responseDiv.style.color = "#15803d";
      responseDiv.innerText = "메시지가 성공적으로 전송되었습니다! 곧 답변을 받게 됩니다.";

      contactForm.reset();

    } catch (error) {
      console.error(error);

      responseDiv.style.color = "#dc2626";
      responseDiv.innerText = "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    }
  });
}
