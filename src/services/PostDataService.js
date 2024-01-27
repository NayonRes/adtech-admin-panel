import axios from "axios";

const handlePostData = async (url, data, token) => {
  try {
    // let xsrfToken = axios({
    //   method: "get",
    //   url: "/sanctum/csrf-cookie",
    // });
    // console.log(xsrfToken.headers);
    // console.log("localData.token", localData.token);
    let response = await axios({
      method: "post",
      url: url,
      data: data,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    return response;
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

export { handlePostData };
