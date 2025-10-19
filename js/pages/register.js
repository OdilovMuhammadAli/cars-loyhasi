const elForm = document.getElementById("form");

async function register(user) {
  try {
    const req = await fetch(
      "https://json-api.uz/api/project/fn44/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const res = await req.json();
    return res;
  } catch {
    throw new Error("Ro'yhatdan o'tishda xatolik bo'ldi!");
  }
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const formData = new FormData(elForm);
  const result = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });

  register(result)
    .then((res) => {
      if (res?.access_token) {
        localStorage.setItem("token", res.access_token);
        window.location.href = "../../index.html";
      } else {
        alert(
          "Ro'yxatdan o'tishda xatolik: " + (res?.message || "noma'lum xato")
        );
      }
    })
    .catch((err) => {
      alert(err.message);
    });
});
