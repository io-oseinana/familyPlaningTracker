const getvalue = function () {
  document.getElementById("details_feilds").addEventListener("click", () => {
    //GENDER
    document.querySelectorAll(".sex").forEach((item) => {
      if (item.checked) {
        const Gender = item.value;
        document.getElementById("Gender").value = Gender;
      }
    });
  });
};
//SERVICE
const service = function () {
  document.getElementById("idcommo").addEventListener("click", () => {
    document.querySelectorAll(".fp").forEach((service) => {
        if (service.checked) {
          const Service = service.value;
          document.getElementById("serve").value= Service;
        }
      });
    });

    }

getvalue();
service();
