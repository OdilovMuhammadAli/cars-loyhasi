const elFormReg = document.getElementById("formRegister");
export async function Register(user) {
  try {
    const req = await fetch("https://json-api.uz/project/fn44/auth/register", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });
    const res = await req.json();
    return res;
  } catch {
    throw new Error("regestratsiyada xatolik bo'ldi");
  }
}
elFormReg.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const forDataReg = new FormData(elFormReg);
  const result = {};
  FormData.forEach((value, key) => {
    result[key] = value;
  });
  console.log(result);

  Register(result)
    .then((res) => {
      localStorage.setItem("token", res.access_token);
      window.location.href = "../../index.html";
    })
    .catch(() => {})
    .finally(() => {});
});
