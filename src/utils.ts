import axios from "axios";
export function setCookie(
  name: string,
  value: string,
  time: number,
  unit: string
) {
  var expires = "";
  let expiry_time = 0;
  if (unit === "minutes") {
    expiry_time = time * 60 * 1000;
  }

  if (unit === "days") {
    expiry_time = time * 24 * 60 * 60 * 1000;
  }

  if (unit === "hours") {
    expiry_time = time * 60 * 60 * 1000;
  }

  var date = new Date();
  date.setTime(date.getTime() + expiry_time);
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


export function getCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}


export async function getResponse(path: string) {
  try {
    const myData = (await axios.get(path)).data;
    if (typeof myData === "string") {
      return null;
    }
    return myData;
  } catch (error){
    return null;
  }
}