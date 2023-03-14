window.onload = function () {
  //GENDER
  const Gender = document.getElementById("Gender");
  const list = document.querySelectorAll(".sex");
  for (var x = 0; x < list.length; x++) {
    if (Gender.value == "Male") {
      list[0].checked = true;
    } else {
      if (Gender.value == "Female") {
        list[1].checked = true;
      } else {
        if (Gender.value == "Prefer not to say") {
          list[2].checked = true;
        } else {
          if (Gender.value == "Other") {
            list[3].checked = true;
          }
        }
      }
    }
  }

  const NextVisit = document.getElementById("serve");
  const VisitList = document.querySelectorAll(".fp");
  for (var x = 0; x < VisitList.length; x++) {
    if (NextVisit.value == "1st Ever(New Acceptors") {
      VisitList[0].checked = true;
    } else {
      if (NextVisit.value == "CONTINUE COMMODITY GIVEN") {
        VisitList[1].checked = true;
      } else {
        if (NextVisit.value == "VISIT NO COMMODITY GIVEN") {
          VisitList[2].checked = true;
        } else {
          if (NextVisit.value == "VISIT COMMODITY GIVEN") {
            VisitList[3].checked = true;
          } else {
            if (NextVisit.value == "COUNSELLING ONLY") {
              VisitList[4].checked = true;
            }
          }
        }
      }
    }
  }
};
